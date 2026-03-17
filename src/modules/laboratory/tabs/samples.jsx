import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Samples() {
  const [samples, setSamples] = useState([
    { id: 1, order: 'ORD-101', type: 'Blood', collectedBy: 'Nurse Anna', status: 'pending' },
    { id: 2, order: 'ORD-102', type: 'Urine', collectedBy: 'Nurse Ben', status: 'pending' },
    { id: 3, order: 'ORD-103', type: 'Saliva', collectedBy: 'Nurse Clara', status: 'pending' },
  ]);

  // Modal state
  const [modal, setModal] = useState({ visible: false, type: '', sample: null, value: '' });

  // Open modal for Complete/Cancel
  const openModal = (sample, type) => {
    setModal({ visible: true, type, sample, value: '' });
  };

  // Open modal for adding new sample
  const openAddModal = () => {
    setModal({ visible: true, type: 'add', sample: { order: '', type: '', collectedBy: '', status: 'pending' }, value: '' });
  };

  const closeModal = () => setModal({ visible: false, type: '', sample: null, value: '' });

  const handleModalSave = () => {
    if (modal.type === 'complete') {
      setSamples(prev =>
        prev.map(s => s.id === modal.sample.id ? { ...s, status: 'collected', labReport: modal.value } : s)
      );
    } else if (modal.type === 'cancel') {
      setSamples(prev =>
        prev.map(s => s.id === modal.sample.id ? { ...s, status: 'canceled', cancelReason: modal.value } : s)
      );
    } else if (modal.type === 'add') {
      const newId = samples.length ? Math.max(...samples.map(s => s.id)) + 1 : 1;
      setSamples(prev => [...prev, { ...modal.sample, id: newId }]);
    }
    closeModal();
  };

  return (
    <div className="ui container my-4">
      <h3 className="ui blue header">Sample Collection</h3>

      <button className="ui tiny blue button mb-3" onClick={openAddModal}>
        <i className="add icon"></i> Add Sample
      </button>

      <div className="card p-3 bg-light">
        <table className="ui celled striped table">
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
            {samples.map(sample => (
              <tr key={sample.id}>
                <td>{sample.order}</td>
                <td>{sample.type}</td>
                <td>{sample.collectedBy}</td>
                <td>
                  <span className={`ui ${sample.status === 'pending' ? 'yellow' : sample.status === 'collected' ? 'green' : 'red'} label`}>
                    {sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="ui buttons tiny">
                    {sample.status === 'pending' && (
                      <>
                        <button className="ui green button" onClick={() => openModal(sample, 'complete')}>
                          <i className="check icon"></i>Collected
                        </button>
                        <button className="ui red button" onClick={() => openModal(sample, 'cancel')}>
                          <i className="times icon"></i>Cancel
                        </button>
                      </>
                    )}
                    {sample.status !== 'pending' && <span className="text-muted">No actions</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal.visible && (
        <div className="ui dimmer modals page active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={closeModal}>
          <div className="ui modal active" style={{ display: 'block', width: '400px' }} onClick={e => e.stopPropagation()}>
            <div className="header">
              {modal.type === 'complete' ? 'Add Lab Report' : modal.type === 'cancel' ? 'Cancel Sample' : 'Add New Sample'}
            </div>
            <div className="content">
              <div className="ui form">
                {modal.type === 'add' ? (
                  <>
                    <div className="field">
                      <label>Order</label>
                      <input type="text" value={modal.sample.order} onInput={e => setModal(prev => ({ ...prev, sample: { ...prev.sample, order: e.target.value } }))} />
                    </div>
                    <div className="field">
                      <label>Sample Type</label>
                      <input type="text" value={modal.sample.type} onInput={e => setModal(prev => ({ ...prev, sample: { ...prev.sample, type: e.target.value } }))} />
                    </div>
                    <div className="field">
                      <label>Collected By</label>
                      <input type="text" value={modal.sample.collectedBy} onInput={e => setModal(prev => ({ ...prev, sample: { ...prev.sample, collectedBy: e.target.value } }))} />
                    </div>
                  </>
                ) : (
                  <div className="field">
                    <label>{modal.type === 'complete' ? 'Lab Report' : 'Reason for Cancellation'}</label>
                    <input type="text" value={modal.value} onInput={e => setModal(prev => ({ ...prev, value: e.target.value }))} />
                  </div>
                )}
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={handleModalSave}>
                {modal.type === 'add' ? 'Add Sample' : modal.type === 'complete' ? 'Submit Report' : 'Submit Reason'}
              </button>
              <button className="ui grey button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}