import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { sendInvite } from "../api/groups";
import "../App.css";

function GroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const group = location.state?.group;

  const [email, setEmail] = useState("");
  const [toast, setToast] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();

    try {
      const res = await sendInvite(id, email);
      console.log(res);

      setToast("Invite sent successfully 🎉");
      setTimeout(() => setToast(""), 2000);

      setEmail("");
    } catch (err) {
      console.log(err);
      setToast("Failed to send invite ❌");
      setTimeout(() => setToast(""), 2000);
    }
  };

  return (
    <div className="group-page">
      {toast && <div className="toast">{toast}</div>}

      <button
        className="secondary-btn back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <div className="group-page-card">
        <h1 className="group-page-title">
          {group?.name || "Group"}
        </h1>
        <p className="group-page-id">Group details</p>

        <div className="group-section">
          <h2>Members</h2>
          <p>No members yet</p>

          <form onSubmit={handleInvite} style={{ marginTop: "15px" }}>
            <input
              type="email"
              placeholder="Enter member email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />

            <button type="submit" className="primary-btn">
              Add Member
            </button>
          </form>
        </div>

        <div className="group-section">
          <h2>Expenses</h2>
          <p>No expenses yet</p>
          <button className="primary-btn">Add Expense</button>
        </div>
      </div>
    </div>
  );
}

export default GroupPage;