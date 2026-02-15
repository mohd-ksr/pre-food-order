import { useState } from "react";
import Navbar from "../components/Navbar";
import TimeSlotSelector from "../components/TimeSlotSelector";
import OrdersList from "../components/OrdersList";
import MenuManager from "../components/MenuManager";
import AddMenuItem from "../components/AddMenuItem";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        {/* TABS */}
        <div style={styles.tabs}>
          <button
            style={activeTab === "orders" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>

          <button
            style={activeTab === "menu" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("menu")}
          >
            Menu
          </button>

          <button
            style={activeTab === "add" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("add")}
          >
            Add Item
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "orders" && (
          <>
            <TimeSlotSelector onSelect={setSelectedSlot} />
            <OrdersList slot={selectedSlot} />
          </>
        )}

        {activeTab === "menu" && <MenuManager />}

        {activeTab === "add" && <AddMenuItem />}
      </div>
    </div>
  );
};

const styles = {
  tabs: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#f9fafb",
    cursor: "pointer",
  },
  activeTab: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "1px solid #2563eb",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Dashboard;