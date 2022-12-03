import { useRef, useState } from 'react';
import classes from './UrlShortening.module.css';
import isURL from 'validator/lib/isURL';
import { useLinks } from '../../context/links.jsx';

function UrlShortening() {
  const urlInputRef = useRef();
  const [val, setVal] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const links = useLinks();

  async function submitHandler(event) {
    event.preventDefault();
    if (isValidUrl) {
      const enteredUrl = urlInputRef.current.value;
      await links.addLink({ url: enteredUrl });
    }
  }

  const validate = (e) => {
    setVal(e.target.value);
    setIsValidUrl(isURL(e.target.value));
  };

  return (
    <div className={classes.UrlShortening}>
      <div className={classes.sloganTop}>Making Sharing</div>
      <div className={classes.sloganBottom}>Easy &nbsp;&nbsp; Beautiful</div>
      <span className={classes.and}>&</span>
      <hr className={classes.lineOne}></hr>
      <hr className={classes.lineTwo}></hr>
      <hr className={classes.lineThree}></hr>
      <hr className={classes.lineFour}></hr>
      <hr className={classes.lineFive}></hr>
      <span className={classes.creationImg}>
        <img src="/images/undraw_creation_re_d1mi 1.png" height={457} />
      </span>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          id="urlInput"
          className={classes.urlInput}
          ref={urlInputRef}
          placeholder="Your long, unattractive URL goes here"
          type="text"
          autoComplete="off"
          autoFocus="on"
          onChange={validate}
          onPaste={validate}
          onCopy={validate}
          onCut={validate}
        ></input>
        <p>{isValidUrl ? 'valid' : 'invalid'}</p>
        <button type="submit" className={classes.shortenBtn} disabled={!val || !isValidUrl}>
          Shorten It!
        </button>
      </form>
    </div>
  );
}

export default UrlShortening;
