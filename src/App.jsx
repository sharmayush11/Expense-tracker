import { useState, useEffect, useMemo, useRef } from "react";

import "./App.css";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import DonutChart from "./DonutChart";
import CategoryChips from "./CategoryChips";
import BudgetBar from "./BudgetBar";
import Toolbar from "./Toolbar";
import Auth from "./Auth";

import { CATEGORIES, currency } from "./categories";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8081";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? JSON.parse(saved) : 5000;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [activeFilter, setActiveFilter] = useState(null);
  const [leavingIds, setLeavingIds] = useState(new Set());
  const [undoItem, setUndoItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  const undoTimer = useRef(null);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken("");
    setExpenses([]);
    setUndoItem(null);
    setError("");
    setLoadError("");
    setSearch("");
    setActiveFilter(null);
  };

  const apiRequest = async (path, options = {}) => {
    let response;

    try {
      response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
          ...options.headers,
        },
      });
    } catch {
      throw new Error(
        "Unable to connect to the server. Check your connection and make sure the backend is running."
      );
    }

    const result = await response.json().catch(() => ({}));

    if (response.status === 401 || response.status === 403) {
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      throw new Error(
        result.message || `Request failed (${response.status})`
      );
    }

    return result;
  };

  const fetchExpenses = async () => {
    if (!token) {
      setExpenses([]);
      return;
    }

    setLoading(true);
    setLoadError("");

    try {
      const result = await apiRequest("/expenses");

      setExpenses(
        (result.data || []).map((expense) => ({
          ...expense,
          id: expense._id || expense.id,
        }))
      );
    } catch (err) {
      setLoadError(err.message);

      if (
        err.message.toLowerCase().includes("session expired") ||
        err.message.toLowerCase().includes("jwt")
      ) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
    } else {
      setExpenses([]);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    return () => clearTimeout(undoTimer.current);
  }, []);

  const addExpense = async (expense) => {
    setError("");

    try {
      const result = await apiRequest("/expenses", {
        method: "POST",
        body: JSON.stringify({
          title: expense.title,
          amount: Number(expense.amount),
          category: expense.category,
          date: expense.date,
        }),
      });

      if (result.success && Array.isArray(result.data)) {
        const savedExpenses = result.data.map((item) => ({
          ...item,
          id: item._id || item.id,
        }));

        setExpenses(savedExpenses);
      } else {
        await fetchExpenses();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteExpense = (id) => {
    setLeavingIds((prev) => new Set(prev).add(id));

    setTimeout(async () => {
      const item = expenses.find((expense) => expense.id === id);

      setLeavingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });

      if (!item) return;

      setError("");

      try {
        await apiRequest(`/expenses/${id}`, {
          method: "DELETE",
        });

        setExpenses((prev) =>
          prev.filter((expense) => expense.id !== id)
        );

        clearTimeout(undoTimer.current);
        setUndoItem(item);

        undoTimer.current = setTimeout(() => {
          setUndoItem(null);
        }, 4000);
      } catch (err) {
        setError(err.message);
      }
    }, 220);
  };

  const undoDelete = async () => {
    if (!undoItem) return;

    const item = undoItem;

    clearTimeout(undoTimer.current);
    setUndoItem(null);
    setError("");

    try {
      const result = await apiRequest("/expenses/restore", {
        method: "POST",
        body: JSON.stringify({
          _id: item._id || item.id,
          title: item.title,
          amount: Number(item.amount),
          category: item.category,
          date: item.date,
        }),
      });

      if (result.success && Array.isArray(result.data)) {
        setExpenses(
          result.data.map((expense) => ({
            ...expense,
            id: expense._id || expense.id,
          }))
        );
      } else {
        await fetchExpenses();
      }
    } catch (err) {
      setError(`Undo failed: ${err.message}`);
      await fetchExpenses();
    }
  };

  // Edit expense
  const editExpense = async (id, changes) => {
    const current = expenses.find((expense) => expense.id === id);

    if (!current) return;

    const updated = { ...current, ...changes };
    setError("");

    try {
      const result = await apiRequest(`/expenses/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: updated.title,
          amount: Number(updated.amount),
          category: updated.category,
          date: updated.date,
        }),
      });

      if (result.success && Array.isArray(result.data)) {
        setExpenses(
          result.data.map((expense) => ({
            ...expense,
            id: expense._id || expense.id,
          }))
        );
      } else {
        await fetchExpenses();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const total = useMemo(
    () =>
      expenses.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      ),
    [expenses]
  );

  const byCategory = useMemo(() => {
    const map = {};

    Object.keys(CATEGORIES).forEach((category) => {
      map[category] = 0;
    });

    expenses.forEach((expense) => {
      map[expense.category] =
        (map[expense.category] || 0) + Number(expense.amount || 0);
    });

    return map;
  }, [expenses]);

  const topCategory = useMemo(() => {
    const entries = Object.entries(byCategory).filter(
      ([, value]) => value > 0
    );

    if (!entries.length) return null;

    return entries.sort((a, b) => b[1] - a[1])[0];
  }, [byCategory]);

  const visibleExpenses = useMemo(() => {
    let list = [...expenses];

    if (activeFilter) {
      list = list.filter(
        (expense) => expense.category === activeFilter
      );
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      list = list.filter((expense) =>
        (expense.title || "").toLowerCase().includes(query)
      );
    }

    if (sort === "newest") {
      list.sort((a, b) =>
        String(b.date).localeCompare(String(a.date))
      );
    }

    if (sort === "highest") {
      list.sort((a, b) => Number(b.amount || 0) - Number(a.amount || 0));
    }

    if (sort === "lowest") {
      list.sort((a, b) => Number(a.amount || 0) - Number(b.amount || 0));
    }

    return list;
  }, [expenses, activeFilter, search, sort]);

  if (!token) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div className="head-row">
        <div>
          <div className="eyebrow">DAILY LEDGER</div>
          <h1>💰 Expense Tracker</h1>
        </div>

        <div className="total-box">
          <div className="total-label">Total spent</div>
          <div className="total-num">{currency(total)}</div>
        </div>

        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && (
        <div className="error-message" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")}>
            Dismiss
          </button>
        </div>
      )}

      {loadError && (
        <div className="error-message" role="alert">
          <span>{loadError}</span>
          <div className="error-actions">
            <button type="button" onClick={fetchExpenses} disabled={loading}>
              {loading ? "Retrying..." : "Retry"}
            </button>
            <button type="button" onClick={() => setLoadError("")}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="summary-row">
        <DonutChart
          byCategory={byCategory}
          total={total}
          count={expenses.length}
          colors={Object.fromEntries(
            Object.entries(CATEGORIES).map(([key, value]) => [
              key,
              value.color,
            ])
          )}
        />

        <CategoryChips
          byCategory={byCategory}
          activeFilter={activeFilter}
          onToggle={setActiveFilter}
        />
      </div>

      <BudgetBar
        budget={budget}
        setBudget={setBudget}
        total={total}
        topCategoryLabel={
          topCategory
            ? `Top: ${
                (CATEGORIES[topCategory[0]] || CATEGORIES.Other).emoji
              } ${topCategory[0]}`
            : ""
        }
      />

      <ExpenseForm onAddExpense={addExpense} />

      <Toolbar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
        activeFilter={activeFilter}
        clearFilter={() => setActiveFilter(null)}
      />

      {loading && (
        <p className="loading-message" role="status" aria-live="polite">
          <span className="loading-spinner" aria-hidden="true" />
          Loading expenses...
        </p>
      )}

      <ExpenseList
        expenses={visibleExpenses}
        onDelete={deleteExpense}
        onEdit={editExpense}
        leavingIds={leavingIds}
        hasAnyExpenses={expenses.length > 0}
      />

      {undoItem && (
        <div className="toast">
          <span>Deleted "{undoItem.title}"</span>

          <button
            type="button"
            className="undo-btn"
            onClick={undoDelete}
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

