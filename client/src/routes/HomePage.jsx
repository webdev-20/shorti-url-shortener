//TODO: maybe this page is not needed
import ShortLinkList from '../components/ShortLinks/ShortLinksList.jsx';
import useAuth from '../hooks/useAuth.js';
import LandingPage from './LandingPage.jsx';

const HomePage = () => {
  //const {auth} = useAuth()
  return (
    <div>
      <ShortLinkList />
    </div>
  );
};

export default HomePage;
