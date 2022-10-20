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
    setIsValidUrl(isURL(val));
  };

  return (
    <div className={classes.UrlShortening}>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          id="urlInput"
          className={classes.urlInput}
          ref={urlInputRef}
          placeholder="url here"
          type="text"
          autoComplete="off"
          autoFocus="on"
          onChange={validate}
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
