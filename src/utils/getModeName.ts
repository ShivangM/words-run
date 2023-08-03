import { GameModes } from '../interfaces/game.d';

const getModeName = (mode: number) => {
  return mode === GameModes.SINGLE_PLAYER
    ? 'Single Player'
    : mode === GameModes.WITH_FRIENDS
    ? 'Play With Friends'
    : 'Join Online';
};

export default getModeName;
