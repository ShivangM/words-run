import { motion } from 'framer-motion';

type Player = {
  name: string;
  avatar: string;
  avgWpm: number;
};

type Props = {
  player: Player;
  delayIdx: number;
};

const players = [
  {
    name: 'Leroy Jenkins',
    avatar: 'https://source.unsplash.com/100x100/?portrait?5',
    avgWpm: 100,
  },
  {
    name: 'Leroy Jenkins',
    avatar: 'https://source.unsplash.com/100x100/?portrait?5',
    avgWpm: 100,
  },
  {
    name: 'Leroy Jenkins',
    avatar: 'https://source.unsplash.com/100x100/?portrait?5',
    avgWpm: 100,
  },
  {
    name: 'Leroy Jenkins',
    avatar: 'https://source.unsplash.com/100x100/?portrait?5',
    avgWpm: 100,
  },
  {
    name: 'Leroy Jenkins',
    avatar: 'https://source.unsplash.com/100x100/?portrait?5',
    avgWpm: 100,
  },
];

const PlayerCard = ({ player, delayIdx }: Props) => {
  const { avatar, avgWpm, name } = player;
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
        src={avatar}
      />
      <p className="text-xl font-semibold leadi">{name}</p>
      <p className="dark:text-gray-400">{avgWpm}</p>
    </motion.div>
  );
};

const Players = () => {
  return (
    <motion.div className="flex flex-row flex-wrap-reverse justify-center">
      {players?.map((players, idx) => (
        <PlayerCard delayIdx={idx} player={players} />
      ))}
    </motion.div>
  );
};

export default Players;
