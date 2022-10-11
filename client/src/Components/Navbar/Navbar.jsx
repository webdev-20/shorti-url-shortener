import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';

function Navbar() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            {/* temporary Logo placeholder */}
            <NavLink to="/" className={classes.logo}>
              Logo
            </NavLink>
          </li>
          <li className={classes.featuresPricing}>
            <NavLink to="/">Features</NavLink>
          </li>
          <li className={classes.featuresPricing}>
            <NavLink to="/">Pricing</NavLink>
          </li>
        </ul>
        <ul className={classes.loginRegister}>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
