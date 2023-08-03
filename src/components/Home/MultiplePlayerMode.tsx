import { BsGlobeAmericas } from 'react-icons/bs';
import { GameModes } from '../../interfaces/game.d';
import GameModeButton from './GameModeButton';

type Props = {};

const MultiplePlayerMode = (props: Props) => {
  return (
    <div className="p-6 cursor-not-allowed space-y-4 opacity-60">
      <h3 className="font-semibold">
        Multi Player (Comming Soon){' '}
        <span>
          <BsGlobeAmericas className="inline" />
        </span>
      </h3>

      <GameModeButton mode={GameModes.ONLINE} text="Join Game" />
    </div>
  );
};

export default MultiplePlayerMode;
