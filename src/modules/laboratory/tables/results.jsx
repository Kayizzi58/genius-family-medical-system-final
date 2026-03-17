import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialResults = [
  { id: 1, order: 'ORD-101', patient: 'John Doe', sample: 'Blood', collectedBy: 'Nurse Anna', date: '2026-02-24', technician: 'Lab Tech Mike', status: 'completed', result: 'Hemoglobin: 13.5 g/dL', verified: false },
  { id: 2, order: 'ORD-102', patient: 'Jane Smith', sample: 'Urine', collectedBy: 'Nurse Ben', date: '2026-02-23', technician: 'Lab Tech Mike', status: 'completed', result: 'Normal', verified: true },
  { id: 3, order: 'ORD-103', patient: 'Mary Johnson', sample: 'X-ray', collectedBy: 'Nurse Anna', date: '2026-02-22', technician: 'Lab Tech Sarah', status: 'processing', result: '', verified: false },
];

const statusColors = {
  pending: 'yellow',
  collected: 'blue',
  processing: 'orange',
  completed: 'grey',
  cancelled: 'red',
};

export default function Labresults() {
  const [results, setResults] = useState(initialResults);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Modal state
  const [modal, setModal] = useState({ visible: false, type: '', result: null, value: '' });

  const filteredResults = results.filter(r => {
    const matchesSearch =
      r.order.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.sample.toLowerCase().includes(search.toLowerCase()) ||
      r.technician.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openModal = (type, result = null) => {
    setModal({ visible: true, type, result, value: result ? result.result : '' });
  };

  const closeModal = () => setModal({ visible: false, type: '', result: null, value: '' });

  const handleModalSave = () => {
    if (modal.type === 'edit' || modal.type === 'add') {
      if (modal.type === 'add') {
        const newResult = {
          id: Date.now(),
          order: `ORD-${Date.now() % 1000}`,
          patient: 'New Patient',
          sample: 'New Sample',
          collectedBy: '',
          date: new Date().toISOString().slice(0,10),
          technician: '',
          status: 'completed',
          result: modal.value,
          verified: false,
        };
        setResults(prev => [...prev, newResult]);
      } else {
        setResults(prev => prev.map(r => r.id === modal.result.id ? { ...r, result: modal.value } : r));
      }
    } else if (modal.type === 'verify') {
      setResults(prev => prev.map(r => r.id === modal.result.id ? { ...r, verified: true } : r));
    } else if (modal.type === 'revert') {
      setResults(prev => prev.map(r => r.id === modal.result.id ? { ...r, verified: false } : r));
    }
    closeModal();
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="ui header green"><i className="file alternate outline icon"></i> Lab Results</h3>
          <button className="ui tiny blue button" onClick={() => openModal('add')}>
            <i className="add icon"></i> Add Result
          </button>
        </div>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="eight wide column">
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
          <div className="four wide column">
            <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); }}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Patient</th>
                <th>Sample</th>
                <th>Collected By</th>
                <th>Date Collected</th>
                <th>Technician</th>
                <th>Status</th>
                <th>Result</th>
                <th>Verified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.length > 0 ? filteredResults.map(r => (
                <tr key={r.id}>
                  <td>{r.order}</td>
                  <td>{r.patient}</td>
                  <td>{r.sample}</td>
                  <td>{r.collectedBy}</td>
                  <td>{r.date}</td>
                  <td>{r.technician}</td>
                  <td>
                    <div className={`ui ${statusColors[r.status]} label`} style={{ textTransform: 'capitalize' }}>
                      {r.status}
                    </div>
                  </td>
                  <td>{r.result || '-'}</td>
                  <td>
                    {r.verified ? <div className="ui green label">Verified</div> : <div className="ui grey label">Draft</div>}
                  </td>
                  <td>
                    <div className="ui buttons tiny">
                      <button className="ui tiny blue button mr-1" onClick={() => openModal('edit', r)}>
                        <i className="edit icon"></i>Edit
                      </button>
                      {!r.verified && (
                        <button className="ui tiny green button mr-1" onClick={() => openModal('verify', r)}>
                          <i className="check icon"></i>Verify
                        </button>
                      )}
                      {r.verified && (
                        <button className="ui tiny grey button" onClick={() => openModal('revert', r)}>
                          <i className="undo icon"></i>Revert
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="text-center">No results found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal.visible && (
        <div className="ui dimmer modals page active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={closeModal}>
          <div className="ui modal active" style={{ display: 'block', width: '400px' }} onClick={e => e.stopPropagation()}>
            <div className="header">
              {modal.type === 'add' ? 'Add Lab Result' : modal.type === 'edit' ? 'Edit Lab Result' : modal.type === 'verify' ? 'Verify Lab Result' : 'Revert Verification'}
            </div>
            <div className="content">
              <div className="ui form">
                {(modal.type === 'add' || modal.type === 'edit') && (
                  <div className="field">
                    <label>Lab Result</label>
                    <input
                      type="text"
                      value={modal.value}
                      onInput={e => setModal(prev => ({ ...prev, value: e.target.value }))}
                    />
                  </div>
                )}
                {(modal.type === 'verify') && (
                  <p>Are you sure you want to verify the result for <strong>{modal.result?.order}</strong>?</p>
                )}
                {(modal.type === 'revert') && (
                  <p>Are you sure you want to revert verification for <strong>{modal.result?.order}</strong>?</p>
                )}
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={handleModalSave}>
                {modal.type === 'add' || modal.type === 'edit' ? 'Save' : modal.type === 'verify' ? 'Verify' : 'Revert'}
              </button>
              <button className="ui grey button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}