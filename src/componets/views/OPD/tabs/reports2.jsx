
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialReports = [
  {
    id: 301,
    employee: "Dr. Smith",
    role: "Dentist",
    date: "2026-02-24",
    report: "Handled 10 OPD patients, 2 dental procedures completed",
    status: "Reviewed"
  },
  {
    id: 302,
    employee: "Nurse Anna",
    role: "Nurse",
    date: "2026-02-24",
    report: "Completed morning rounds, assisted in lab sample collection",
    status: "Pending"
  },
  {
    id: 303,
    employee: "Lab Tech John",
    role: "Lab Technician",
    date: "2026-02-23",
    report: "Processed 5 blood samples, 3 urine tests, 1 X-Ray",
    status: "Pending"
  }
];

const statusColor = {
  Reviewed: "green",
  Pending: "yellow",
  Flagged: "red"
};

export default function Employeereports() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.employee.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !filterRole || r.role === filterRole;
    const matchesStatus = !filterStatus || r.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
    );
  };

  const addReport = () => {
    const newReport = {
      id: reports.length + 301,
      employee: prompt("Enter employee name"),
      role: prompt("Enter role"),
      date: new Date().toISOString().split("T")[0],
      report: prompt("Enter report description"),
      status: "Pending"
    };
    if (newReport.employee && newReport.report) {
      setReports(prev => [newReport, ...prev]);
    }
  };

  return (
    <div className="ui container fluid my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="file alternate icon"></i> All Employee Reports
        </h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search by employee name..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="five wide column">
            <select
              className="ui fluid dropdown"
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option>Dentist</option>
              <option>Nurse</option>
              <option>Lab Technician</option>
              <option>Admin</option>
            </select>
          </div>

          <div className="five wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option>Pending</option>
              <option>Reviewed</option>
              <option>Flagged</option>
            </select>
          </div>
        </div>

        {/* Employee Reports Table */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Date</th>
              <th>Report</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(r => (
              <tr key={r.id}>
                <td>{r.employee}</td>
                <td>{r.role}</td>
                <td>{r.date}</td>
                <td>{r.report}</td>
                <td>
                  <div className={`ui ${statusColor[r.status]} label`}>
                    {r.status}
                  </div>
                </td>
                <td>
                  {r.status !== "Reviewed" && (
                    <button
                      className="ui tiny green button mr-1"
                      onClick={() => updateStatus(r.id, "Reviewed")}
                    >
                      <i className="check icon"></i> Review
                    </button>
                  )}
                  {r.status !== "Flagged" && (
                    <button
                      className="ui tiny red button mr-1"
                      onClick={() => updateStatus(r.id, "Flagged")}
                    >
                      <i className="exclamation triangle icon"></i> Flag
                    </button>
                  )}
                  <button
                    className="ui tiny blue button"
                    onClick={() => addReport()}
                  >
                    <i className="add icon"></i> Add Report
                  </button>
                </td>
              </tr>
            ))}

            {filteredReports.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}