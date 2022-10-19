import { Fragment, useEffect, useState, useMemo } from 'react';
import LinkServices from './../../services/links';
import { ShortLink } from './ShortLink';
import { useLinks } from '../../context/links';

const ShortLinkList = () => {
  const [shortLinkList, setShortLinkList] = useState(null);
  const [message, setMessage] = useState(null);
  const links = useLinks();

  useEffect(() => {
    links
      .getLinks()
      .then((res) => {
        setShortLinkList(res);
      })
      .catch((error) => {
        setMessage({ text: 'Could Not Retrieve Link List', status: 'error' });
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }, []);

  let shortLinks = useMemo(() => {
    return shortLinkList?.map((sl) => {
      if (sl.short) {
        return (
          <ShortLink key={sl.id}>
            <ShortLink.Content shortLink={sl} />
          </ShortLink>
        );
      }
      return;
    });
  }, [shortLinkList]);

  return <Fragment>{shortLinks ? shortLinks : 'Loading State Here'}</Fragment>;
};

export default ShortLinkList;
