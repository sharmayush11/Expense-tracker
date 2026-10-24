import { useState } from "react";
import "./Auth.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8081";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";

      const body = isLogin
        ? { email: email.trim(), password }
        : { name: name.trim(), email: email.trim(), password };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong.");
      }

      if (isLogin) {
        if (!result.jwtToken) {
          throw new Error("Login response mein JWT token nahi mila.");
        }

        localStorage.setItem("token", result.jwtToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: result.name,
            email: result.email,
          })
        );

        onLogin(result.jwtToken);
      } else {
        setMessage("Account created successfully! Please log in.");
        setIsLogin(true);
        setName("");
        setPassword("");
      }
    } catch (err) {
      setError(
        err.message || "Can't connect to server."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((current) => !current);
    setError("");
    setMessage("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <main className="auth-page">
      <section className="auth-brand">
        <div className="auth-brand-icon">₹</div>
        <div>
          <div className="auth-brand-name">EXPENSE TRACKER</div>
          {/* <p className="auth-brand-caption">
            Your money. Your clarity.
          </p> */}
        </div>
      </section>

      <section className="auth-layout">
        <div className="auth-visual">
          <div className="visual-badge">
            <span className="visual-badge-dot" />
            YOUR FINANCIAL SPACE
          </div>

          <h1>
            Make every
            <br />
            rupee <span>count.</span>
          </h1>

          <p className="auth-visual-description">
            Understand your spending, manage your budget,
            and build better money habits—one day at a time.
          </p>

          <div className="visual-preview">
            <div className="preview-top">
              <div>
                <span className="preview-label">SMART MONEY HABITS</span>
                <h3>Your finances, simplified.</h3>
              </div>
              <div className="preview-icon">↗</div>
            </div>

            <div className="preview-bars">
              <span className="preview-bar bar-one" />
              <span className="preview-bar bar-two" />
              <span className="preview-bar bar-three" />
              <span className="preview-bar bar-four" />
              <span className="preview-bar bar-five" />
              <span className="preview-bar bar-six" />
              <span className="preview-bar bar-seven" />
            </div>

            <div className="preview-footer">
              <span>Track spending</span>
              <span>Stay in control ↗</span>
            </div>
          </div>

          <p className="auth-visual-note">
            A little awareness today. A better tomorrow.
          </p>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-heading">
            {/* <div className="auth-mobile-icon">₹</div> */}

            <div className="auth-eyebrow">
              {isLogin ? "WELCOME BACK" : "GET STARTED"}
            </div>

            <h2>
              {isLogin ? "Good to see you." : "Create your account."}
            </h2>

            <p>
              {isLogin
                ? "Sign in to pick up where you left off."
                : "A few details and you're ready to go."}
            </p>
          </div>

          {error && (
            <div className="auth-alert auth-alert-error" role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          {message && (
            <div className="auth-alert auth-alert-success" role="status">
              <span>✓</span>
              <p>{message}</p>
            </div>
          )}

          <form className="auth-form-fields" onSubmit={handleSubmit}>
            {!isLogin && (
              <label className="auth-field">
                <span>Full name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={3}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label className="auth-field">
              <span>Email address</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>

              <div className="auth-password-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={4}
                  autoComplete={
                    isLogin ? "current-password" : "new-password"
                  }
                  required
                />

                <button
                  type="button"
                  className="auth-show-password"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Sign in"
                  : "Create account"}

              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="auth-divider">
            <span />
            <p>YOUR FINANCES, YOUR WAY</p>
            <span />
          </div>

          <p className="auth-switch">
            {isLogin
              ? "New to Expense Tracker?"
              : "Already have an account?"}

            <button
              type="button"
              className="auth-switch-btn"
              onClick={switchMode}
            >
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </p>

          <p className="auth-privacy">
            Your financial journey starts here.
          </p>
        </div>
      </section>

      <footer className="auth-footer">
        {/* <span>EXPENSE TRACKER © {new Date().getFullYear()}</span> */}
        {/* <span>Built for better money habits.</span> */}
      </footer>
    </main>
  );
}

export default Auth;

