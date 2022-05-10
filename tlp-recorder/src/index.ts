import 'dotenv/config';
import ObsBroker from './broker.js';
import TekkenState from './state.js';

async function tick() {
  const broker = await ObsBroker.getInstance();
  const tekkenState = await TekkenState.getInstance();
  const snapshot = tekkenState.getSnapshot();

  let p1move = '';
  let p2move = '';

  if (snapshot.p1InputAttack) {
    if (snapshot.p1InputDirection === 'n') {
      p1move = snapshot.p1InputAttack;
    } else {
      p1move = `${snapshot.p1InputDirection}+${snapshot.p1InputAttack}`;
    }

    if (snapshot.p2InputDirection === 'n') {
      p2move = snapshot.p2InputAttack;
    } else {
      p2move = `${snapshot.p2InputDirection}+${snapshot.p2InputAttack}`;
    }
  }

  if (p1move !== '') await broker.updateText('p1move', p1move);
  if (p2move !== '') await broker.updateText('p2move', p2move);
}

(async () => {
  const broker = await ObsBroker.getInstance();
  await broker.clearAllText();
  setInterval(tick, 1);
})();
