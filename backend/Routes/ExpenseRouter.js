const express = require('express');

const {
    getAllTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    restoreTransaction
} = require("../Controllers/ExpenseController");

const router = express.Router();

router.get('/', getAllTransactions);
router.post('/', addTransaction);
router.put('/:expenseId', updateTransaction);
router.delete('/:expenseId', deleteTransaction);
router.post("/restore", restoreTransaction);

module.exports = router;
