import Hero from '../components/Hero/Hero.jsx';
import Footer from '../components/Footer/Footer.jsx';
import ShortLinkList from '../components/ShortLinks/ShortLinksList.jsx';
import useAuth from '../hooks/useAuth.js';
import ContentLayout from '../components/ContentLayout.jsx';

const LandingPage = () => {
  const { auth } = useAuth();
  return (
    <div className="App">
      {auth?.user && <p>Welcome {auth.user}</p>}
      <Hero />
      <ContentLayout>
        {auth?.user ? <ShortLinkList /> : <div>Expand your Capabilities...</div>}
      </ContentLayout>
      <Footer />
    </div>
  );
};

export default LandingPage;
