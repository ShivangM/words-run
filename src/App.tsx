import './App.css';

import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { socket } from './utils/socket';
import GameSettings from './pages/GameSettings';
import Game from './pages/Game';
import useGameStore from './store/gameStore';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [setPlayers] = useGameStore((state) => [state.setPlayers]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);

    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game-settings" element={<GameSettings />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
