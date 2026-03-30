import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  sendInvite,
  getGroupInvites,
  createGroupExpense,
  getGroupExpenses,
} from "../api/groups";
import "../App.css";

function GroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const group = location.state?.group;

  const [email, setEmail] = useState("");
  const [toast, setToast] = useState("");
  const [invites, setInvites] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inviteData = await getGroupInvites(id);
        setInvites(inviteData.invites || []);

        const expenseData = await getGroupExpenses(id);
        console.log("Fetched expenses:", expenseData);
        setExpenses(expenseData.data || []);
      } catch (err) {
        console.log("Error fetching group data:", err);
        setInvites([]);
        setExpenses([]);
      }
    };

    fetchData();
  }, [id]);

  const handleInvite = async (e) => {
    e.preventDefault();

    try {
      await sendInvite(id, email);

      const data = await getGroupInvites(id);
      setInvites(data.invites || []);

      setToast("Invite sent successfully 🎉");
      setTimeout(() => setToast(""), 2000);
      setEmail("");
    } catch (err) {
      console.log(err);
      setToast("Failed to send invite ❌");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded.id || decoded._id;

      const expenseData = {
        title: expenseTitle,
        amount: Number(expenseAmount),
        group: id,
        splitType: "equal",
        splits: [userId],
      };

      console.log("Decoded token:", decoded);
      console.log("Expense data being sent:", expenseData);

      await createGroupExpense(expenseData);

      const updatedExpenses = await getGroupExpenses(id);
      setExpenses(updatedExpenses.data || []);

      setToast("Expense added successfully 🎉");
      setTimeout(() => setToast(""), 2000);

      setExpenseTitle("");
      setExpenseAmount("");
      setShowExpenseForm(false);
    } catch (err) {
      console.log("Expense error:", err);
      console.log("Backend response:", err.response?.data);

      setToast(err.response?.data?.message || "Failed to add expense ❌");
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
        <div className="group-header">
          <div>
            <h1 className="group-page-title">
              {group?.name || "Unnamed Group"}
            </h1>
            <p className="group-page-subtitle"></p>
          </div>

          <div className="group-stats">
            <div className="stat-pill">👥 {invites.length} members</div>
            <div className="stat-pill">💸 {expenses.length} expenses</div>
            <div className="stat-pill">
              💰 ₹
              {expenses.reduce(
                (sum, expense) => sum + Number(expense.amount || 0),
                0
              )}{" "}
              spent
            </div>
          </div>
        </div>

        <div className="group-section">
          <h2>Members</h2>

          {invites.length > 0 ? (
            invites.map((invite) => (
              <p key={invite._id} className="section-text">
                {invite.email} (pending)
              </p>
            ))
          ) : (
            <p className="section-text">No members yet</p>
          )}

          <form onSubmit={handleInvite} className="invite-form">
            <input
              type="email"
              placeholder="Enter member email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input group-input"
              required
            />

            <button type="submit" className="primary-btn invite-btn">
              Add Member
            </button>
          </form>
        </div>

        <div className="group-section">
          <h2>Expenses</h2>

          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <p key={expense._id} className="section-text">
                {expense.title} — ₹{expense.amount}
              </p>
            ))
          ) : (
            <p className="section-text">No expenses yet</p>
          )}

          <button
            className="primary-btn"
            onClick={() => setShowExpenseForm(true)}
          >
            Add Expense
          </button>

          {showExpenseForm && (
            <form className="invite-form" onSubmit={handleAddExpense}>
              <input
                type="text"
                placeholder="Expense title"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className="auth-input group-input"
                required
              />

              <input
                type="number"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="auth-input group-input"
                required
              />

              <button type="submit" className="primary-btn">
                Save Expense
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={() => setShowExpenseForm(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupPage;