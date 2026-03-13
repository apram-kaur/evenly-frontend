import { useNavigate } from "react-router-dom";
import "../App.css";

function Auth() {

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="hero">

        <h2 style={{color:"#818263"}}>Welcome to Evenly</h2>
        <p className="tagline">Split expenses. Stay friends.</p>

        <button
          className="button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <br />

        <button
          className="button"
          style={{marginTop:"15px"}}
          onClick={() => navigate("/register")}
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default Auth;
