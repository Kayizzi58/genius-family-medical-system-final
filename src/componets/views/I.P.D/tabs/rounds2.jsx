
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialRounds = [
  {
    id: 1,
    patient: "Jane Doe",
    ward: "General Ward A",
    bed: "Bed 05",
    doctor: "Dr. Smith",
    nurse: "Nurse Anna",
    vitals: "BP:120/80 | Temp:36.8°C | HR:78",
    notes: "Patient stable. Continue antibiotics.",
    date: "2026-02-24",
    status: "Completed"
  },
  {
    id: 2,
    patient: "John Smith",
    ward: "ICU 1",
    bed: "Bed 02",
    doctor: "Dr. Adams",
    nurse: "Nurse Clara",
    vitals: "BP:140/90 | Temp:38.2°C | HR:96",
    notes: "Fever persists. Review labs.",
    date: "2026-02-24",
    status: "Pending"
  }
];

const statusColor = {
  Completed: "green",
  Pending: "orange",
  Critical: "red"
};

export default function Dailyrounds() {
  const [rounds, setRounds] = useState(initialRounds);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredRounds = rounds.filter(r => {
    const matchesSearch =
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.ward.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const markCompleted = (id) => {
    setRounds(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "Completed" } : r
      )
    );
  };

  const markCritical = (id) => {
    setRounds(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "Critical" } : r
      )
    );
  };

  const totalPatients = rounds.length;
  const completed = rounds.filter(r => r.status === "Completed").length;
  const pending = rounds.filter(r => r.status === "Pending").length;
  const critical = rounds.filter(r => r.status === "Critical").length;

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="stethoscope icon"></i> Daily Clinical Rounds
        </h3>

        {/* SUMMARY */}
        <div className="ui four stackable cards mb-3">
          <div className="ui card"><div className="content">
            <div className="header">Total Patients</div>
            <div className="description">{totalPatients}</div>
          </div></div>

          <div className="ui card"><div className="content">
            <div className="header">Completed</div>
            <div className="description">{completed}</div>
          </div></div>

          <div className="ui card"><div className="content">
            <div className="header">Pending</div>
            <div className="description">{pending}</div>
          </div></div>

          <div className="ui card"><div className="content">
            <div className="header">Critical</div>
            <div className="description">{critical}</div>
          </div></div>
        </div>

        {/* FILTERS */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search patient or ward..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="six wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="four wide column">
            <button
              className="ui grey fluid button"
              onClick={() => {
                setSearch('');
                setFilterStatus('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* ROUNDS TABLE */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Ward</th>
              <th>Bed</th>
              <th>Doctor</th>
              <th>Nurse</th>
              <th>Vitals</th>
              <th>Doctor Notes</th>
              <th>Date</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredRounds.map(r => (
              <tr key={r.id}>
                <td><strong>{r.patient}</strong></td>
                <td>{r.ward}</td>
                <td>{r.bed}</td>
                <td>{r.doctor}</td>
                <td>{r.nurse}</td>
                <td>{r.vitals}</td>
                <td>{r.notes}</td>
                <td>{r.date}</td>
                <td>
                  <div className={`ui ${statusColor[r.status]} label`}>
                    {r.status}
                  </div>
                </td>
                <td>
                  {r.status === "Pending" && (
                    <div>
                      <button
                        className="ui tiny green button mr-1"
                        onClick={() => markCompleted(r.id)}
                      >
                        <i className="check icon"></i> Complete
                      </button>

                      <button
                        className="ui tiny red button"
                        onClick={() => markCritical(r.id)}
                      >
                        <i className="warning icon"></i> Critical
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filteredRounds.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center">
                  No rounds found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ADD ROUND */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open Add Round Modal")}
          >
            <i className="add icon"></i> Add Round Entry
          </button>
        </div>
      </div>
    </div>
  );
}