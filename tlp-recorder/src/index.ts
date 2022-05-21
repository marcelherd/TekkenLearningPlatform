import 'dotenv/config';

import log from '@/helpers/log';
import TekkenState from '@/tekken/state';

const state: TekkenState = TekkenState.getInstance();

async function tick() {
  state.update();
}

async function main() {
  setInterval(tick, 1);
}

main();
