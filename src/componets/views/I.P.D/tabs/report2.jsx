
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialReports = [
  {
    id: 1,
    employee: "Dr. John Smith",
    role: "Doctor",
    department: "OPD",
    shift: "08:00 - 16:00",
    attendance: "Present",
    notes: "Handled 15 patients, no incidents",
    date: "2026-02-24",
    status: "Reviewed"
  },
  {
    id: 2,
    employee: "Nurse Anna",
    role: "Nurse",
    department: "IPD",
    shift: "16:00 - 00:00",
    attendance: "Present",
    notes: "Administered medications, monitored vitals",
    date: "2026-02-24",
    status: "Pending"
  },
  {
    id: 3,
    employee: "Lab Tech Mike",
    role: "Lab Technician",
    department: "Lab",
    shift: "08:00 - 16:00",
    attendance: "Absent",
    notes: "No samples processed",
    date: "2026-02-24",
    status: "Pending"
  }
];

const statusColor = {
  Reviewed: "green",
  Pending: "orange",
  Flagged: "red"
};

export default function Employeereports() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const filteredReports = reports.filter(r => {
    const matchesSearch =
      r.employee.toLowerCase().includes(search.toLowerCase()) ||
      r.department.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !filterRole || r.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const markReviewed = (id) => {
    setReports(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "Reviewed" } : r
      )
    );
  };

  const flagReport = (id) => {
    setReports(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "Flagged" } : r
      )
    );
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="file alternate icon"></i> Employee Reports
        </h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search employee or department..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="six wide column">
            <select
              className="ui fluid dropdown"
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Lab Technician</option>
              <option>Pharmacist</option>
            </select>
          </div>

          <div className="four wide column">
            <button
              className="ui grey fluid button"
              onClick={() => {
                setSearch('');
                setFilterRole('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Department</th>
              <th>Shift</th>
              <th>Attendance</th>
              <th>Notes</th>
              <th>Date</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(r => (
              <tr key={r.id}>
                <td>{r.employee}</td>
                <td>{r.role}</td>
                <td>{r.department}</td>
                <td>{r.shift}</td>
                <td>{r.attendance}</td>
                <td>{r.notes}</td>
                <td>{r.date}</td>
                <td>
                  <div className={`ui ${statusColor[r.status]} label`}>
                    {r.status}
                  </div>
                </td>
                <td>
                  {r.status !== "Reviewed" && (
                    <button
                      className="ui tiny green button mr-1"
                      onClick={() => markReviewed(r.id)}
                    >
                      <i className="check icon"></i> Review
                    </button>
                  )}
                  <button
                    className="ui tiny red button"
                    onClick={() => flagReport(r.id)}
                  >
                    <i className="exclamation triangle icon"></i> Flag
                  </button>
                </td>
              </tr>
            ))}

            {filteredReports.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">
                  No employee reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Report Button */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open Add Employee Report Modal")}
          >
            <i className="add icon"></i> Add Report
          </button>
        </div>
      </div>
    </div>
  );
}