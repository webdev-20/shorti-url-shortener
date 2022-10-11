import React from 'react';
import classes from './Login.module.css';

const Login = () => {
  return (
    <div className={classes.login__container}>
      <form className={classes.form__container}>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
