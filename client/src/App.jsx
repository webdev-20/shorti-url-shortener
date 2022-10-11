import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import UrlShortening from './Components/UrlShortening/UrlShortening';
import ShortLinkList from './Components/ShortLinks/ShortLinksList';

import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<UrlShortening />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ShortLinkList />
 main
      <Footer />
    </div>
  );
}

export default App;
