import PreviousGameHistory from '../components/Home/PreviousGameHistory';
import MultiplePlayerMode from '../components/Home/MultiplePlayerMode';
import PlayWithFriendsMode from '../components/Home/PlayWithFriendsMode';
import SinglePlayerMode from '../components/Home/SinglePlayerMode';
import UserProfile from '../components/Layout/UserProfile';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="p-6 lg:p-10 h-full max-w-7xl mx-auto lg:max-h-[680px] lg:h-screen">
      <div className="block py-4 pb-8 sm:hidden">
        <UserProfile />
      </div>

      <div className="grid grid-cols-1 h-full gap-8 md:grid-cols-2">
        <div className="grid grid-col-1 gap-6 md:grid-cols-1 lg:grid-cols-2 ">
          <div className="h-full text-2xl lg:text-3xl w-full shadow-md shadow-secondary bg-primary2 rounded-xl row-span-1 col-span-2">
            <MultiplePlayerMode />
          </div>
          <div className="h-full text-2xl w-full shadow-md shadow-secondary bg-primary2 rounded-xl row-span-1 col-span-2 xl:col-span-1">
            <SinglePlayerMode />
          </div>
          <div className="h-full text-2xl w-full shadow-md shadow-secondary bg-primary2 rounded-xl row-span-1 col-span-2 xl:col-span-1">
            <PlayWithFriendsMode />
          </div>
        </div>

        <PreviousGameHistory />
      </div>
    </div>
  );
};

export default Home;
