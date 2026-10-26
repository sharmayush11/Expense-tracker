# 💰 Expense Tracker

A full-stack expense tracking application built with **React.js, Node.js, Express.js, and MongoDB** to help users manage expenses, organize transactions, and monitor their spending.

The application combines a React-based frontend with a REST API backend and MongoDB database to provide a complete expense management experience.

## 🌐 Live Demo

**Live Application:** [Expense Tracker](https://expense-tracker-dope-cart.vercel.app/)

## ✨ Features

* 💸 **Expense Management** — Manage financial records through the application.
* 📊 **Expense Analytics** — Visualize financial information using charts.
* 🏷️ **Category-Based Tracking** — Organize expenses into categories.
* 💰 **Budget Tracking** — Track spending against budgets where implemented.
* 🔐 **Authentication** — Backend support for authentication using JSON Web Tokens.
* 🗄️ **Database Integration** — Store application data using MongoDB and Mongoose.
* 🔌 **REST API** — Connect the frontend and backend through API endpoints.
* ⚡ **Modern Frontend** — Build a dynamic user interface using React and Vite.

> Features should be verified against the current implementation before being advertised as fully functional.

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

## 📁 Project Structure

```text
Expense-tracker/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── public/
│
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

*Note: The structure is simplified. Refer to the repository for the complete directory structure.*

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* [Git](https://git-scm.com/)
* A MongoDB database, either locally or through [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/sharmayush11/Expense-tracker.git
cd Expense-tracker
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

Example configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
```

Replace the placeholder values with your actual configuration.

Make sure the environment variable names match those used in your backend code.

### 3. Start the Backend Server

From the `backend` directory, run:

```bash
npm run dev
```

The backend will start according to the configuration in your application.

### 4. Install Frontend Dependencies

Open another terminal in the project root:

```bash
npm install
```

### 5. Start the Frontend

Run:

```bash
npm run dev
```

Vite will display a local development URL in the terminal, usually:

```text
http://localhost:5173
```

Open the URL in your browser to access the application.

Ensure the frontend is configured to communicate with your local backend server.

## 🔌 Backend Architecture

The backend uses Express.js to handle HTTP requests and Mongoose to interact with MongoDB.

Additional backend dependencies include:

| Technology      | Purpose                         |
| --------------- | ------------------------------- |
| Express.js      | HTTP server and API routing     |
| Mongoose        | MongoDB data modeling           |
| JSON Web Tokens | Token-based authentication      |
| bcrypt          | Password hashing                |
| Joi             | Request data validation         |
| dotenv          | Environment variable management |
| CORS            | Cross-origin request handling   |

## 🔐 Security Considerations

* Keep database credentials and JWT secrets in environment variables.
* Never commit `.env` files or sensitive credentials to GitHub.
* Validate user input before processing requests.
* Hash passwords before storing them.
* Protect private API endpoints with appropriate authentication and authorization.
* Configure CORS for the frontend's allowed origin.

## 📦 Available Scripts

### Frontend

Run these commands from the project root.

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Starts the Vite development server |
| `npm run build`   | Builds the frontend for production |
| `npm run preview` | Previews the production build      |
| `npm run lint`    | Runs ESLint                        |

### Backend

Run these commands from the `backend` directory.

| Command       | Description                      |
| ------------- | -------------------------------- |
| `npm run dev` | Starts the backend with Nodemon  |
| `npm start`   | Starts the backend using Node.js |

## 🔮 Future Improvements

* Advanced expense filtering and search.
* Monthly and yearly financial reports.
* Improved budget management.
* More detailed financial analytics.
* Enhanced input validation and error handling.
* Improved responsive design.
* Production deployment and performance optimization.

## 👨‍💻 Author

**Ayush Sharma**

🌐 [Portfolio](https://ayu-portfolio-zeta.vercel.app/)

🐙 [GitHub Profile](https://github.com/sharmayush11)

---

Built with React, Node.js, Express, and MongoDB.
