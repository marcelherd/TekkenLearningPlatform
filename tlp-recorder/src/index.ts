import 'dotenv/config';

import { OAuth2Client } from 'googleapis/node_modules/google-auth-library';

import db from '@/database';
import log from '@/helpers/log';
import Broker from '@/recording/obs/broker';
import { removeLatestVideo, scheduleRename } from '@/recording/util';
import uploadLatestVideo, { uploadVideo } from '@/recording/youtube/uploader';
import getAuthenticatedClient from '@/recording/youtube/auth';
import GameState from '@/tekken/state';
import {
  MatchEndEventData,
  MatchStartEventData,
  MatchUnresolvedEventData,
  TekkenEvent,
  TickEventData,
} from '@/types/types';
import config from '@/config';

log.debug('Recorder loaded with configuration', { config });

let state: GameState;

let obs: Broker;
let googleClient: OAuth2Client;
let currentBatchSize: number = 0;
let batchMatchIds: number[] = [];
let recordingPaused: boolean = false;
let previousTickData: TickEventData;

const onMatchStart = async ({ match }: MatchStartEventData) => {
  // FIXME: Sometimes this gets called twice - once without data
  log.debug('onMatchStart', { match });

  if (config.ENABLE_VIDEO_RECORD) {
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

  if (config.ENABLE_DB_SYNC) {
    const createdMatch = await db.match.create({
      data: {
        stage: match.stage,
        playerCharacter: match.player.character,
        playerRank: match.player.rank, // FIXME: not the correct memory address
        opponentCharacter: match.opponent.character,
        opponentRank: match.opponent.rank,
        opponent: match.opponent.name,
        playerRoundWins: score.playerWins,
        opponentRoundWins: score.opponentWins,
        roundWinsRequired: score.roundWinsRequired,
        recorded: config.ENABLE_VIDEO_RECORD,
      },
    });
    log.info(`Match was saved: ${match.player.character} vs ${match.opponent.character}`);

    // Is only used to associate YouTube URLs after upload with matches
    if (config.ENABLE_VIDEO_UPLOAD) {
      batchMatchIds.push(createdMatch.id);
    }
  }

  if (config.ENABLE_VIDEO_RECORD) {
    currentBatchSize += 1;
    log.info(`Recorded match ${currentBatchSize}/${config.OBS_BATCH_SIZE}`);

    // TODO: Add cleanup in case you want to exit early
    if (currentBatchSize >= config.OBS_BATCH_SIZE) {
      log.debug('Stop recording');

      await obs.stopRecording();
      await obs.clearAllText();

      let renamedFilePath: string | null = null;

      // If each match has its own recording, we can rename the recording file to be more descriptive
      if (config.OBS_BATCH_SIZE === 1) {
        const pChar = match.player.character;
        const opChar = match.opponent.character;
        const pRounds = score.playerWins;
        const opRounds = score.opponentWins;
        const { outcome } = score;

        // YYYY-MM-DD hh_mm_ss
        const date = new Date().toISOString().replace('T', ' ').replace(/:/g, '_').substring(0, 19);
        const newName = `${pChar} vs ${opChar} ${pRounds}-${opRounds} ${outcome} (${date})`;
        renamedFilePath = await scheduleRename(newName);
      }

      if (config.ENABLE_VIDEO_UPLOAD) {
        log.info('Uploading recording to YouTube. Please do not exit.');

        const { player, opponent } = match;

        // Grace period for OBS to finish saving the recording
        setTimeout(
          (matchIds: number[], path: string | null) => {
            const title = `Me (${player.character}) vs ${opponent.name} (${opponent.character})`;
            if (path) {
              uploadVideo(
                googleClient,
                path,
                {
                  title,
                },
                matchIds, // TODO: this should not be handled here instead but whatever
              );
            } else {
              uploadLatestVideo(
                googleClient,
                {
                  title,
                },
                matchIds, // TODO: this should not be handled here instead but whatever
              );
            }
          },
          config.OBS_UPLOAD_DELAY,
          batchMatchIds,
          renamedFilePath,
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

  if (config.ENABLE_VIDEO_RECORD) {
    log.debug('Match ended early, stop recording');
    await obs.stopRecording();
    await obs.clearAllText();

    // Grace period for OBS to finish saving the recording
    setTimeout(() => {
      removeLatestVideo();
    }, config.OBS_CLEANUP_DELAY);
  }
};

const onGameTick = async (data: TickEventData) => {
  log.silly('onGameTick', data);

  if (config.ENABLE_NOTATION_SYNC) {
    if (previousTickData) {
      await obs.updateMetadataFromTick(data, previousTickData);
    }

    previousTickData = data;
  }
};

async function tick() {
  state.update();
}

async function main() {
  if (config.ENABLE_VIDEO_RECORD || config.ENABLE_NOTATION_SYNC) {
    log.info('Attempting to connect to OBS...');
    try {
      obs = await Broker.getInstance();

      if (config.ENABLE_NOTATION_SYNC) {
        await obs.clearAllText();
      }
    } catch (err) {
      log.error('Failed to connect to OBS. Please ensure OBS is running and set up.');
      log.info('See: https://github.com/marcelherd/TekkenLearningPlatform/wiki/OBS-Studio-Setup');
      process.exit(1);
    }
  }

  if (config.ENABLE_VIDEO_UPLOAD) {
    googleClient = await getAuthenticatedClient();
  }

  try {
    state = GameState.getInstance();
  } catch (err) {
    log.error('Please start up Tekken 7 before running this application.');
    process.exit(1);
  }

  state.on(TekkenEvent.MATCH_START, onMatchStart);
  state.on(TekkenEvent.MATCH_END, onMatchEnd);
  state.on(TekkenEvent.MATCH_UNRESOLVED, onMatchUnresolved);
  state.on(TekkenEvent.TICK, onGameTick);

  log.info('Application is ready to record matches.');
  if (config.ENABLE_VIDEO_UPLOAD) {
    log.info(`Recording ${config.OBS_BATCH_SIZE} matches per video`);
  }

  setInterval(tick, config.TICK_INTERVAL);
}

main();
