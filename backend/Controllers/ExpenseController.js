const UserModel = require("../Models/User");

const addTransaction = async (req, res) => {
const { title, amount, category, date } = req.body;


if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof amount !== "number" ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    typeof category !== "string" ||
    !category.trim() ||
    typeof date !== "string" ||
    !date.trim()
) {
    return res.status(400).json({
        message: "Valid title, amount, category and date are required",
        success: false
    });
}

try {
    const userData = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $push: {
                expenses: {
                    title: title.trim(),
                    amount,
                    category: category.trim(),
                    date
                }
            }
        },
        { new: true, runValidators: true }
    ).select("expenses");

    if (!userData) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    return res.status(201).json({
        message: "Expense added successfully",
        success: true,
        data: userData.expenses
    });
} catch (err) {
    console.error("Add expense error:", err.message);
    return res.status(500).json({
        message: "Failed to add expense",
        success: false
    });
}


};

const getAllTransactions = async (req, res) => {
try {
const userData = await UserModel.findById(req.user._id)
.select("expenses");


    if (!userData) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    return res.status(200).json({
        message: "Expenses fetched successfully",
        success: true,
        data: userData.expenses
    });
} catch (err) {
    console.error("Fetch expenses error:", err.message);
    return res.status(500).json({
        message: "Failed to fetch expenses",
        success: false
    });
}


};

const deleteTransaction = async (req, res) => {
const expenseId = req.params.expenseId;

if (!/^[a-f\d]{24}$/i.test(expenseId)) {
    return res.status(400).json({
        message: "Invalid expense ID",
        success: false
    });
}

try {
    const userData = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {
                expenses: { _id: expenseId }
            }
        },
        { new: true }
    ).select("expenses");

    if (!userData) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    return res.status(200).json({
        message: "Expense deleted successfully",
        success: true,
        data: userData.expenses
    });
} catch (err) {
    console.error("Delete expense error:", err.message);
    return res.status(500).json({
        message: "Failed to delete expense",
        success: false
    });
}


};


const restoreTransaction = async (req, res) => {
    const { title, amount, category, date, _id } = req.body;

    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof amount !== "number" ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        typeof category !== "string" ||
        !category.trim() ||
        typeof date !== "string" ||
        !date.trim() ||
        typeof _id !== "string" ||
        !/^[a-f\d]{24}$/i.test(_id)
    ) {
        return res.status(400).json({
            message: "Valid expense data is required",
            success: false
        });
    }

    try {
        const userData = await UserModel.findById(req.user._id).select("expenses");

        if (!userData) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const alreadyExists = userData.expenses.some(
            (expense) => expense._id.toString() === _id
        );

        if (alreadyExists) {
            return res.status(409).json({
                message: "Expense already exists",
                success: false
            });
        }

        userData.expenses.push({
            _id,
            title: title.trim(),
            amount,
            category: category.trim(),
            date
        });

        await userData.save();

        return res.status(200).json({
            message: "Expense restored successfully",
            success: true,
            data: userData.expenses
        });
    } catch (err) {
        console.error("Restore expense error:", err.message);

        return res.status(500).json({
            message: "Failed to restore expense",
            success: false
        });
    }
};



const updateTransaction = async (req, res) => {
const expenseId = req.params.expenseId;
const { title, amount, category, date } = req.body;


if (!/^[a-f\d]{24}$/i.test(expenseId)) {
    return res.status(400).json({
        message: "Invalid expense ID",
        success: false
    });
}

if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof amount !== "number" ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    typeof category !== "string" ||
    !category.trim() ||
    typeof date !== "string" ||
    !date.trim()
) {
    return res.status(400).json({
        message: "Valid title, amount, category and date are required",
        success: false
    });
}

try {
    const userData = await UserModel.findOneAndUpdate(
        {
            _id: req.user._id,
            "expenses._id": expenseId
        },
        {
            $set: {
                "expenses.$.title": title.trim(),
                "expenses.$.amount": amount,
                "expenses.$.category": category.trim(),
                "expenses.$.date": date
            }
        },
        {
            new: true,
            runValidators: true
        }
    ).select("expenses");

    if (!userData) {
        return res.status(404).json({
            message: "Expense not found",
            success: false
        });
    }

    return res.status(200).json({
        message: "Expense updated successfully",
        success: true,
        data: userData.expenses
    });
} catch (err) {
    console.error("Update expense error:", err.message);
    return res.status(500).json({
        message: "Failed to update expense",
        success: false
    });
}


};

module.exports = {
    addTransaction,
    getAllTransactions,
    deleteTransaction,
    updateTransaction,
    restoreTransaction
};