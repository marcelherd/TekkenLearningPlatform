import 'dotenv/config';

import { OAuth2Client } from 'googleapis/node_modules/google-auth-library';

import db from '@/database';
import log from '@/helpers/log';
import Broker from '@/recording/obs/broker';
import { removeLatestVideo } from '@/recording/util';
import uploadLatestVideo from '@/recording/youtube/uploader';
import getAuthenticatedClient from '@/recording/youtube/auth';
import GameState from '@/tekken/state';
import {
  MatchEndEventData,
  MatchStartEventData,
  MatchUnresolvedEventData,
  TekkenEvent,
  TickEventData,
} from '@/types/types';
import * as config from '@/config';

let state: GameState;

let obs: Broker;
let googleClient: OAuth2Client;
let currentBatchSize: number = 0;
let batchMatchIds: number[] = [];
let recordingPaused: boolean = false;

const onMatchStart = async ({ match }: MatchStartEventData) => {
  // FIXME: Sometimes this gets called twice - once without data
  log.debug('onMatchStart', { match });

  if (config.RECORD_VIDEOS) {
    if (recordingPaused) {
      log.debug('Resume recording');
      await obs.resumeRecording();
      recordingPaused = false;
    } else {
      log.debug('Start recording');
      await obs.startRecording();
    }
  }
};

const onMatchEnd = async ({ match, score }: MatchEndEventData) => {
  log.debug('onMatchEnd', { match, score });

  if (config.SYNC_DATABASE) {
    // TODO: Attach YouTube URL when upload is finished
    const createdMatch = await db.match.create({
      data: {
        stage: match.stage,
        playerCharacter: match.player.character,
        playerRank: match.player.rank,
        opponentCharacter: match.opponent.character,
        opponentRank: match.opponent.rank,
        opponent: match.opponent.name,
        playerRoundWins: score.playerWins,
        opponentRoundWins: score.opponentWins,
        roundWinsRequired: score.roundWinsRequired,
        recorded: config.RECORD_VIDEOS,
      },
    });

    // Is only used to associate YouTube URLs after upload with matches
    if (config.UPLOAD_VIDEOS) {
      batchMatchIds.push(createdMatch.id);
    }
  }

  if (config.RECORD_VIDEOS) {
    currentBatchSize += 1;

    // TODO: Add cleanup in case you want to exit early
    if (currentBatchSize >= config.MAX_BATCH_SIZE) {
      log.debug('Stop recording');

      await obs.stopRecording();
      await obs.clearAllText();

      if (config.UPLOAD_VIDEOS) {
        log.debug('Uploading latest video to YouTube');

        const { player, opponent } = match;

        // Grace period for OBS to finish saving the recording
        setTimeout(
          (matchIds: number[]) => {
            // Will automatically delete the file locally after the upload is finished
            // If the flag CLEANUP_ENABLED is set
            uploadLatestVideo(
              googleClient,
              {
                title: `Me (${player.character}) vs ${opponent.name} (${opponent.character})`,
              },
              matchIds, // TODO: this should be handled here instead but whatever
            );
          },
          config.OBS_GRACE_PERIOD,
          batchMatchIds,
        );
      }

      currentBatchSize = 0;
      batchMatchIds = [];
    } else {
      const { outputActive } = await obs.getRecordingStatus();

      if (outputActive) {
        log.debug('Pause recording');
        await obs.pauseRecording();
        recordingPaused = true;
      }
    }
  }
};

const onMatchUnresolved = async (data: MatchUnresolvedEventData) => {
  log.debug('onMatchUnresolved', data);

  if (config.RECORD_VIDEOS) {
    log.debug('Match ended early, stop recording');
    await obs.stopRecording();

    // Grace period for OBS to finish saving the recording
    setTimeout(() => {
      removeLatestVideo();
    }, config.OBS_GRACE_PERIOD);
  }
};

const onGameTick = async (data: TickEventData) => {
  log.silly('onGameTick', data);

  if (config.SYNC_NOTATION) {
    await obs.updateMetadataFromTick(data);
  }
};

async function tick() {
  state.update();
}

async function main() {
  if (config.UPLOAD_VIDEOS) {
    googleClient = await getAuthenticatedClient();
  }

  state = GameState.getInstance();

  state.on(TekkenEvent.MATCH_START, onMatchStart);
  state.on(TekkenEvent.MATCH_END, onMatchEnd);
  state.on(TekkenEvent.MATCH_UNRESOLVED, onMatchUnresolved);
  state.on(TekkenEvent.TICK, onGameTick);

  if (config.RECORD_VIDEOS || config.SYNC_NOTATION) {
    obs = await Broker.getInstance();

    if (config.SYNC_NOTATION) {
      await obs.clearAllText();
    }
  }

  setInterval(tick, config.TICK_INTERVAL);
}

main();
