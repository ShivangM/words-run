import { PiPencilCircleFill } from 'react-icons/pi';
import GameModeButton from './GameModeButton';
import { GameModes } from '../../interfaces/game.d';

type Props = {};

const SinglePlayerMode = (props: Props) => {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-2xl lg:text-3xl font-semibold">
        Practice Your Typings{' '}
        <span>
          <PiPencilCircleFill className="inline pl-1" />
        </span>
      </h3>

      <GameModeButton mode={GameModes.SINGLE_PLAYER} text="Start Practicing" />
    </div>
  );
};

export default SinglePlayerMode;
