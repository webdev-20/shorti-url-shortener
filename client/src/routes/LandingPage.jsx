import Hero from '../components/Hero/Hero.jsx';
import Footer from '../components/Layout/Footer/Footer.jsx';
import ShortLinkList from '../components/ShortLinks/ShortLinksList.jsx';
import useAuth from '../hooks/useAuth.js';
import ContentLayout from '../components/Layout/ContentLayout.jsx';

const LandingPage = () => {
  const { auth } = useAuth();
  return (
    <div className="App">
      {auth?.user && <p style={{ fontSize: '1.6em', fontWeight: 600 }}>Welcome {auth.user}</p>}
      <Hero />
      <ContentLayout>
        {auth?.user ? <ShortLinkList /> : <div>Expand your Capabilities...</div>}
      </ContentLayout>
      <Footer />
    </div>
  );
};

export default LandingPage;
