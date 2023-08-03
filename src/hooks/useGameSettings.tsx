import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GameModes } from '../interfaces/game.d';
import { RoomStatus } from '../interfaces/room.d';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';

const useGameSettings = () => {
  const [mode, createRoom, startGame, status] = useGameStore((state) => [
    state.room?.gameSettings?.mode,
    state.createRoom,
    state.startGame,
    state.room?.status,
  ]);

  const [user] = useUserStore((state) => [state.user]);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === RoomStatus.WAITING) {
      navigate('/game');
    }
  }, [status, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRoom(user);
  };

  return { handleSubmit };
};

export default useGameSettings;
