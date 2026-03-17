
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialProcessingSamples = [
  { id: 1, order: 'ORD-101', patient: 'John Doe', type: 'Blood', collectedBy: 'Nurse Anna', date: '2026-02-24', status: 'collected', technician: 'Lab Tech Mike' },
  { id: 2, order: 'ORD-102', patient: 'Jane Smith', type: 'Urine', collectedBy: 'Nurse Ben', date: '2026-02-23', status: 'processing', technician: 'Lab Tech Mike' },
  { id: 3, order: 'ORD-103', patient: 'Mary Johnson', type: 'X-ray', collectedBy: 'Nurse Anna', date: '2026-02-22', status: 'completed', technician: 'Lab Tech Sarah' },
  { id: 4, order: 'ORD-104', patient: 'Paul Lee', type: 'Blood', collectedBy: 'Nurse Ben', date: '2026-02-24', status: 'pending', technician: '' },
];

const statusColors = {
  pending: 'yellow',
  collected: 'blue',
  processing: 'orange',
  completed: 'green',
  cancelled: 'red',
};

const statusCycle = ['pending', 'collected', 'processing', 'completed'];

export default function Processing() {
  const [samples, setSamples] = useState(initialProcessingSamples);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = samples.filter(s => {
    const matchesSearch =
      s.order.toLowerCase().includes(search.toLowerCase()) ||
      s.patient.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase()) ||
      s.technician.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const nextStatus = (id) => {
    setSamples(prev => prev.map(s => {
      if (s.id === id && s.status !== 'cancelled') {
        const index = statusCycle.indexOf(s.status);
        const next = statusCycle[(index + 1) % statusCycle.length];
        return { ...s, status: next };
      }
      return s;
    }));
  };

  const cancelSample = (id) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' } : s));
  };

  const revertSample = (id, prevStatus = 'collected') => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, status: prevStatus } : s));
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header orange"><i className="cogs icon"></i> Lab Processing</h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <input
              className="ui fluid input"
              placeholder="Search by order, patient, sample, or technician..."
              value={search}
              onInput={e => setSearch(e.target.value)}
            />
          </div>
          <div className="four wide column">
            <select className="ui fluid dropdown" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              {Object.keys(statusColors).map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="six wide column">
            <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); }}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Processing Table */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Patient</th>
                <th>Sample Type</th>
                <th>Collected By</th>
                <th>Date Collected</th>
                <th>Technician</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(s => (
                <tr key={s.id}>
                  <td>{s.order}</td>
                  <td>{s.patient}</td>
                  <td>{s.type}</td>
                  <td>{s.collectedBy}</td>
                  <td>{s.date}</td>
                  <td>{s.technician || '-'}</td>
                  <td>
                    <div className={`ui ${statusColors[s.status]} label`} style={{ textTransform: 'capitalize' }}>
                      {s.status}
                    </div>
                  </td>
                  <td>
                    {s.status !== 'cancelled' && s.status !== 'completed' && (
                      <div>
                        <button className="ui tiny orange button mr-1" onClick={() => nextStatus(s.id)}>
                          <i className="play icon"></i>Next Stage
                        </button>
                        <button className="ui tiny red button" onClick={() => cancelSample(s.id)}>
                          <i className="close icon"></i>Cancel
                        </button>
                      </div>
                    )}
                    {s.status === 'completed' && (
                      <button className="ui tiny grey button" onClick={() => revertSample(s.id, 'processing')}>
                        <i className="undo icon"></i>Revert
                      </button>
                    )}
                    {s.status === 'cancelled' && (
                      <button className="ui tiny blue button" onClick={() => revertSample(s.id, 'collected')}>
                        <i className="undo icon"></i>Revert
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center">No processing samples found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}