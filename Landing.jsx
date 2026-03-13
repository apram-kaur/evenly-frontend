import { Link } from "react-router-dom";
import "../App.css";

function Landing() {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="logo">Evenly</h1>
        <p className="tagline">Split expenses. Stay friends.</p>

        <Link to="/auth">
          <button className="button">Get Started</button>
        </Link>

      </div>
    </div>
  );
}

export default Landing;
