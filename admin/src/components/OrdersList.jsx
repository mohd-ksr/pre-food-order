import { useEffect, useState } from "react";
import api from "../services/api";

/* 🔹 Helper: format date + time */
const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const datePart = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { datePart, timePart };
};

const OrdersList = ({ slot }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = () => {
    if (!slot) return;

    setLoading(true);
    setError("");

    api
      .get(`/orders/slot/${slot}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load orders");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [slot]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, {
        status: newStatus,
      });

      // 🔄 refresh list after update
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  if (!slot) return <p>Please select a time slot.</p>;
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (orders.length === 0) return <p>No orders for this slot.</p>;

  return (
    <div style={styles.container}>
      {orders.map((order) => {
        const { datePart, timePart } = formatDateTime(order.created_at);

        return (
          <div key={order.order_id} style={styles.card}>
            {/* HEADER */}
            <div style={styles.header}>
              <div>
                <b>Order #{order.order_id}</b>

                <div style={styles.subText}>
                  {order.user.name} • {order.user.phone}
                </div>

                <div style={styles.subText}>
                   {datePart} •  {timePart}
                </div>
              </div>

              <span style={getStatusStyle(order.status)}>
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div style={styles.items}>
              {order.items.map((item, idx) => (
                <div key={idx} style={styles.itemRow}>
                  <span>
                    {item.item_name} × {item.quantity}
                  </span>
                  <span>₹{item.subtotal}</span>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div style={styles.footer}>
              <div style={styles.total}>
                Total: ₹{order.total_price}
              </div>

              <div style={styles.actions}>
                {order.status === "pending" && (
                  <button
                    style={styles.readyBtn}
                    onClick={() =>
                      updateStatus(order.order_id, "ready")
                    }
                  >
                    Mark READY
                  </button>
                )}

                {order.status === "ready" && (
                  <button
                    style={styles.pickedBtn}
                    onClick={() =>
                      updateStatus(order.order_id, "picked")
                    }
                  >
                    Mark PICKED
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    marginTop: "20px",
    display: "grid",
    gap: "16px",
  },
  card: {
    padding: "16px",
    borderRadius: "10px",
    background: "#f9fafb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
  subText: {
    fontSize: "13px",
    color: "#6b7280",
  },
  items: {
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
    padding: "8px 0",
    marginBottom: "8px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginBottom: "4px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  readyBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  pickedBtn: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

const getStatusStyle = (status) => {
  const base = {
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    textTransform: "capitalize",
    fontWeight: "600",
  };

  if (status === "pending") {
    return { ...base, background: "#fde68a", color: "#92400e" };
  }
  if (status === "ready") {
    return { ...base, background: "#bfdbfe", color: "#1e3a8a" };
  }
  if (status === "picked") {
    return { ...base, background: "#bbf7d0", color: "#166534" };
  }
  return base;
};

export default OrdersList;