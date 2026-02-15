import { useEffect, useState } from "react";
import api from "../services/api";

const MenuManager = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMenu = () => {
    setLoading(true);
    api
      .get("/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const updateItem = async (itemId, updates) => {
    try {
      await api.put(`/menu/${itemId}`, updates);
      fetchMenu();
    } catch (err) {
      alert("Failed to update item");
    }
  };

  const handlePriceChange = (itemId, value) => {
    // ❌ block negative values
    const price = Math.max(0, Number(value));

    setMenu((prev) =>
      prev.map((item) =>
        item.item_id === itemId
          ? { ...item, price }
          : item
      )
    );
  };

  if (loading) return <p>Loading menu...</p>;

  return (
    <div style={styles.container}>
      {menu.map((item) => (
        <div key={item.item_id} style={styles.card}>
          <div>
            <b>{item.name}</b>

            <div style={styles.subText}>
              ₹
              <input
                type="number"
                min="0"                 // 🔒 browser-level guard
                step="1"
                value={item.price}
                onChange={(e) =>
                  handlePriceChange(item.item_id, e.target.value)
                }
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.actions}>
            <label>
              <input
                type="checkbox"
                checked={item.is_available}
                onChange={(e) =>
                  updateItem(item.item_id, {
                    is_available: e.target.checked,
                  })
                }
              />{" "}
              Available
            </label>

            <button
              style={{
                ...styles.saveBtn,
                opacity: item.price < 0 ? 0.5 : 1,
                cursor: item.price < 0 ? "not-allowed" : "pointer",
              }}
              disabled={item.price < 0}
              onClick={() =>
                updateItem(item.item_id, { price: item.price })
              }
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gap: "12px",
  },
  card: {
    padding: "14px",
    borderRadius: "8px",
    background: "#f9fafb",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subText: {
    fontSize: "14px",
    color: "#374151",
  },
  input: {
    width: "80px",
    marginLeft: "6px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  saveBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
  },
};

export default MenuManager;