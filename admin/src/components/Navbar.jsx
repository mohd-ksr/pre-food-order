import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { useAuthContext } from "../services/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { syncAuth } = useAuthContext();

  const name = localStorage.getItem("name");

  const handleLogout = () => {
    logout();       // clears localStorage
    syncAuth();     // updates auth state
    navigate("/");  // back to login
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <h3 style={styles.title}>Smart Food Admin</h3>
      </div>

      <div style={styles.right}>
        <span style={styles.name}>Hello, {name}</span>
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    height: "60px",
    padding: "0 20px",
    background: "#1f2937",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    margin: 0,
    fontSize: "18px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  name: {
    fontSize: "14px",
  },
  logout: {
    background: "#ef4444",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Navbar;