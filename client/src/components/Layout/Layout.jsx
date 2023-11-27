import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar.jsx';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <main className="App">
      <Navbar />
      <Toaster />
      <Outlet />
    </main>
  );
};

export default Layout;
