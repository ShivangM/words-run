import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
// import { User } from '../interfaces/user';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  token: string | null;
  user: User | null;
  signInUser: () => void;
  signOutUser: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,

        signInUser: async () => {
          await signInWithPopup(auth, provider)
            .then((result) => {
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const token = credential!.accessToken;
              const user = result.user;

              set({ user, token });
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
          set({ user: null, token: null });
          useUserStore.persist.clearStorage();
        },
      }),
      {
        name: 'food-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({ user: state.user, token: state.token }),
      }
    )
  )
);

export default useUserStore;
