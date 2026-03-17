import { h } from "preact";
import { useState } from "preact/hooks";

const initialAppointments = [
  {
    id: "APT-001",
    patient: "John Doe",
    date: "2026-02-05",
    time: "10:00 AM",
    dentist: "Dr. Smith",
    status: "Pending",
    confirmed: false,
  },
  {
    id: "APT-002",
    patient: "Jane Smith",
    date: "2026-02-06",
    time: "11:00 AM",
    dentist: "Dr. Adams",
    status: "Scheduled",
    confirmed: true,
  },
  {
    id: "APT-003",
    patient: "John Doe",
    date: "2026-02-07",
    time: "09:30 AM",
    dentist: "Dr. Smith",
    status: "Pending",
    confirmed: false,
  },
];

export default function Appoint() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filters, setFilters] = useState({
    patient: "",
    date: "",
    dentist: "",
    status: "",
  });

  // Toggle confirmation
  const toggleConfirm = (id) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, confirmed: !apt.confirmed } : apt
      )
    );
  };

  // Update status
  const updateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(
    (apt) =>
      (filters.patient === "" ||
        apt.patient.toLowerCase().includes(filters.patient.toLowerCase())) &&
      (filters.date === "" || apt.date === filters.date) &&
      (filters.dentist === "" || apt.dentist === filters.dentist) &&
      (filters.status === "" || apt.status === filters.status)
  );

  return (
    <div className="card p-2 bg-light">
      <h3 className="ui header blue">Appointments</h3>

      {/* ---------------- FILTERS ---------------- */}
      <div className="ui form mb-3">
        <div className="four fields">
          <div className="field">
            <input
              type="text"
              placeholder="Patient Name"
              value={filters.patient}
              onInput={(e) =>
                setFilters({ ...filters, patient: e.target.value })
              }
            />
          </div>
          <div className="field">
            <input
              type="date"
              placeholder="Date"
              value={filters.date}
              onInput={(e) => setFilters({ ...filters, date: e.target.value })}
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Dentist"
              value={filters.dentist}
              onInput={(e) =>
                setFilters({ ...filters, dentist: e.target.value })
              }
            />
          </div>
          <div className="field">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="ui dropdown"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* ---------------- APPOINTMENTS TABLE ---------------- */}
      <table className="ui celled blue table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Dentist</th>
            <th>Status</th>
            <th>Confirmed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <tr key={apt.id}>
                <td>
                  <label className="ui red label">
                    {apt.patient}{" "}
                    <button className="ui mini black button">View</button>
                  </label>
                </td>
                <td>
                  {apt.date}{" "}
                  <button
                    className="ui tiny blue button"
                    onClick={() => updateStatus(apt.id, "Rescheduled")}
                  >
                    Change
                  </button>
                </td>
                <td>
                  {apt.time}{" "}
                  <button
                    className="ui tiny blue button"
                    onClick={() => updateStatus(apt.id, "Rescheduled")}
                  >
                    Change
                  </button>
                </td>
                <td>{apt.dentist}</td>
                <td>
                  {apt.status === "Pending" && <i className="time icon"></i>}
                  {apt.status === "Scheduled" && (
                    <i className="check icon"></i>
                  )}
                  {apt.status}{" "}
                  <button
                    className="ui tiny orange button"
                    onClick={() =>
                      updateStatus(apt.id, apt.status === "Completed" ? "Scheduled" : "Completed")
                    }
                  >
                    {apt.status === "Completed" ? "Undo" : "Complete"}
                  </button>
                  <button
                    className="ui tiny red button ml-1"
                    onClick={() => updateStatus(apt.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={apt.confirmed}
                    onChange={() => toggleConfirm(apt.id)}
                  />
                </td>
                <td>
                  <button
                    className="ui tiny green button"
                    onClick={() => updateStatus(apt.id, "Scheduled")}
                  >
                    Confirm
                  </button>
                  <button
                    className="ui tiny blue button ml-1"
                    onClick={() => updateStatus(apt.id, "Rescheduled")}
                  >
                    Reschedule
                  </button>
                  <button
                    className="ui tiny red button ml-1"
                    onClick={() => updateStatus(apt.id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="center aligned">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}