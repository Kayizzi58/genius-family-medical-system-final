
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialReports = [
  { id: 1, patient: 'John Doe', type: 'Lab', date: '2026-02-24', status: 'pending', details: 'Blood test results awaiting review.' },
  { id: 2, patient: 'Jane Smith', type: 'Dental Treatment', date: '2026-02-23', status: 'reviewed', details: 'Cavity filling completed successfully.' },
  { id: 3, patient: 'Mary Johnson', type: 'Lab', date: '2026-02-24', status: 'urgent', details: 'High blood sugar levels detected.' },
];

const statusColors = {
  pending: 'yellow',
  reviewed: 'green',
  urgent: 'red',
};

const statusCycle = ['pending', 'reviewed', 'urgent'];

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = reports.filter(r => {
    const matchesSearch = r.patient.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Cycle report status (reversible)
  const cycleStatus = (id) => {
    setReports(prev =>
      prev.map(r => {
        if (r.id === id) {
          const currentIndex = statusCycle.indexOf(r.status);
          const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header purple">Patient Reports</h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="eight wide column">
            <input
              type="text"
              className="ui fluid input"
              placeholder="Search by patient or report type..."
              value={search}
              onInput={e => setSearch(e.target.value)}
            />
          </div>
          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statusCycle.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="four wide column">
            <button
              className="ui grey button fluid"
              onClick={() => { setSearch(''); setFilterStatus(''); }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="ui responsive table">
          <table className="ui celled striped table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Report Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map(r => (
                  <tr key={r.id}>
                    <td>{r.patient}</td>
                    <td>{r.type}</td>
                    <td>{r.date}</td>
                    <td>
                      <div className={`ui ${statusColors[r.status]} label`} style={{ textTransform: 'capitalize' }}>
                        {r.status}
                      </div>
                    </td>
                    <td>{r.details}</td>
                    <td>
                      <button
                        className="ui mini blue button"
                        onClick={() => cycleStatus(r.id)}
                      >
                        Next Status
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
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
    </div>
  );
}