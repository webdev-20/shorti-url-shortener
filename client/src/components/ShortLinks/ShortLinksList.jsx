import { Fragment, useEffect, useState, useMemo } from 'react';
import { ShortLink } from './ShortLink';
import { useLinks } from '../../context/links';

const ShortLinkList = () => {
  const [message, setMessage] = useState(null);
  const links = useLinks();

  // TODO: make it read from the state
  useEffect(() => {
    links
      .getLinks()
      .then((res) => {})
      .catch((error) => {
        setMessage({ text: 'Could Not Retrieve Link List', status: 'error' });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }, []);

  let shortLinks = useMemo(() => {
    return links.state.links?.map((sl) => {
      if (sl.short) {
        return (
          <ShortLink key={sl.id}>
            <ShortLink.Content shortLink={sl} />
          </ShortLink>
        );
      }
      return;
    });
  }, [links.state.links]);

  return <Fragment>{shortLinks ? shortLinks : 'Loading state here'}</Fragment>;
};

export default ShortLinkList;
