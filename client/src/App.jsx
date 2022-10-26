import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UrlShortening from './Components/UrlShortening/UrlShortening';
import ShortLinkList from './Components/ShortLinks/ShortLinksList';
import Features from './Components/Features/Features';


import './App.css';
import { LinksProvider } from './context/links';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <LinksProvider>
      <div className="App">
        <Navbar />
        <UrlShortening />
        {/*TODO: DashboardPage will be removed from the index page when we set up routing*/}
        <DashboardPage />
        <Footer />
      </div>
    </LinksProvider>
  );
}

export default App;
