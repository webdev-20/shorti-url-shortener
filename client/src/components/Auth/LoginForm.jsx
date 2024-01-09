import { useState } from 'react';
import { login } from '../../services/auth.js';
// import useAuth from '../../hooks/useAuth.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin.js';

const LoginForm = () => {
  // const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const [state, setState] = useState({
    email: 'notcori@example.com',
    password: 'password',
  });
  const [message, setMessage] = useState(null);
  //const [success, setSuccess] = useState(false);
  const { login, error, isLoading } = useLogin();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(state);
    } catch (e) {
      // other errors not catched by services/auth/login
      console.error(`Login Error: ${e}`);
    }
  };

  return (
    <>
      <form>
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          value={state.email}
          onChange={handleChange}
          placeholder="Enter Email"
          name="email"
          required
        />
        <br />
        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Enter Password"
          name="password"
          required
        />
        <br />
        <button disabled={isLoading} type="submit" onClick={handleSubmit}>
          Login
        </button>
        <br />
      </form>
      {error && <p>{error}</p>}
    </>
  );
};
export default LoginForm;
