import Navbar from '../Components/Navbar/Navbar.jsx';
import UrlShortening from '../Components/UrlShortening/UrlShortening.jsx';
import HomePage from './HomePage.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import ShortLinkList from '../Components/ShortLinks/ShortLinksList.jsx';
import useAuth from '../hooks/useAuth.js';

const LandingPage = () => {
  const { auth } = useAuth();
  return (
    <div className="App">
      {auth?.user && <p>Welcome {auth.user}</p>}
      <UrlShortening />
      {auth?.user && <ShortLinkList />}
      <Footer />
    </div>
  );
};

export default LandingPage;
