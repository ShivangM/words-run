import useUserStore from '../../store/userStore';
import dummyImage from '../../assets/Dummy Profile.png';

type Props = {};

const UserProfile = (props: Props) => {
  const [user] = useUserStore((state) => [state.user]);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-4 items-end">
        <img
          src={user?.photoURL || dummyImage}
          alt={user?.displayName || 'User'}
          className="w-12 h-12 rounded-lg"
        />
        <div className="flex flex-col">
          <p className="text-white text-xl font-semibold">
            {user?.displayName || 'Guest'}
          </p>
          <div className="flex text-sm items-center space-x-2">
            <span>0 WPM</span>
            <span>0 Races</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
