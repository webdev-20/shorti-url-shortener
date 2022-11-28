import Navbar from '../Components/Navbar/Navbar.jsx';
import UrlShortening from '../Components/UrlShortening/UrlShortening.jsx';
import HomePage from './HomePage.jsx';
import Footer from '../Components/Footer/Footer.jsx';

const LandingPage = () => {
  return (
    <div className="App">
      <UrlShortening />
      {/*TODO: HomePage will be removed from the index page when we set up routing*/}
      <HomePage />
      <Footer />
    </div>
  );
};

export default LandingPage;
