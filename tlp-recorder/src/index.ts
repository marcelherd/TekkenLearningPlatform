import 'dotenv/config';

import GameState from '@/tekken/state';

const state = GameState.getInstance();

async function tick() {
  state.update();
}

async function main() {
  setInterval(tick, 1);
}

main();
