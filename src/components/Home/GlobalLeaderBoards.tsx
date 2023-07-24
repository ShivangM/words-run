import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GameModes } from '../../interfaces/game.d';
import useUserStore from '../../store/userStore';
import { db } from '../../utils/firebase';

type Game = {
  accuracy: number;
  difficulty: number;
  duration: number;
  mode: number;
  wpm: number;
};
type Props = {
  game: Game;
};

const getMode = (mode: number) => {
  return mode === GameModes.SINGLE_PLAYER
    ? 'Single Player'
    : mode === GameModes.ONLINE
    ? 'Online Multiplayer'
    : 'With Friends';
};

const LeaderBoardRow = ({ game }: Props) => {
  const { accuracy, difficulty, duration, mode, wpm } = game;
  return (
    <tr className="even:bg-gray-300 odd:bg-white">
      <td className=" text-black">{new Date().toLocaleDateString()}</td>
      <td className=" text-black flex items-center">{getMode(mode)}</td>
      <td className=" text-black">{wpm} Words / Min</td>
      <td className=" text-black">{accuracy}</td>
    </tr>
  );
};

const GlobalLeaderBoards = () => {
  const user = useUserStore((state) => state.user);
  const [games, setGames] = useState<Game[]>();

  useEffect(() => {
    if (user?.uid) {
      toast.loading('Fetching your previous games', {
        toastId: 'fetching-previous-games',
      });
      const fetchPreviousGames = async () => {
        const usersCollection = collection(db, 'users');
        const userData = await getDoc(doc(usersCollection, user?.uid));
        const prevGames = await userData?.data()?.games;
        setGames(prevGames);
        toast.dismiss('fetching-previous-games');
      };

      fetchPreviousGames();
    } else {
      setGames(undefined);
    }
  }, [user]);

  return (
    <div className="w-full col-span-1 rounded-xl flex flex-col py-8 items-center bg-white h-full">
      <h3 className="font-bold text-primary text-3xl">Previous Games</h3>
      {games ? (
        <table className="w-full text-center table-auto">
          <thead>
            <tr>
              <th className="py-2 text-black">Date</th>
              <th className="py-2 text-black">Mode</th>
              <th className="py-2 text-black">Wpm</th>
              <th className="py-2 text-black">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {games?.map((game, idx) => {
              return <LeaderBoardRow game={game} key={idx} />;
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-black">
          No previous Found, Login to save your games.
        </p>
      )}
    </div>
  );
};

export default GlobalLeaderBoards;
