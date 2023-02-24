import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import linkServices from '../services/links.js';

const RedirectTo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { short } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        const originalUrl = await linkServices.redirectToLink(short);
        if (originalUrl) {
          window.location.replace(`//${originalUrl.replace(/(^\w+:|^)\/\//, '')}`);
        } else {
          window.location.assign('/not/found');
        }
      } catch (e) {
        console.error(e);
        window.location.assign('/not/found');
      } finally {
        setIsLoading(false);
      }
    };
    redirect();
  }, []);

  return isLoading ? <div>Redirecting...</div> : null;
};

export default RedirectTo;
