import { BsGlobeAmericas } from 'react-icons/bs';
import { GameModes } from '../../interfaces/game.d';
import GameModeButton from './GameModeButton';

type Props = {};

const MultiplePlayerMode = (props: Props) => {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-2xl font-semibold">
        Multi Player{' '}
        <span>
          <BsGlobeAmericas className="inline pl-1" />
        </span>{' '}
      </h3>
      <GameModeButton mode={GameModes.ONLINE} text="Join Game" />
    </div>
  );
};

export default MultiplePlayerMode;
