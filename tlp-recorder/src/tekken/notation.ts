import { InputData } from '@/tekken/state';

export default function getNotation(input: InputData) {
  const { direction, attack } = input;

  if (direction !== '' && direction !== 'n') {
    if (attack !== '') {
      return `${direction}+${attack}`;
    }
    return direction;
  }

  return attack;
}
