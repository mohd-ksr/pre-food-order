import { useState } from "react";
import api from "../services/api";

const AddMenuItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Item name is required");
      return;
    }

    if (price === "" || Number(price) < 0) {
      setError("Price must be 0 or greater");
      return;
    }

    setLoading(true);

    try {
      await api.post("/menu", {
        name: name.trim(),
        price: Number(price),
      });

      setSuccess("Item added successfully");
      setName("");
      setPrice("");
    } catch (err) {
      setError(
        err.response?.data?.detail || "Failed to add item"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.card}>
      <h3>Add Menu Item</h3>

      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        min="0"
        step="1"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
};

const styles = {
  card: {
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f9fafb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  error: {
    color: "#dc2626",
  },
  success: {
    color: "#16a34a",
  },
};

export default AddMenuItem;