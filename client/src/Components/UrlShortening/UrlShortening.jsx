import classes from "./UrlShortening.module.css";

function UrlShortening() {
  function handleInput(event) {
    console.log(event.target.value);
  }

  return (
    <div className={classes.UrlShortening}>
      <form>
        <input
          id="urlInput"
          className={classes.urlInput}
          // value=''
          placeholder="url here"
          // type="search"
          autoComplete="off"
          onChange={handleInput}
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
