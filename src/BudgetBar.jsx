import { currency } from "./categories";

function BudgetBar({ budget, setBudget, total, topCategoryLabel }) {
  const pct = budget > 0 ? Math.min(100, (total / budget) * 100) : 0;
  const overBudget = budget > 0 && total > budget;

  return (
    <div className="budget-row">
      <div className="budget-label-row">
        <label className="small-label">
          Monthly budget:&nbsp;
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Math.max(0, parseFloat(e.target.value) || 0))}
            className="budget-input"
          />
        </label>
        <span className="small-label" style={{ color: overBudget ? "#B4432D" : "#6B6155" }}>
          {overBudget ? `Over by ${currency(total - budget)}` : topCategoryLabel}
        </span>
      </div>
      <div className="budget-track">
        <div
          className="budget-fill"
          style={{ width: `${pct}%`, background: overBudget ? "#B4432D" : "#2F6F4E" }}
        />
      </div>
    </div>
  );
}

export default BudgetBar;