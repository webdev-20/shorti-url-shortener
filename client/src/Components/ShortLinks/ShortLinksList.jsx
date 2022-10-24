import { Fragment, useEffect, useState, useMemo } from 'react';
import LinkServices from './../../services/links';
import { ShortLink } from './ShortLink';

const ShortLinkList = () => {
  const [shortLinkList, setShortLinkList] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    LinkServices.getAll()
      .then((res) => {
        setShortLinkList(res.data);
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

  return <Fragment>{shortLinks ? shortLinks : 'Loading state here'}</Fragment>;
};

export default ShortLinkList;
