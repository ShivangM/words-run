import Players from '../Home/Players';
import useGameStore from '../../store/gameStore';
import { motion } from 'framer-motion';
import { GameStatus } from '../../interfaces/game.d';
import { Link } from 'react-router-dom';

type Props = {};

const WaitingScreen = (props: Props) => {
  const [startGame, loading, gameStatus] = useGameStore((state) => [
    state.startGame,
    state.loading,
    state.gameStatus,
  ]);

  return (
    <div className="w-full flex items-center justify-center flex-col space-y-4">
      <Players />
      <div className="flex items-center space-x-4">
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
