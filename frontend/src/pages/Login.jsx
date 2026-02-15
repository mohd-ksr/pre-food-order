import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import "./auth.css"

export default function Login() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await api.post("/auth/login", {
        identifier,
        password,
      })

      // console.log("LOGIN RESPONSE:", res.data)
      login(res.data.access_token, res.data.role)
      localStorage.setItem("name", res.data.name)
      // if (res.data.role === "admin") {
        // navigate("/admin")
      // } else {
      navigate("/menu")
      // }
    } catch (err) {
      setError("Invalid phone/email or password")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>

        {error && <p className="auth-error">{error}</p>}

        <p className="auth-switch">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
