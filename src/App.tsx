import './App.css';

import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect } from 'react';
import { socket } from './utils/socket';
import GameSettings from './pages/GameSettings';
import Game from './pages/Game';
import useUserStore from './store/userStore';

function App() {
  const [setSocketId] = useUserStore((state) => [state.setSocketId]);

  useEffect(() => {
    function onConnect() {
      setSocketId(socket.id);
    }

    function onDisconnect() {
      setSocketId(null);
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
