import { Route, Routes } from 'react-router-dom';

import './App.css';
import { LinksProvider } from './context/links';
import RedirectTo from './routes/RedirectTo.jsx';
import LandingPage from './routes/LandingPage.jsx';
import NotFoundPage from './routes/NotFound';
import LoginPage from './routes/LoginPage';
import SignupPage from './routes/SignupPage.jsx';
import { AuthContextProvider } from './context/AuthProvider';
import Layout from './components/Layout/Layout.jsx';
import RequireAuth from './components/Auth/RequireAuth';

function App() {
  return (
    <AuthContextProvider>
      <LinksProvider>
        <Routes>
          <Route path=":short" element={<RedirectTo />} />
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            {/* private routes */}
            <Route element={<RequireAuth />}>
              <Route path="home" element={<LandingPage />} />
            </Route>
            {/* catch all */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </LinksProvider>
    </AuthContextProvider>
  );
}

export default App;
