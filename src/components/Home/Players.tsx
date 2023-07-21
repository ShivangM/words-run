import { User } from 'firebase/auth';
import { motion } from 'framer-motion';
import { GameStatus } from '../../interfaces/game.d';
import useGameStore from '../../store/gameStore';
import dummyProfile from '../../assets/Dummy Profile.png';

type Props = {
  player: User;
  delayIdx: number;
};

const PlayerCard = ({ player, delayIdx }: Props) => {
  const [gameStatus] = useGameStore((state) => [state.gameStatus]);

  const { photoURL, displayName } = player;
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
      className="flex flex-col justify-center m-8 text-center"
    >
      <img
        alt=""
        className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
        src={photoURL || dummyProfile}
      />
      <p className="text-xl font-semibold leadi">{displayName}</p>
      {/* {gameStatus === GameStatus.FINISHED ? (
        <div className="">
          <p className="dark:text-gray-400">{wpm}</p>
          <p className="dark:text-gray-400">{accuracy}</p>
        </div>
      ) : (
        <div className="">
          <p className="dark:text-gray-400">Average WPM: {averageWpm}</p>
          <p className="dark:text-gray-400">Races: {races}</p>
        </div>
      )} */}
    </motion.div>
  );
};

const Players = () => {
  const [players] = useGameStore((state) => [state.players]);

  return (
    <motion.div className="flex flex-row flex-wrap-reverse justify-center">
      {players?.map((players, idx) => (
        <PlayerCard delayIdx={idx} player={players} />
      ))}
    </motion.div>
  );
};

export default Players;
