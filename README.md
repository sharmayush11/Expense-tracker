# 💰 Expense Tracker

A full-stack expense management application built with the **MERN stack** to help users track daily spending, manage transactions, and understand their financial habits through an interactive dashboard.

The application combines a React frontend with a Node.js and Express backend, using MongoDB to store user accounts and their expenses.

## ✨ Features

* **User Authentication:** Sign up and log in securely using JWT-based authentication.
* **Expense Management:** Add, edit, and delete expense records.
* **Undo Delete:** Restore a recently deleted expense.
* **Category-Based Tracking:** Organize expenses into categories such as Food and other spending types.
* **Expense Analytics:** Visualize spending through category-based charts.
* **Budget Tracking:** Set a budget and monitor spending against it.
* **Search and Sorting:** Search expenses by title and sort by date or amount.
* **Category Filtering:** Filter transactions by category.
* **User-Specific Data:** Store expenses under individual user accounts.
* **Responsive Interface:** A modern interface built with reusable React components.

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* JSON Web Tokens (JWT)
* bcrypt
* Joi
* dotenv
* CORS

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* npm
* ESLint
* Nodemon

## 📁 Project Structure

```text
Expense-tracker/
│
├── backend/
│   ├── Controllers/
│   │   ├── AuthController.js
│   │   └── ExpenseController.js
│   │
│   ├── Middlewares/
│   │   ├── Auth.js
│   │   └── AuthValidation.js
│   │
│   ├── Models/
│   │   ├── User.js
│   │   └── db.js
│   │
│   ├── Routes/
│   │   ├── AuthRouter.js
│   │   ├── ExpenseRouter.js
│   │   └── ProductRouter.js
│   │
│   ├── index.js
│   └── package.json
│
├── public/
│
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── Auth.jsx
│   ├── Auth.css
│   ├── BudgetBar.jsx
│   ├── CategoryChips.jsx
│   ├── DonutChart.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseItem.jsx
│   ├── ExpenseList.jsx
│   ├── Toolbar.jsx
│   ├── categories.js
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following:

* [Node.js](https://nodejs.org/)
* npm
* [Git](https://git-scm.com/)
* A MongoDB database through [MongoDB Atlas](https://www.mongodb.com/atlas) or a local MongoDB installation

### 1. Clone the Repository

```bash
git clone https://github.com/sharmayush11/Expense-tracker.git
cd Expense-tracker
```

### 2. Install Frontend Dependencies

From the project root, run:

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` directory.

Add the following configuration:

```env
PORT=8081
MONGO_CONN=your_mongodb_connection_string
JWT_SECRET=your_random_secret
```

Replace the placeholder values with your actual MongoDB connection string and a strong, randomly generated JWT secret.

**Important:** The backend reads the MongoDB connection string from `MONGO_CONN`, not `MONGO_URI`.

Keep your `.env` file private and never commit credentials or secrets to GitHub.

### 5. Start the Backend

From the `backend` directory, run:

```bash
npm run dev
```

The backend will start on port `8081` with the configuration above.

### 6. Start the Frontend

Open a second terminal in the project root and run:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

The frontend uses `http://localhost:8081` as its default API URL.

If you choose a different backend port, create a `.env` file in the project root containing:

```env
VITE_API_URL=http://localhost:YOUR_BACKEND_PORT
```

Replace `YOUR_BACKEND_PORT` with the port configured for your backend, then restart the Vite development server.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| POST   | `/auth/signup` | Register a new account        |
| POST   | `/auth/login`  | Authenticate an existing user |

### Expense Management

All expense endpoints require a valid JWT token in the `Authorization` header.

| Method | Endpoint               | Description                                |
| ------ | ---------------------- | ------------------------------------------ |
| GET    | `/expenses`            | Retrieve the authenticated user's expenses |
| POST   | `/expenses`            | Add a new expense                          |
| PUT    | `/expenses/:expenseId` | Update an existing expense                 |
| DELETE | `/expenses/:expenseId` | Delete an expense                          |
| POST   | `/expenses/restore`    | Restore a deleted expense                  |

### Health Check

| Method | Endpoint | Description                             |
| ------ | -------- | --------------------------------------- |
| GET    | `/ping`  | Check whether the backend is responding |

## 🔐 Security

* Passwords are hashed using bcrypt before being stored.
* JWT tokens are used for authentication.
* Protected expense routes require a valid token.
* Request validation is handled using Joi and additional controller-level checks.
* MongoDB credentials and JWT secrets are configured through environment variables.

## 📦 Available Scripts

### Frontend

Run these commands from the project root.

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite development server |
| `npm run build`   | Create a production build         |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |

### Backend

Run these commands from the `backend` directory.

| Command       | Description                     |
| ------------- | ------------------------------- |
| `npm run dev` | Start the backend using Nodemon |
| `npm start`   | Start the backend using Node.js |

## 🔮 Future Improvements

* Monthly and yearly expense reports.
* Persistent budget settings for each user.
* Advanced filtering by date and category.
* Improved financial analytics.
* Enhanced automated testing.
* Production deployment with improved configuration and monitoring.

## 👨‍💻 Author

**Ayush Sharma**

* GitHub: https://github.com/sharmayush11
* Portfolio: https://ayu-portfolio-zeta.vercel.app/

---

Built with React, Node.js, Express, and MongoDB.
