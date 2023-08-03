import { GameDuration } from '../src/types/game'

const getDuration = (duration: GameDuration) => {
  return duration === GameDuration.ONE_MIN ? 60 : duration === GameDuration.THREE_MIN ? 120 : 300
}

export default getDuration
