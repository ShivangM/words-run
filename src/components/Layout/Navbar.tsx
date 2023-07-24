import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import useUserStore from '../../store/userStore';
import UserProfile from './UserProfile';

type Props = {};

const Navbar = (props: Props) => {
  const [signInUser, signOutUser, user] = useUserStore((state) => [
    state.signInUser,
    state.signOutUser,
    state.user,
  ]);

  const auth = getAuth();

  const handleAuth = () => {
    if (auth?.currentUser) {
      signOutUser();
    } else {
      signInUser();
    }
  };

  return (
    <nav className="py-1 px-4 w-full bg-primary">
      <div className="max-w-7xl flex items-center justify-between mx-auto">
        <Link to="/" className="flex items-center h-full">
          <img className="h-16" src={Logo} alt="WordsRun Logo" />
        </Link>

        <div className="space-x-4 flex items-center">
          <div className="sm:block hidden">
            <UserProfile />
          </div>

          <button
            onClick={handleAuth}
            className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
          >
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <span className="relative text-sm sm:text-base text-white">
                {auth?.currentUser ? 'Sign Out' : 'Sign In'}
              </span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
