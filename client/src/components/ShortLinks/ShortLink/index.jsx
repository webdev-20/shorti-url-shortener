import { ShortLinkProvider } from './useShortLinkContext';
import { useShortLink } from './useShortLink';
import Card from './../../UI/Card';

import classes from './ShortLink.module.css';
import Ellipsis from '../../UI/Ellipsis/Ellipsis';
import CopyBtn from '../../UI/CopyBtn/CopyBtn';

const ShortLink = ({ children }) => {
  return <Card>{children}</Card>;
};

const Content = ({ shortLink }) => {
  const { shortLinkState } = useShortLink(shortLink);

  return (
    <ShortLinkProvider value={shortLinkState}>
      <section className={classes.shortLink_content}>
        <div>
          {shortLink.title ? (
            <header className={classes.shortLink_title}>{shortLink.title}</header>
          ) : (
            <header className={classes.shortLink_title}>Link Title</header>
          )}

          <p className={classes.shortLink_data}>
            been clicked <span>{shortLink.timesClicked}</span> times
          </p>
          <Ellipsis addlClasses={[classes.shortLink_ellipsis]} />
        </div>
        <div>
          {shortLink.url.length > 50 ? `${shortLink.url.substring(0, 50)}...` : `${shortLink.url}`}
        </div>
        <div>
          <p className={classes.shortLink_short}>
            {shortLink.short} {shortLink.short ? <CopyBtn text={false} /> : ''}
          </p>
        </div>
      </section>
    </ShortLinkProvider>
  );
};

ShortLink.Content = Content;

export { ShortLink };
