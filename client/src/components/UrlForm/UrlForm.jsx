import classes from './UrlForm.module.css';
import { useRef, useState } from 'react';
import { useLinks } from '../../context/links.jsx';
//import useAuth from '../../hooks/useAuth.js';
import isURL from 'validator/lib/isURL.js';

const UrlForm = () => {
  const urlInputRef = useRef();
  const [val, setVal] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const links = useLinks();

  //const { auth } = useAuth();

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
    <form className={auth?.user ? classes.form_auth : classes.form} onSubmit={submitHandler}>
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
      <button type="submit" className={classes.shortenBtn} disabled={!val || !isValidUrl}>
        Shorten It!
      </button>
    </form>
  );
};

export default UrlForm;
