import { Link } from "react-router-dom";
import "../App.css";

function Landing() {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="logo">Evenly</h1>
        <p className="tagline">Split expenses. Stay friends.</p>
        <div className ="floating-icons">
          <span>💸</span>
          <span>🍔</span>
          <span>🧾</span>
          <span>💳</span>
        </div>
        <Link to="/auth">
          <button className="button">Get Started</button>
        </Link>

      </div>
    </div>


  );
}

export default Landing;
