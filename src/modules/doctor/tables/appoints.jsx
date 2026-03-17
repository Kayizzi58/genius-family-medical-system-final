import { useState } from "preact/hooks";

// Sample appointment data
const initialAppointments = [
  {
    id: "APT-001",
    patientName: "John Doe",
    MRN: "MRN-004567",
    date: "2026-02-25",
    time: "09:00 AM",
    department: "OPD",
    status: "Pending",
    doctor: "Dr. Smith",
  },
  {
    id: "APT-002",
    patientName: "Jane Smith",
    MRN: "MRN-004568",
    date: "2026-02-25",
    time: "10:30 AM",
    department: "IPD",
    status: "Pending",
    doctor: "Dr. Smith",
  },
];

export default function Appointt({ doctorName }) {
  const [appointments, setAppointments] = useState(initialAppointments);

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    date: "",
    status: "",
  });

  // Handle filter input
  const handleFilterChange = (e) => {
    const { name, value } = e.currentTarget;
    setFilters({ ...filters, [name]: value });
  };

  // Update appointment status
  const updateStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  // Apply filters
  const filteredAppointments = appointments.filter((apt) => {
    return (
      (filters.search === "" ||
        apt.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        apt.MRN.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.date === "" || apt.date === filters.date) &&
      (filters.status === "" || apt.status === filters.status)
    );
  });

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Appointments</h3>

      {/* 🔹 Filters */}
      <form className="ui form">
        <div className="three fields">
          <div className="field">
            <input
              type="text"
              name="search"
              placeholder="Search Patient / MRN"
              value={filters.search}
              onInput={handleFilterChange}
            />
          </div>
          <div className="field">
            <input
              type="date"
              name="date"
              value={filters.date}
              onInput={handleFilterChange}
            />
          </div>
          <div className="field">
            <select
              className="ui dropdown"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </form>

      <div className="ui divider"></div>

      {/* 🔹 Appointments Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>MRN</th>
            <th>Date</th>
            <th>Time</th>
            <th>Department</th>
            <th>Status</th>
            <th>Doctor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <tr key={apt.id}>
                <td>{apt.id}</td>
                <td>{apt.patientName}</td>
                <td>{apt.MRN}</td>
                <td>{apt.date}</td>
                <td>{apt.time}</td>
                <td>{apt.department}</td>
                <td>{apt.status}</td>
                <td>{apt.doctor}</td>
                <td>
                  <div className="ui buttons">
                    <button
                      className="ui green mini button"
                      onClick={() => updateStatus(apt.id, "Completed")}
                    >
                      Complete
                    </button>
                    <button
                      className="ui red mini button"
                      onClick={() => updateStatus(apt.id, "Cancelled")}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="center aligned">
                No appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}