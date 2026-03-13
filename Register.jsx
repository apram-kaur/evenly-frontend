import "../App.css";

function Register() {
  return (
    <div className="container">
      <div className="auth-card">

        <h2 className="auth-title">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="auth-input"
        />

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

        <button className="button auth-button">
          Create Account
        </button>

      </div>
    </div>
  );
}

export default Register;
