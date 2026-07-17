import { useState } from 'react'
import './App.css'
import ExpenseList from './ExpenseList'
import ExpenseForm from './ExpenseForm'

function App() {
  const [expenses , setExpenses] = useState([]) //this expense is a state variable

  useEffect(() => {
    localStorage.setItem("expenses" , JSON.stringify(expenses)) //this expense is diff from the upper one
  },[expenses])

  const addExpense = (expenses) => {
    setExpenses((prev) => [...prev , expenses])
  }
  const deleteExpense = (id) => {
    setExpenses((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };
  return (
    <div className = "app-container">
      <h1>💰 Expense Tracker</h1>
		  <ExpenseForm onAddExpense={addExpense}/>
		  <h3 className="total">Total Expense: ₹750.00</h3>
		  <ExpenseList expenses={expenses} onDelete={deleteExpense}/>
    </div>
  )
}

export default App
