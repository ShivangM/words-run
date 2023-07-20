import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="py-1 w-full bg-primary">
      <div className="max-w-7xl flex items-center justify-between mx-auto">
        <Link to="/" className="flex items-center h-full">
          <img className="h-16" src={Logo} alt="WordsRun Logo" />
        </Link>

        <div className="space-x-4 flex items-center">
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4 items-end">
              <img
                src="https://picsum.photos/200/300"
                alt="Profile"
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex flex-col">
                <p className="text-white text-xl font-semibold">Guest</p>
                <div className="flex text-sm items-center space-x-2">
                  <span>0 WPM</span>
                  <span>0 Races</span>
                </div>
              </div>
            </div>
          </div>

          <button className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md">
            <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
            <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
              <span className="relative text-white">Login / Signup</span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
