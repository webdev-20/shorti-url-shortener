import { useLinks } from '../context/links';
import { useEffect } from 'react';
import ShortLinkList from '../Components/ShortLinks/ShortLinksList.jsx';

const DashboardPage = () => {
  const links = useLinks();

  /*
    useEffect(() => {
        const fetchLinks = async ()=>{
            await links.getLinks()
        }
        fetchLinks()
    }, []);
*/
  return (
    <div>
      <ShortLinkList />
    </div>
  );
};

export default DashboardPage;
