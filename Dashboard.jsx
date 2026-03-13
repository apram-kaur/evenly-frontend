import "../App.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1 className="logo">Evenly</h1>
        <button className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Your Groups</h3>
          <p>No groups yet</p>
          <button className="primary-btn">Create Group</button>
        </div>

        <div className="dashboard-card">
          <h3>Recent Expenses</h3>
          <p>No expenses added</p>
        </div>

        <div className="dashboard-card">
          <h3>Your Balance</h3>
          <p className="balance">You are all settled up 🎉</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
