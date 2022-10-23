import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';

function Navbar() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        {/* <ul>
          <li> */}
        {/* temporary Logo placeholder */}
        <div className={classes.logo}>
          <img src="/public/images/shorti.svg" width={247} height={115}></img>
        </div>
        {/* </li>
          <li className={classes.featuresPricing}>
            <NavLink to="/">Features</NavLink>
          </li>
          <li className={classes.featuresPricing}>
            <NavLink to="/">Pricing</NavLink>
          </li>
        </ul> */}
        <ul className={classes.loginRegister}>
          <li>
            <NavLink to="/" className={classes.signup}>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={classes.login}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
