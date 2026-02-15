import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./navbar.css"

export default function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  // UI only: username localStorage se (agar ho)
  const username = localStorage.getItem("name") || "Student"
  console.log("Navbar username:", username)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="navbar">
      {/* Left */}
      <div className="navbar-left">
        Hello, <span>{username}</span>
      </div>

      {/* Center */}
      <div className="navbar-center">
        <Link to="/menu">Menu</Link>
        <Link to="/menu/orders">My Orders</Link>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
