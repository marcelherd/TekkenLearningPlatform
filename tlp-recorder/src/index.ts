import 'dotenv/config';

import log from '@/helpers/log';
import GameState, { Event, EventHandler } from '@/tekken/state';
import Broker from '@/recording/obs/broker';

const state = GameState.getInstance();
let broker: Broker;

const onMatchStart: EventHandler = (data) => {
  log.debug('onMatchStart', data);
  broker.startRecording();
};

const onMatchEnd: EventHandler = (data) => {
  log.debug('onMatchEnd', data);
  broker.stopRecording();
  // uploadLatestVideo();
};

const onMatchUnresolved: EventHandler = (data) => {
  log.debug('onMatchUnresolved', data);
  broker.stopRecording();
};

async function tick() {
  state.update();
}

async function main() {
  state.addEventListener(Event.MATCH_START, onMatchStart);
  state.addEventListener(Event.MATCH_END, onMatchEnd);
  state.addEventListener(Event.MATCH_UNRESOLVED, onMatchUnresolved);
  broker = await Broker.getInstance();
  broker.connect();
  setInterval(tick, 1);
}

main();
