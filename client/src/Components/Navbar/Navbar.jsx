import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/" className={classes.logo}>
              Logo
            </NavLink>
          </li>
          <li>
            <NavLink to="/">Features</NavLink>
          </li>
          <li>
            <NavLink to="/">Pricing</NavLink>
          </li>
        </ul>
        <ul className={classes.loginRegister}>
          <li>
            <NavLink to="/">Login</NavLink>
          </li>
          <li>
            <NavLink to="/">Register</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
