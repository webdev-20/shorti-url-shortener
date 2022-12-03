import UrlShortening from '../components/UrlShortening/UrlShortening.jsx';
import Footer from '../components/Footer/Footer.jsx';
import ShortLinkList from '../components/ShortLinks/ShortLinksList.jsx';
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
