import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const res = await axios.post("/api/login", { identifier, password });

      if (res.data.success) {
        setMsg({ text: "Redirecting...", type: "success" });
        localStorage.setItem("user", JSON.stringify(res.data));

        setTimeout(() => {
          if (res.data.role === "admin") navigate("/admin");
          else navigate("/student");
        }, 800);
      } else {
        setMsg({
          text: res.data.message || "Invalid Credentials",
          type: "error",
        });
      }
    } catch (err) {
      setMsg({ text: "Server Error. Please try again.", type: "error" });
    } finally {
      if (!msg.text.includes("Redirecting")) setLoading(false);
    }
  };

  return (
    <div className="login-body">
      {/* Background Shapes */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="login-container">
        <div className="brand-icon">
          <i className="fas fa-graduation-cap"></i>
        </div>

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">
          Enter your credentials to access the portal
        </p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Roll Number or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <i className="fas fa-user"></i>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="fas fa-lock"></i>
          </div>

          <button
            type="submit"
            className="btn-login-submit"
            disabled={loading}
            style={
              msg.type === "success"
                ? { background: "#22c55e", color: "white" }
                : {}
            }
          >
            {loading ? (
              msg.type === "success" ? (
                <>
                  <i className="fas fa-check"></i> Success!
                </>
              ) : (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i> Checking...
                </>
              )
            ) : (
              "LOGIN NOW"
            )}
          </button>
        </form>

        <div
          className={`login-msg ${
            msg.type === "error" ? "text-red" : "text-green"
          }`}
        >
          {msg.text}
        </div>

        <div className="links">
          <Link to="/">&copy; 2026 Tutors Hub</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
