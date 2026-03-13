import "../App.css";

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="auth-input"
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
        />

        <button className="auth-button">
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;
