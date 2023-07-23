import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ONLINE_MODE_INSTRUCTIONS,
  PLAY_WITH_FRIENDS_MODE_INSTRUCTIONS,
  SINGLE_PLAYER_MODE_INSTRUCTIONS,
} from '../constants/instruction';
import { GameModes } from '../interfaces/game.d';
import { ExtendedUser } from '../interfaces/user';
import useGameStore from '../store/gameStore';
import useUserStore from '../store/userStore';
import { socket } from '../utils/socket';

const useGameSettings = () => {
  const [instructions, setInstructions] = useState<string[]>([]);
  const [buttonName, setButtonName] = useState<string>('Start Game');
  const [modeName, setModeName] = useState('Single Player');
  const [mode, setOwner, setPlayers] = useGameStore((state) => [
    state.mode,
    state.setOwner,
    state.setPlayers,
  ]);

  const [user, socketId] = useUserStore((state) => [
    state.user,
    state.socketId,
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    setModeName(
      mode === GameModes.SINGLE_PLAYER
        ? 'Single Player'
        : mode === GameModes.WITH_FRIENDS
        ? 'Play With Friends'
        : 'Join Online'
    );
  }, [mode]);

  useEffect(() => {
    setInstructions(
      mode === GameModes.SINGLE_PLAYER
        ? SINGLE_PLAYER_MODE_INSTRUCTIONS
        : mode === GameModes.WITH_FRIENDS
        ? PLAY_WITH_FRIENDS_MODE_INSTRUCTIONS
        : ONLINE_MODE_INSTRUCTIONS
    );
  }, [mode]);

  useEffect(() => {
    setButtonName(
      mode === GameModes.SINGLE_PLAYER
        ? 'Start Game'
        : mode === GameModes.WITH_FRIENDS
        ? 'Create Room'
        : 'Join Room'
    );
  }, [mode]);

  useEffect(() => {
    socket.on('roomCreated', (roomId) => {
      setOwner(socketId!);
      navigate(`/game?roomId=${roomId}`);
      toast.dismiss('creatingRoom');
    });

    return () => {
      socket.off('roomCreated');
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === GameModes.SINGLE_PLAYER) {
      setPlayers([user as ExtendedUser]);
      navigate('/game');
    } else if (mode === GameModes.WITH_FRIENDS) {
      toast.loading('Creating Room', {
        toastId: 'creatingRoom',
      });

      if (!socketId) return toast.error('Something went wrong!');
      socket.emit('createRoom', { user, socketId });
    } else {
      navigate('/game');
    }
  };

  return { instructions, buttonName, modeName, handleSubmit };
};

export default useGameSettings;
