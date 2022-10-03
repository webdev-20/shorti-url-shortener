import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UrlShortening from './Components/UrlShortening/UrlShortening';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <UrlShortening />
      <Footer />
    </div>
  );
}

export default App;
