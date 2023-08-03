import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Game, GameDifficulties, GameModes } from '../../interfaces/game.d';
import useUserStore from '../../store/userStore';
import { db } from '../../utils/firebase';

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

const getDifficulty = (difficulty: number) => {
  return difficulty === GameDifficulties.EASY
    ? 'Easy'
    : difficulty === GameDifficulties.MEDIUM
    ? 'Medium'
    : 'Hard';
};

const PreviousGameRow = ({ game }: Props) => {
  const { accuracy, difficulty, duration, mode, wpm } = game;
  return (
    <tr className="even:bg-gray-300 odd:bg-white">
      <td className=" text-black">{new Date().toLocaleDateString()}</td>
      <td className=" text-black">{getMode(mode)}</td>
      <td className=" text-black">{wpm} Words / Min</td>
      <td className=" text-black">{accuracy}</td>
      <td className=" text-black">{getDifficulty(difficulty)}</td>
      <td className=" text-black">{duration / 60} Min</td>
    </tr>
  );
};

const PreviousGameHistory = () => {
  const [user, games, fetchGames] = useUserStore((state) => [
    state.user,
    state.games,
    state.fetchGames,
  ]);

  useEffect(() => {
    fetchGames();
  }, [user]);

  return (
    <div className="w-full col-span-1 rounded-xl flex flex-col py-8 items-center bg-white h-full">
      <h3 className="font-bold text-primary text-2xl sm:text-3xl">
        Previous Games
      </h3>
      <div className="w-full p-4 text-center">
        {games?.length !== 0 ? (
          <table className="text-center text-sm overflow-x-auto w-full table-auto">
            <thead>
              <tr>
                <th className="py-2 text-black">Date</th>
                <th className="py-2 text-black">Mode</th>
                <th className="py-2 text-black">Wpm</th>
                <th className="py-2 text-black">Accuracy</th>
                <th className="py-2 text-black">Difficulty</th>
                <th className="py-2 text-black">Duration</th>
              </tr>
            </thead>
            <tbody>
              {games?.map((game, idx) => {
                return <PreviousGameRow game={game} key={idx} />;
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-black text-sm">
            No previous Found, Login to save your games.
          </p>
        )}
      </div>
    </div>
  );
};

export default PreviousGameHistory;
