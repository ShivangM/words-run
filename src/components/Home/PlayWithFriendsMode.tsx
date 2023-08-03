import { AiOutlineTeam } from 'react-icons/ai';
import { GameModes } from '../../interfaces/game.d';
import GameModeButton from './GameModeButton';

type Props = {};

const PlayWithFriendsMode = (props: Props) => {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-2xl font-semibold">
        Play With Friends{' '}
        <span>
          <AiOutlineTeam className="inline" />
        </span>{' '}
      </h3>

      <GameModeButton mode={GameModes.WITH_FRIENDS} text="Create Room" />
    </div>
  );
};

export default PlayWithFriendsMode;
