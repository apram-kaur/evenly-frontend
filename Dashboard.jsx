import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
import { createGroup, getGroups, deleteGroup } from "../api/groups";
import "../App.css";

function Dashboard() {

  const navigate = useNavigate(); // ✅ ADD THIS

  const [showForm, setShowForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [toast, setToast] = useState("");

  // ✅ FETCH GROUPS
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data.data || []);
      } catch (err) {
        console.log("Error fetching groups:", err);
        setGroups([]);
      }
    };

    fetchGroups();
  }, []);

  // ✅ CREATE GROUP
  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
      const res = await createGroup({ name: groupName });
      const newGroup = res.data;

      if (!newGroup || !newGroup.name) {
        alert("Group not returned properly");
        return;
      }

      setGroups((prev) => [...prev, newGroup]);

      setToast("Group added successfully 🎉");
      setTimeout(() => setToast(""), 2000);

      setGroupName("");
      setShowForm(false);

    } catch (err) {
      console.log(err);

      setToast("Failed to create group ❌");
      setTimeout(() => setToast(""), 2000);
    }
  };

  // ✅ DELETE GROUP
  const handleDelete = async () => {
    if (!selectedGroup) return;

    try {
      await deleteGroup(selectedGroup._id);

      setGroups((prev) =>
        prev.filter((g) => g._id !== selectedGroup._id)
      );

      setSelectedGroup(null);

    } catch (err) {
      console.log(err);
      alert("Failed to delete group");
    }
  };

  return (
    <div className="dashboard">

      {/* ✅ TOAST */}
      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="dashboard-header">
        <h1 className="logo">Evenly</h1>
        <button className="logout-btn">Logout</button>
      </div>

      {/* GRID */}
      <div className="dashboard-grid">

        {/* GROUP CARD */}
        <div className="dashboard-card">
          <h3>Your Groups</h3>

          {Array.isArray(groups) && groups.length > 0 ? (
            groups.map((group, index) => (
              <p
                key={group._id || index}
                onClick={() => navigate(`/group/${group._id}`)} // ✅ FIXED
                style={{ cursor: "pointer" }}
              >
                {group.name}
              </p>
            ))
          ) : (
            <p>No groups yet</p>
          )}

          <button
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            Create Group
          </button>

          {showForm && (
            <form onSubmit={handleCreateGroup} style={{ marginTop: "15px" }}>
              <input
                type="text"
                placeholder="Group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="auth-input"
                required
              />

              <button
                type="submit"
                className="primary-btn"
                style={{ marginTop: "10px" }}
              >
                Save Group
              </button>
            </form>
          )}
        </div>

        {/* EXPENSE CARD */}
        <div className="dashboard-card">
          <h3>Recent Expenses</h3>
          <p>No expenses added</p>
        </div>

        {/* BALANCE CARD */}
        <div className="dashboard-card">
          <h3>Your Balance</h3>
          <p className="balance">You are all settled up 🎉</p>
        </div>

      </div>

      {/* MODAL (optional - can remove later) */}
      {selectedGroup && (
        <div className="modal-overlay">
          <div className="modal">

            <h2>{selectedGroup.name}</h2>

            <button
              className="danger-btn"
              onClick={handleDelete}
            >
              Delete Group
            </button>

            <button
              className="secondary-btn"
              onClick={() => setSelectedGroup(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
