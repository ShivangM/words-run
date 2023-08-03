import { GameModes } from '../interfaces/game.d';

const getButtonName = (mode: number) => {
  return mode === GameModes.SINGLE_PLAYER
    ? 'Start Game'
    : mode === GameModes.WITH_FRIENDS
    ? 'Create Room'
    : 'Join Room';
};

export default getButtonName;
