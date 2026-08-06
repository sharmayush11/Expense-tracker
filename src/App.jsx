import { useState, useEffect, useMemo, useRef } from "react";
import "./App.css";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import DonutChart from "./DonutChart";
import CategoryChips from "./CategoryChips";
import BudgetBar from "./BudgetBar";
import Toolbar from "./Toolbar";
import { CATEGORIES, currency } from "./categories";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? JSON.parse(saved) : 5000;
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [activeFilter, setActiveFilter] = useState(null);
  const [leavingIds, setLeavingIds] = useState(new Set());
  const [undoItem, setUndoItem] = useState(null);
  const undoTimer = useRef(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id) => {
    setLeavingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setExpenses((prev) => {
        const item = prev.find((e) => e.id === id);
        if (item) {
          clearTimeout(undoTimer.current);
          setUndoItem(item);
          undoTimer.current = setTimeout(() => setUndoItem(null), 4000);
        }
        return prev.filter((e) => e.id !== id);
      });
      setLeavingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 220);
  };

  const undoDelete = () => {
    if (!undoItem) return;
    setExpenses((prev) => [...prev, undoItem]);
    setUndoItem(null);
    clearTimeout(undoTimer.current);
  };

  const editExpense = (id, changes) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...changes } : e)));
  };

  const total = useMemo(() => expenses.reduce((sum, item) => sum + item.amount, 0), [expenses]);

  const byCategory = useMemo(() => {
    const map = {};
    Object.keys(CATEGORIES).forEach((c) => (map[c] = 0));
    expenses.forEach((e) => (map[e.category] = (map[e.category] || 0) + e.amount));
    return map;
  }, [expenses]);

  const topCategory = useMemo(() => {
    const entries = Object.entries(byCategory).filter(([, v]) => v > 0);
    if (!entries.length) return null;
    return entries.sort((a, b) => b[1] - a[1])[0];
  }, [byCategory]);

  const visibleExpenses = useMemo(() => {
    let list = [...expenses];
    if (activeFilter) list = list.filter((e) => e.category === activeFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((e) => e.title.toLowerCase().includes(q));
    }
    if (sort === "newest") list.sort((a, b) => b.id - a.id);
    if (sort === "highest") list.sort((a, b) => b.amount - a.amount);
    if (sort === "lowest") list.sort((a, b) => a.amount - b.amount);
    return list;
  }, [expenses, activeFilter, search, sort]);

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
      </div>

      <div className="summary-row">
        <DonutChart byCategory={byCategory} total={total} count={expenses.length}
          colors={Object.fromEntries(Object.entries(CATEGORIES).map(([k, v]) => [k, v.color]))} />
        <CategoryChips byCategory={byCategory} activeFilter={activeFilter} onToggle={setActiveFilter} />
      </div>

      <BudgetBar
        budget={budget}
        setBudget={setBudget}
        total={total}
        topCategoryLabel={topCategory ? `Top: ${(CATEGORIES[topCategory[0]] || CATEGORIES.Other).emoji} ${topCategory[0]}` : ""}
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
          <button className="undo-btn" onClick={undoDelete}>Undo</button>
        </div>
      )}
    </div>
  );
}

export default App;