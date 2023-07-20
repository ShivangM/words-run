import Logo from '../assets/Logo.svg';

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="min-h-screen">
      <img className="w-60 mx-auto" src={Logo} alt="WordsRun Logo" />
    </div>
  );
};

export default Home;
