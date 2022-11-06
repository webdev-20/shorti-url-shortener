import { Route, Routes } from 'react-router-dom';

import './App.css';
import { LinksProvider } from './context/links';
import HomePage from './routes/HomePage';
import RedirectTo from './routes/RedirectTo.jsx';
import LandingPage from './routes/LandingPage.jsx';
import NotFoundPage from './routes/NotFound';

function App() {
  return (
    <LinksProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path=":short" element={<RedirectTo />} />
        <Route path="home" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LinksProvider>
  );
}

export default App;
