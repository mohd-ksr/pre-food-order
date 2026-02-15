import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Menu from "./pages/Menu"
import MyOrders from "./pages/MyOrders"
import Order from "./pages/Order"
import ProtectedRoute from "./components/ProtectedRoute"
import ProtectedLayout from "./components/ProtectedLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* confirm order page (NO protection to avoid blank loop) */}
        <Route path="/order" element={<Order />} />

        {/* protected student area */}
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Menu />} />
          <Route path="orders" element={<MyOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
