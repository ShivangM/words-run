import useGameStore from '../../store/gameStore';
import { GameModes } from '../../interfaces/game.d';
import { Link } from 'react-router-dom';
import { RoomStatus } from '../../interfaces/room.d';
import useUserStore from '../../store/userStore';

type Props = {};

const WaitingScreen = (props: Props) => {
  const [startGame, loading, roomStatus, mode, owner] = useGameStore(
    (state) => [
      state.startGame,
      state.loading,
      state.room?.status,
      state.room?.gameSettings?.mode,
      state.room?.owner,
    ]
  );

  const [user] = useUserStore((state) => [state.user]);

  return (
    <div className="">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {(mode !== GameModes.SINGLE_PLAYER &&
            owner?.socketId === user?.socketId) ||
          mode === GameModes.SINGLE_PLAYER ? (
            <button
              onClick={startGame}
              disabled={loading !== null}
              className="rounded disabled:animate-pulse px-5 py-2.5 overflow-hidden group bg-secondary relative hover:bg-gradient-to-r hover:from-secondary hover:to-secondary2 text-white hover:ring-2 hover:ring-offset-2 hover:ring-secondary2 transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative text-black font-semibold">
                {roomStatus === RoomStatus.FINISHED
                  ? 'Play Again'
                  : 'Start Game'}
              </span>
            </button>
          ) : (
            <div className="animate-pulse">
              Waiting for owner to {RoomStatus.FINISHED ? 'restart' : 'start'}{' '}
              the game...
            </div>
          )}
        </div>

        {roomStatus === RoomStatus.FINISHED ? (
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
