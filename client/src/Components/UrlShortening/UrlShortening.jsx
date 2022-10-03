import { useRef } from "react";
import { createLink } from "../../services";
import classes from "./UrlShortening.module.css";

function UrlShortening() {
  const urlInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUrl = urlInputRef.current.value;
    createLink(enteredUrl)
  }

  return (
    <div className={classes.UrlShortening}>
      <form className={classes.form} onSubmit={submitHandler}>
        <input
          id="urlInput"
          className={classes.urlInput}
          ref={urlInputRef}
          placeholder="url here"
          type="url"
          autoComplete="off"
          autoFocus="on"
        ></input>
        <button type="submit" className={classes.shortenBtn}>
          Shorten It!
        </button>
      </form>
    </div>
  );
}

export default UrlShortening;
