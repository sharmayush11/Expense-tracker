import { useState , useEffect } from 'react'
import './App.css'

function App() {
  return (
    <div class="app-container">
		  <h1>💰 Expense Tracker</h1>
		  
		  <h3 class="total">Total Expense: ₹750.00</h3>
		  <div class="expense-list">
        <div class="expense-item"><span>Internet Charges </span><span>₹500</span><button>❌</button></div>
        <div class="expense-item"><span>Train Ticket</span><span>₹250</span><button>❌</button></div>
		  </div>
	  </div>
  )
}

export default App