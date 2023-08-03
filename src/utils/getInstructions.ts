import {
  ONLINE_MODE_INSTRUCTIONS,
  PLAY_WITH_FRIENDS_MODE_INSTRUCTIONS,
  SINGLE_PLAYER_MODE_INSTRUCTIONS,
} from '../constants/instruction';
import { GameModes } from '../interfaces/game.d';

const getInstructions = (mode: number) => {
  return mode === GameModes.SINGLE_PLAYER
    ? SINGLE_PLAYER_MODE_INSTRUCTIONS
    : mode === GameModes.WITH_FRIENDS
    ? PLAY_WITH_FRIENDS_MODE_INSTRUCTIONS
    : ONLINE_MODE_INSTRUCTIONS;
};

export default getInstructions;
