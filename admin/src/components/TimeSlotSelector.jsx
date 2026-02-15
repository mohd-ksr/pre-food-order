import { useState } from "react";

const TIME_SLOTS = [
    "10:00-10:15",
    "10:15-10:30",
    "10:30-10:45",
    "10:45-11:00",

    "11:00-11:15",
    "11:15-11:30",
    "11:30-11:45",
    "11:45-12:00",

    "12:00-12:15",
    "12:15-12:30",
    "12:30-12:45",
    "12:45-13:00",

    "13:00-13:15",
    "13:15-13:30",
    "13:30-13:45",
    "13:45-14:00",

    "14:00-14:15",
    "14:15-14:30",
    "14:30-14:45",
    "14:45-15:00",

    "15:00-15:15",
    "15:15-15:30",
    "15:30-15:45",
    "15:45-16:00",

    "16:00-16:15",
    "16:15-16:30",
    "16:30-16:45",
    "16:45-17:00",
];

const TimeSlotSelector = ({ onSelect }) => {
  const [activeSlot, setActiveSlot] = useState(null);

  const handleClick = (slot) => {
    setActiveSlot(slot);
    onSelect(slot); // notify parent
  };

  return (
    <div style={styles.container}>
      <h4 style={styles.heading}>Select Time Slot</h4>

      <div style={styles.slotContainer}>
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot}
            onClick={() => handleClick(slot)}
            style={{
              ...styles.slotBtn,
              background:
                activeSlot === slot ? "#2563eb" : "#e5e7eb",
              color: activeSlot === slot ? "#fff" : "#000",
            }}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "20px",
  },
  heading: {
    marginBottom: "10px",
  },
  slotContainer: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  slotBtn: {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default TimeSlotSelector;