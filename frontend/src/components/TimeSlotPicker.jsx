import "./timeslot.css"

export default function TimeSlotPicker({ value, onChange }) {
  const slots = [
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
    "17:00-17:15",
    "17:15-17:30",
    "17:30-17:45",
    "17:45-18:00",
    "18:15-18:30",
    "18:30-18:45",
    "18:45-19:00",
    "19:00-19:15",
  ]

  // 🕒 current time + 30 minutes
  const now = new Date()
  const minTime = new Date(now.getTime() + 15 * 60 * 1000)

  const isSlotValid = (slot) => {
    const [start] = slot.split("-") // "10:30"
    const [hour, minute] = start.split(":").map(Number)

    const slotTime = new Date()
    slotTime.setHours(hour, minute, 0, 0)

    return slotTime >= minTime
  }

  const availableSlots = slots.filter(isSlotValid)

  return (
    <div className="timeslot">
      <label className="timeslot-label">⏰ Select Time Slot</label>

      <select
        className="timeslot-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Choose a slot</option>

        {availableSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  )
}