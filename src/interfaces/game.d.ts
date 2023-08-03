export enum GameModes {
  SINGLE_PLAYER,
  ONLINE,
  WITH_FRIENDS,
}

export enum GameDifficulties {
  EASY,
  MEDIUM,
  HARD,
}

export enum GameDuration {
  ONE_MIN,
  THREE_MIN,
  FIVE_MIN,
}

type Game = {
  accuracy: number;
  difficulty: number;
  duration: number;
  mode: number;
  wpm: number;
};
