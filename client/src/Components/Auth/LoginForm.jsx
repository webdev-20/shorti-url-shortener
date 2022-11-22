const LoginForm = () => {
  return (
    <form>
      <label htmlFor="uname">
        <b>Username</b>
      </label>
      <input type="text" placeholder="Enter Username" name="uname" required />
      <br />
      <label htmlFor="psw">
        <b>Password</b>
      </label>
      <input type="password" placeholder="Enter Password" name="psw" required />
      <br />
      <button type="submit">Login</button>
      <br />
    </form>
  );
};
export default LoginForm;
