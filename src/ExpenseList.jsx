import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete, onEdit, leavingIds, hasAnyExpenses }) {
  if (expenses.length === 0) {
    return (
      <p className="no-expense">
        {hasAnyExpenses ? "Nothing matches your search." : "No expenses yet — add your first one above."}
      </p>
    );
  }
  return (
    <div className="expense-list">
      {expenses.map((item) => (
        <ExpenseItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
          isLeaving={leavingIds.has(item.id)}
        />
      ))}
    </div>
  );
}

export default ExpenseList;