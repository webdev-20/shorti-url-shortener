import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UrlShortening from './Components/UrlShortening/UrlShortening';
import './App.css';
import ShortLinkList from './Components/ShortLinks/ShortLinksList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <UrlShortening />
      <ShortLinkList />
      <Footer />
    </div>
  );
}

export default App;
