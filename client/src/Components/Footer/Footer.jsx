import classes from './Footer.module.css';

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.gridContainer}>
        <div className={classes.innerFooterLeft}>
          <div className={classes.cell}>
            <h4>Features</h4>
            <ul>
              <li>Shortening URL</li>
              <li>URL Management</li>
            </ul>
          </div>
          <div className={classes.cell}>
            <h4>About Us</h4>
            <ul>
              <li>Our Team</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className={classes.innerFooterRight}></div>
      </div>
    </footer>
  );
}

export default Footer;
