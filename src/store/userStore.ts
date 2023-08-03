import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// import { User } from '../interfaces/user';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db, provider } from '../utils/firebase';
import dummyImage from '../assets/Dummy Profile.png';
import { User } from '../interfaces/user.d';
import { Game } from '../interfaces/game';
import { toast } from 'react-toastify';
import { collection, doc, getDoc } from 'firebase/firestore';

interface UserState {
  user: User;
  games: Game[];
  fetchGames: () => void;
  setSocketId: (socketId: string) => void;
  signInUser: () => void;
  signOutUser: () => void;
  setName: (name: string) => void;
  setPhoto: (photo: string) => void;
  setUid: (uid: string) => void;
}

const initialUser = {
  displayName: 'Guest',
  photoURL: dummyImage,
};

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: initialUser,
        games: [],

        fetchGames: async () => {
          if (get().user?.uid) {
            toast.loading('Fetching your previous games', {
              toastId: 'fetching-previous-games',
            });

            const usersCollection = collection(db, 'users');
            const userData = await getDoc(
              doc(usersCollection, get().user?.uid)
            );
            const prevGames = await userData?.data()?.games?.reverse();
            set({ games: prevGames });
            toast.dismiss('fetching-previous-games');
          }

          // else {
          //   const games = localStorage.getItem('games');
          //   if (games) {
          //     set({ games: JSON.parse(games) });
          //   }
          // }
        },

        setSocketId: (socketId) => {
          set((state) => ({ user: { ...state.user, socketId } }));
        },

        setName: (name) => {
          set((state) => ({ user: { ...state.user, displayName: name } }));
        },

        setPhoto: (photo) => {
          set((state) => ({ user: { ...state.user, photoURL: photo } }));
        },

        setUid: (uid) => {
          set((state) => ({ user: { ...state.user, uid } }));
        },

        signInUser: async () => {
          await signInWithPopup(auth, provider)
            .then((result) => {
              const res = result.user;
              console.log(res);
              const user = {
                displayName: res?.displayName || 'Guest',
                photoURL: res?.photoURL || dummyImage,
              };

              set({ user });
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              const email = error.customData.email;
              const credential = GoogleAuthProvider.credentialFromError(error);
              console.error(errorCode, errorMessage, email, credential);
            });
        },

        signOutUser: async () => {
          await signOut(auth);
          set({ user: initialUser, games: [] });
        },
      }),
      {
        name: 'user-storage',
        getStorage: () => localStorage,
        partialize: (state) => ({
          user: {
            displayName: state.user.displayName,
            photoURL: state.user.photoURL,
          },
        }),
      }
    )
  )
);

export default useUserStore;
