import { GameDifficulties } from '../interfaces/game.d';

const getDifficulty = (difficulty: GameDifficulties) => {
  return difficulty === GameDifficulties.EASY
    ? 'Easy'
    : difficulty === GameDifficulties.MEDIUM
    ? 'Medium'
    : 'Hard';
};

export default getDifficulty;
