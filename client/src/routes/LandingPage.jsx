import Hero from '../components/Hero/Hero.jsx';
import Footer from '../components/Layout/Footer/Footer.jsx';
import ShortLinkList from '../components/ShortLinks/ShortLinksList.jsx';
import ContentLayout from '../components/Layout/ContentLayout.jsx';
import { useAuth } from '../hooks/useAuth.js';

const LandingPage = () => {
  const { user } = useAuth();
  return (
    <div className="App">
      {user && <p style={{ fontSize: '1.6em', fontWeight: 600 }}>Welcome {user.email}</p>}
      <Hero />
      <ContentLayout>
        {user ? <ShortLinkList /> : <div>Expand your Capabilities...</div>}
        {/*TODO: show public link (history) maybe last 10 when user is not logged in */}
      </ContentLayout>
      <Footer />
    </div>
  );
};

export default LandingPage;
