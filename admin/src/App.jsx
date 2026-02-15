import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuthContext } from "./services/authContext";

function App() {
  const { isLoggedIn, isAdmin } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn && isAdmin ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          isLoggedIn && isAdmin ? (
            <Dashboard />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;