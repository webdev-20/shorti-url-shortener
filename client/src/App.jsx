import { Route, Routes } from 'react-router-dom';

import './App.css';
import { LinksProvider } from './context/links';
import HomePage from './routes/HomePage';
import RedirectTo from './routes/RedirectTo.jsx';
import LandingPage from './routes/LandingPage.jsx';
import NotFoundPage from './routes/NotFound';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage.jsx';

function App() {
  return (
    <LinksProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path=":short" element={<RedirectTo />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LinksProvider>
  );
}

export default App;
