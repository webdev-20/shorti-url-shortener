import { NavLink } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth.js';
import classes from './Navbar.module.css';
import { useLogout } from '../../../hooks/useLogout.js';
import { useAuth } from '../../../hooks/useAuth.js';

function Navbar() {
  // const { auth, setAuth } = useAuth();
  const { user } = useAuth();
  const { logout } = useLogout();
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        {/* temporary Logo placeholder */}
        <NavLink to="/" className={classes.logo}>
          <img src="/images/shorti.svg" width={247} height={115}></img>
        </NavLink>
        {/* </li>
          <li className={classes.featuresPricing}>
            <NavLink to="/">Features</NavLink>
          </li>
          <li className={classes.featuresPricing}>
            <NavLink to="/">Pricing</NavLink>
          </li>
        </ul> */}
        {!user ? (
          <ul className={classes.loginSignup}>
            <li>
              <NavLink to="/signup" className={classes.signup}>
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={classes.login}>
                Login
              </NavLink>
            </li>
          </ul>
        ) : (
          <>
            {/*TODO: Maybe not needed
            <NavLink to="/home">MyLinks</NavLink>
            */}
            {/*TODO: temporary logout*/}
            <NavLink onClick={() => logout()} className={classes.logout}>
              Log Out
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
