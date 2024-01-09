import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup.js';

const SignupForm = () => {
  const [state, setState] = useState({
    email: 'notcori@example.com',
    password: 'password',
    confirmPassword: 'password',
  });
  const { signup, error, isLoading } = useSignup();
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setShowError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(true);
    await signup(state);

    // res.success = true/false, which can be used for styling error messages
    // setMessage(res.message);
    // setSuccess(res.success);
  };

  return (
    <>
      {!success && (
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
          <button disabled={isLoading} type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <br />
        </form>
      )}
      {showError && error && <p>{error}</p>}
      {success && (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}
    </>
  );
};
export default SignupForm;
