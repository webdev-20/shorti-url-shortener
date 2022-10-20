import { useRef, useState } from 'react';
import classes from './UrlShortening.module.css';
import isURL from 'validator/lib/isURL';
import linksServices from '../../services/links.js';
import { useLinks } from '../../context/links.jsx';

function UrlShortening() {
  const urlInputRef = useRef();
  const [val, setVal] = useState('');
  // TODO: should probably refactor it to use another variable name as
  // "valid url" is not an err
  const [err, setErr] = useState('');
  const links = useLinks();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUrl = urlInputRef.current.value;
    await links.addLink({ url: enteredUrl });
    //await linksServices.createLink()
  }

  const validate = (e) => {
    setVal(e.target.value);
    if (isURL(val)) {
      setErr('Valid URL');
    } else {
      setErr('Invalid URL');
    }
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
        <p>{err}</p>
        <button
          type="submit"
          className={classes.shortenBtn}
          disabled={!val || err === 'Invalid URL'}
        >
          Shorten It!
        </button>
      </form>
    </div>
  );
}

export default UrlShortening;
