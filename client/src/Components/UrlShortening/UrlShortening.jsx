import { useRef, useState } from 'react';
import classes from './UrlShortening.module.css';
import isURL from 'validator/lib/isURL';

function UrlShortening() {
  const urlInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredUrl = urlInputRef.current.value;
    console.log(enteredUrl);
  }

  const [val, setVal] = useState('');
  const [err, setErr] = useState('');

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
        <button type="submit" className={classes.shortenBtn} disabled={!val || err !== 'Valid URL'}>
          Shorten It!
        </button>
      </form>
    </div>
  );
}

export default UrlShortening;
