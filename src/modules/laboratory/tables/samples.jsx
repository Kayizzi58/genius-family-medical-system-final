
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialSamples = [
  { id: 1, order: 'ORD-101', type: 'Blood', collectedBy: 'Nurse Anna', status: 'pending' },
  { id: 2, order: 'ORD-102', type: 'Urine', collectedBy: 'Nurse Ben', status: 'collected' },
  { id: 3, order: 'ORD-103', type: 'X-ray', collectedBy: 'Nurse Anna', status: 'pending' },
  { id: 4, order: 'ORD-104', type: 'Blood', collectedBy: 'Nurse Ben', status: 'pending' },
];

const statusColors = {
  pending: 'yellow',
  collected: 'green',
  cancelled: 'red',
};

export default function Samples() {
  const [samples, setSamples] = useState(initialSamples);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = samples.filter(s => {
    const matchesSearch =
      s.order.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase()) ||
      s.collectedBy.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const markCollected = (id) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, status: 'collected' } : s));
  };

  const cancelSample = (id) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, status: 'cancelled' } : s));
  };

  const revertSample = (id) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, status: 'pending' } : s));
  };

  const addSample = () => {
    const newId = samples.length + 1;
    setSamples(prev => [...prev, { id: newId, order: `ORD-10${newId}`, type: 'New Sample', collectedBy: '', status: 'pending' }]);
  };

  return (
    <div className="ui container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="ui header blue"><i className="vial icon"></i> Sample Collection</h3>
        <button className="ui tiny blue button" onClick={addSample}>
          <i className="add icon"></i> Add Sample
        </button>
      </div>

      {/* Filters */}
      <div className="ui stackable grid mb-3">
        <div className="eight wide column">
          <input
            className="ui fluid input"
            placeholder="Search by order, type, or collector..."
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
        <div className="four wide column">
          <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); }}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Sample Table */}
      <div className="card p-2 shadow-sm">
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Sample Type</th>
                <th>Collected By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(s => (
                <tr key={s.id}>
                  <td>{s.order}</td>
                  <td>{s.type}</td>
                  <td>{s.collectedBy || '-'}</td>
                  <td>
                    <div className={`ui ${statusColors[s.status]} label`} style={{ textTransform: 'capitalize' }}>
                      {s.status}
                    </div>
                  </td>
                  <td>
                    {s.status === 'pending' && (
                      <div>
                        <button className="ui tiny green button mr-1" onClick={() => markCollected(s.id)}>
                          <i className="check icon"></i>Collected
                        </button>
                        <button className="ui tiny red button" onClick={() => cancelSample(s.id)}>
                          <i className="close icon"></i>Cancel
                        </button>
                      </div>
                    )}
                    {s.status === 'collected' && (
                      <button className="ui tiny grey button" onClick={() => revertSample(s.id)}>
                        <i className="undo icon"></i>Revert
                      </button>
                    )}
                    {s.status === 'cancelled' && (
                      <button className="ui tiny blue button" onClick={() => revertSample(s.id)}>
                        <i className="undo icon"></i>Revert
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center">No samples found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}