import { useState, useRef } from "react";
import { CATEGORIES } from "./categories";

function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const titleRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount) {
      return alert("Please fill required fields");
    }
    const newExpense = {
      id: Date.now(),
      title: title,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString().slice(0, 10),
    };
    onAddExpense(newExpense);
    setTitle("");
    setAmount("");
    titleRef.current.focus();
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        placeholder="Expense Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
      />
      <input
        placeholder="Amount ₹"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {Object.entries(CATEGORIES).map(([cat, meta]) => (
          <option key={cat} value={cat}>
            {meta.emoji} {cat}
          </option>
        ))}
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;