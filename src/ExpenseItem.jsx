import { useState } from "react";
import { CATEGORIES, currency } from "./categories";

function ExpenseItem({ item, onDelete, onEdit, isLeaving }) {
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(item.title);
  const [draftAmount, setDraftAmount] = useState(String(item.amount));
  const meta = CATEGORIES[item.category] || CATEGORIES.Other;

  const save = () => {
    const amt = parseFloat(draftAmount);
    if (draftTitle.trim() && amt > 0) {
      onEdit(item.id, { title: draftTitle.trim(), amount: amt });
    }
    setEditing(false);
  };

  return (
    <div className={`expense-item ${isLeaving ? "leaving" : ""}`}>
      <span className="cat-dot" style={{ background: meta.color }} title={item.category}>
        {meta.emoji}
      </span>

      {editing ? (
        <input
          autoFocus
          className="edit-input"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
        />
      ) : (
        <span className="item-title" onClick={() => setEditing(true)}>
          {item.title}
        </span>
      )}

      <span className="leader" />

      {editing ? (
        <input
          type="number"
          className="edit-input amt"
          value={draftAmount}
          onChange={(e) => setDraftAmount(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
        />
      ) : (
        <span className="item-amt" onClick={() => setEditing(true)}>
          {currency(item.amount)}
        </span>
      )}

      <button className="del-btn" onClick={() => onDelete(item.id)} aria-label="Delete expense">
        ✕
      </button>
    </div>
  );
}

export default ExpenseItem;