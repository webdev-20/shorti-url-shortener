import { useState } from 'react';
import { register } from '../../services/auth.js';

const RegisterForm = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(state);
  };

  return (
    <form>
      <label htmlFor="email">
        <b>Email</b>
      </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        value={state.email}
        onChange={handleChange}
        autoComplete="email"
        required
      />
      <br />
      <label htmlFor="password">
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        value={state.password}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
      <br />
      <label htmlFor="confirmpassword">
        <b>Confirm Password</b>
      </label>
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={state.confirmPassword}
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
      <br />
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
      <br />
    </form>
  );
};
export default RegisterForm;
