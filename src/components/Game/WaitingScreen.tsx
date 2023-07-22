import Players from '../Home/Players';
import useGameStore from '../../store/gameStore';
import { GameModes, GameStatus } from '../../interfaces/game.d';
import { Link } from 'react-router-dom';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';

type Props = {};

const WaitingScreen = (props: Props) => {
  const [startGame, loading, gameStatus, roomId, mode] = useGameStore(
    (state) => [
      state.startGame,
      state.loading,
      state.gameStatus,
      state.roomId,
      state.mode,
    ]
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(`http:localhost:3000/game?roomId=${roomId}`);
    toast.success('Copied Room Id To Clipboard, Share with your friends');
  };

  return (
    <div className="w-full flex items-center justify-center flex-col space-y-4">
      <Players />
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <button
            onClick={startGame}
            disabled={loading !== null}
            className="rounded disabled:animate-pulse px-5 py-2.5 overflow-hidden group bg-secondary relative hover:bg-gradient-to-r hover:from-secondary hover:to-secondary2 text-white hover:ring-2 hover:ring-offset-2 hover:ring-secondary2 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative text-black font-semibold">
              {gameStatus === GameStatus.FINISHED ? 'Play Again' : 'Start Game'}
            </span>
          </button>
        </div>

        {mode === GameModes.WITH_FRIENDS ? (
          <div
            onClick={handleCopy}
            className="flex cursor-pointer items-center space-x-2"
          >
            <span>{roomId}</span> <MdOutlineContentCopy />
          </div>
        ) : null}

        {gameStatus === GameStatus.FINISHED ? (
          <Link
            to="/"
            className="rounded disabled:animate-pulse px-5 py-2.5 overflow-hidden group bg-secondary relative hover:bg-gradient-to-r hover:from-secondary hover:to-secondary2 text-white hover:ring-2 hover:ring-offset-2 hover:ring-secondary2 transition-all ease-out duration-300"
          >
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative text-black font-semibold">
              Back To Menu
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default WaitingScreen;
