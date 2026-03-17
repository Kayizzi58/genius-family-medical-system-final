
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialLabRequests = [
  {
    id: 101,
    patient: "Jane Doe",
    doctor: "Dr. Smith",
    testType: "Blood Test",
    requestDate: "2026-02-24",
    status: "Pending",
    priority: "Normal"
  },
  {
    id: 102,
    patient: "John Smith",
    doctor: "Dr. Adams",
    testType: "X-Ray",
    requestDate: "2026-02-24",
    status: "Processing",
    priority: "High"
  },
  {
    id: 103,
    patient: "Mary Johnson",
    doctor: "Dr. Lee",
    testType: "Urine Test",
    requestDate: "2026-02-23",
    status: "Completed",
    priority: "Normal"
  }
];

const statusColor = {
  Pending: "yellow",
  Processing: "orange",
  Completed: "green",
  Cancelled: "red"
};

export default function Labrequests() {
  const [requests, setRequests] = useState(initialLabRequests);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.patient.toLowerCase().includes(search.toLowerCase()) || r.testType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || r.status === filterStatus;
    const matchesDoctor = !filterDoctor || r.doctor === filterDoctor;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const updateStatus = (id, newStatus) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
    );
  };

  return (
    <div className="ui container fluid my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="flask icon"></i> All Lab Requests
        </h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search patient or test type..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="five wide column">
            <select
              className="ui fluid dropdown"
              value={filterDoctor}
              onChange={e => setFilterDoctor(e.target.value)}
            >
              <option value="">All Doctors</option>
              <option>Dr. Smith</option>
              <option>Dr. Adams</option>
              <option>Dr. Lee</option>
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
              <option>Processing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Lab Requests Table */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Test Type</th>
              <th>Request Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.patient}</td>
                <td>{r.doctor}</td>
                <td>{r.testType}</td>
                <td>{r.requestDate}</td>
                <td>{r.priority}</td>
                <td>
                  <div className={`ui ${statusColor[r.status]} label`}>
                    {r.status}
                  </div>
                </td>
                <td>
                  {r.status !== "Processing" && r.status !== "Completed" && (
                    <button
                      className="ui tiny orange button mr-1"
                      onClick={() => updateStatus(r.id, "Processing")}
                    >
                      <i className="cogs icon"></i> Start
                    </button>
                  )}
                  {r.status !== "Completed" && (
                    <button
                      className="ui tiny green button mr-1"
                      onClick={() => updateStatus(r.id, "Completed")}
                    >
                      <i className="check icon"></i> Complete
                    </button>
                  )}
                  {r.status !== "Cancelled" && (
                    <button
                      className="ui tiny red button"
                      onClick={() => updateStatus(r.id, "Cancelled")}
                    >
                      <i className="close icon"></i> Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No lab requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Lab Request Button */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open Add Lab Request Modal")}
          >
            <i className="add icon"></i> Add Lab Request
          </button>
        </div>
      </div>
    </div>
  );
}