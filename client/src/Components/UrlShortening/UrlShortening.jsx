import classes from "./UrlShortening.module.css";

function UrlShortening() {
  return (
    <div className={classes.UrlShortening}>
      <form>
        <input
        //   id="word-lookup"
          // value='url here'
          placeholder="url here"
          type="search"
          autoComplete="off"
          // onChange={handleInput}
          autoFocus="on"
        ></input>
      </form>
    </div>
  );
}

export default UrlShortening;
