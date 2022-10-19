import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UrlShortening from './Components/UrlShortening/UrlShortening';
import ShortLinkList from './Components/ShortLinks/ShortLinksList';

import './App.css';
import { LinksProvider } from './context/links';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <LinksProvider>
      s
      <div className="App">
        <Navbar />
        <UrlShortening />

        <DashboardPage />
        <Footer />
      </div>
    </LinksProvider>
  );
}

export default App;
