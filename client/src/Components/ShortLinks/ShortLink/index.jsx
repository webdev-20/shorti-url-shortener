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
            been clicked <span>20</span> times
          </p>
          <Ellipsis addlClasses={[classes.shortLink_ellipsis]} />
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

// export default function QuickLink({ ql }) {
// const {
//   quickLink,
//   showEditForm,
//   quicklinkHover,
//   setQuicklinkHover,
//   setShowEditForm,
//   toggleShowFormHandler,
//   closeFormOnChange,
//   onQLChangeHandler,
// } = useQuickLink({ ql })

//   return (
//     <QuickLinkProvider value={{ quickLink }}>
//       <article
//         id={quickLink.id}
//         className={`quickLink ${styles.quickLink} ${
//           quicklinkHover || showEditForm ? 'active' : ''
//         }`}
//         onMouseOver={() => setQuicklinkHover(true)}
//         onMouseLeave={() => setQuicklinkHover(false)}
//         onBlur={toggleShowFormHandler}
//       >
//         {!showEditForm ? (
//           <OutlinedButton
//             size="sm"
//             classes={[
//               `${!quicklinkHover ? 'invisible' : ''}`,
//               'quickLink_editBtn',
//             ]}
//             onClick={() => setShowEditForm(true)}
//           >
//             <Icon icon="ant-design:edit-outlined" inline={true} />
//             Edit
//           </OutlinedButton>
//         ) : (
//           <CloseButton
//             onClick={() => setShowEditForm(false)}
//             title="Close QuickLink Edit"
//           />
//         )}

//         <a
//           className={styles.quickLink_button}
//           href={`${quickLink.url}`}
//           target="_blank"
//           rel="noreferrer noopener"
//         >
//           <div className={styles.quickLink_icon}>
//             {quickLink.image ? (
//               <img src={quickLink.image} />
//             ) : (
//               <Icon icon="fluent:globe-32-regular" width={64} />
//             )}
//           </div>

//           {ql.label}
//         </a>
//         {showEditForm && (
//           <QuickLinkForm
//             onSubmit={onQLChangeHandler}
//             toggleShowForm={toggleShowFormHandler}
//             content={ql}
//             closeForm={closeFormOnChange}
//           />
//         )}
//       </article>
//     </QuickLinkProvider>
//   )
// }
