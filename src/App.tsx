import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect } from 'react';
import { socket } from './utils/socket';
import GameSettings from './pages/GameSettings';
import Game from './pages/Game';
import useUserStore from './store/userStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import ReactGA from 'react-ga4';
ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID!);

function App() {
  const [setSocketId] = useUserStore((state) => [state.setSocketId]);
  const [setName, setPhoto, setUid] = useUserStore((state) => [
    state.setName,
    state.setPhoto,
    state.setUid,
  ]);

  useEffect(() => {
    const auth = getAuth();

    const listener = onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        setName(user.displayName ?? 'Guest');
        setPhoto(user.photoURL ?? '');
        setUid(user.uid);
      }
    });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    function onConnect() {
      setSocketId(socket.id);
    }

    function onDisconnect() {
      setSocketId('');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
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
