import { motion } from 'framer-motion';
import { GameModes, GameStatus } from '../../interfaces/game.d';
import useGameStore from '../../store/gameStore';
import dummyProfile from '../../assets/Dummy Profile.png';
import { GiQueenCrown } from 'react-icons/gi';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ExtendedUser } from '../../interfaces/user';
import useUserStore from '../../store/userStore';

type Props = {
  player: ExtendedUser;
  delayIdx: number;
};

const PlayerCard = ({ player, delayIdx }: Props) => {
  const [owner] = useGameStore((state) => [state.owner]);
  const [gameStatus, progress, soloWpm, soloAccuracy, mode] = useGameStore(
    (state) => [
      state.gameStatus,
      state.progress,
      state.wpm,
      state.accuracy,
      state.mode,
    ]
  );

  const { photoURL, displayName, stats, socketId } = player;
  const { averageWpm, races } = stats || { averageWpm: 0, races: 0 };

  const userProgress =
    mode === GameModes.SINGLE_PLAYER
      ? { wpm: soloWpm, accuracy: soloAccuracy }
      : progress.get(socketId);
  const { accuracy, wpm } = userProgress || { accuracy: 0, wpm: 0 };

  return (
    <motion.div
      animate={{
        x: [20, 0],
        transition: {
          easings: 'easeInOut',
          duration: 1,
          delay: delayIdx * 0.2,
        },
      }}
      className="flex w-28 flex-col items-center justify-center m-8 text-center"
    >
      <div className="relative w-fit">
        {socketId === owner ? (
          <div className="absolute bg-secondary rounded-full flex items-center justify-center w-5 h-5 top-0 right-2">
            <GiQueenCrown />
          </div>
        ) : null}
        <img
          alt=""
          className="self-center flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
          src={photoURL || dummyProfile}
        />
      </div>
      <p className="text-base sm:text-xl font-semibold leadi">{displayName}</p>
      {gameStatus === GameStatus.FINISHED || GameStatus.PLAYING ? (
        <div className="">
          <p className="dark:text-gray-400">WPM: {wpm}</p>
          <p className="dark:text-gray-400">Accuracy: {accuracy}</p>
        </div>
      ) : (
        <div className="">
          <p className="dark:text-gray-400 whitespace-nowrap">
            Average WPM: {averageWpm}
          </p>
          <p className="dark:text-gray-400 whitespace-nowrap">Races: {races}</p>
        </div>
      )}
    </motion.div>
  );
};

const Players = () => {
  const [players] = useGameStore((state) => [state.players]);
  const [mode, roomId] = useGameStore((state) => [state.mode, state.roomId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_PUBLIC_CLIENT_URL}/game?roomId=${roomId}`
    );
    toast.success('Copied Room Id To Clipboard, Share with your friends');
  };

  return (
    <div className="">
      {mode === GameModes.WITH_FRIENDS && (
        <div className="py-4 flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-gray-300">
            <span className="text-white text-semibold">
              Players in lobby: {players?.length || 0} ,
            </span>{' '}
            Share links with your friend's.
          </p>

          <div
            onClick={handleCopy}
            className="flex cursor-pointer items-center bg-secondary px-4 py-2 rounded-lg text-center text-black w-fit justify-center space-x-2"
          >
            <span>{roomId}</span> <MdOutlineContentCopy />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center">
        {players?.map((players, idx) => (
          <PlayerCard delayIdx={idx} player={players} />
        ))}
      </div>
    </div>
  );
};

export default Players;
