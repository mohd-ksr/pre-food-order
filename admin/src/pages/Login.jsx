import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { useAuthContext } from "../services/authContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { syncAuth } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({
        identifier,
        password,
      });

      if (data.role !== "admin") {
        setError("Access denied: Admins only");
        return;
      }

      syncAuth();
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Invalid phone/email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={{ textAlign: "center" }}>Admin Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Phone or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6fb",
  },
  card: {
    width: "320px",
    padding: "24px",
    borderRadius: "8px",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  error: {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
  },
};

export default Login;