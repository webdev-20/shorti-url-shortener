import { Route, Routes } from 'react-router-dom';

import './App.css';
import { LinksProvider } from './context/links';
import HomePage from './routes/HomePage';
import RedirectTo from './routes/RedirectTo.jsx';
import LandingPage from './routes/LandingPage.jsx';
import NotFoundPage from './routes/NotFound';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage.jsx';
import { AuthProvider } from './context/AuthProvider';
import Layout from './Components/Layout';
import RequireAuth from './Components/Auth/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <LinksProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path=":short" element={<RedirectTo />} />
            {/* private routes */}
            <Route element={<RequireAuth />}>
              <Route path="home" element={<HomePage />} />
            </Route>
            {/* catch all */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </LinksProvider>
    </AuthProvider>
  );
}

export default App;
