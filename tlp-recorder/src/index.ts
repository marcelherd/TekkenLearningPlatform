import 'dotenv/config';

import { OAuth2Client } from 'googleapis/node_modules/google-auth-library';

import log from '@/helpers/log';
import getEnvironmentVariable, { isFlagSet } from '@/helpers/environment';
import Broker from '@/recording/obs/broker';
import { removeLatestVideo } from '@/recording/util';
import uploadLatestVideo from '@/recording/youtube/uploader';
import getAuthenticatedClient from '@/recording/youtube/auth';
import GameState, {
  MatchEndEventData,
  MatchStartEventData,
  MatchUnresolvedEventData,
  TekkenEvent,
  TickEventData,
} from '@/tekken/state';

// TODO: Create constants module with logging
const READ_PROCESS_INTERVAL = Number(getEnvironmentVariable('READ_PROCESS_INTERVAL', '1'));
const OBS_GRACE_PERIOD = Number(getEnvironmentVariable('OBS_GRACE_PERIOD', '500'));
const MAX_BATCH_SIZE = Number(getEnvironmentVariable('MAX_BATCH_SIZE', '10'));

const SYNC_NOTATION = isFlagSet('SYNC_NOTATION', false);
const RECORD_VIDEOS = isFlagSet('RECORD_VIDEOS', false);
const UPLOAD_VIDEOS = isFlagSet('UPLOAD_VIDEOS', false);

let state: GameState;

let obs: Broker;
let googleClient: OAuth2Client;
let matchMetadata: MatchStartEventData;
let currentBatchSize: number = 0;
let recordingPaused: boolean = false;

const onMatchStart = async (data: MatchStartEventData) => {
  log.debug('onMatchStart', data);

  // FIXME: Sometimes this gets called twice - once without data
  if (data) {
    matchMetadata = data;
  }

  if (RECORD_VIDEOS) {
    if (recordingPaused) {
      log.info('Resume recording');
      await obs.resumeRecording();
      recordingPaused = false;
    } else {
      log.info('Start recording');
      await obs.startRecording();
    }
  }
};

const onMatchEnd = async (data: MatchEndEventData) => {
  log.debug('onMatchEnd', data);

  if (RECORD_VIDEOS) {
    currentBatchSize += 1;

    if (currentBatchSize >= MAX_BATCH_SIZE) {
      log.info('Stop recording', { MAX_BATCH_SIZE });

      await obs.stopRecording();
      await obs.clearAllText();

      currentBatchSize = 0;

      if (UPLOAD_VIDEOS) {
        log.info('Uploading latest video to YouTube');

        const { player } = matchMetadata;
        const { opponent } = matchMetadata;

        // Grace period for OBS to finish saving the recording
        setTimeout(() => {
          // Will automatically delete the file locally after the upload is finished
          // If the flag CLEANUP_ENABLED is set
          uploadLatestVideo(googleClient, {
            title: `Me (${player.character}) vs ${opponent.name} (${opponent.character})`,
          });
        }, OBS_GRACE_PERIOD);
      }
    } else {
      const { outputActive } = await obs.getRecordingStatus();

      if (outputActive) {
        log.info('Pause recording');
        await obs.pauseRecording();
        recordingPaused = true;
      }
    }
  }
};

const onMatchUnresolved = async (data: MatchUnresolvedEventData) => {
  log.debug('onMatchUnresolved', data);

  if (RECORD_VIDEOS) {
    log.info('Match ended early, stop recording');
    await obs.stopRecording();

    // Grace period for OBS to finish saving the recording
    setTimeout(() => {
      removeLatestVideo();
    }, OBS_GRACE_PERIOD);
  }
};

const onGameTick = async (data: TickEventData) => {
  log.silly('onGameTick', data);

  if (SYNC_NOTATION) {
    await obs.updateMetadataFromTick(data);
  }
};

async function tick() {
  state.update();
}

async function main() {
  if (UPLOAD_VIDEOS) {
    googleClient = await getAuthenticatedClient();
  }

  state = GameState.getInstance();

  state.on(TekkenEvent.MATCH_START, onMatchStart);
  state.on(TekkenEvent.MATCH_END, onMatchEnd);
  state.on(TekkenEvent.MATCH_UNRESOLVED, onMatchUnresolved);
  state.on(TekkenEvent.TICK, onGameTick);

  if (RECORD_VIDEOS || SYNC_NOTATION) {
    obs = await Broker.getInstance();

    if (SYNC_NOTATION) {
      await obs.clearAllText();
    }
  }

  setInterval(tick, READ_PROCESS_INTERVAL);
}

main();
