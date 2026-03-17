import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Meds() {
  const [medicines, setMedicines] = useState([
    { id: 'MED202611', name: 'Paracetamol 500mg', category: 'Tablet', batch: 'B-2026', qty: 120, expiry: '2027-01-01', purchase: 0.25, selling: 0.50, tax: 5, reorder: 50, status: 'available' },
    { id: 'MED202612', name: 'Amoxicillin', category: 'Capsule', batch: 'B-2025', qty: 8, expiry: '2026-04-10', purchase: 0.4, selling: 0.8, tax: 5, reorder: 20, status: 'low-stock' },
    { id: 'MED202613', name: 'Ibuprofen', category: 'Tablet', batch: 'B-2024', qty: 30, expiry: '2026-03-01', purchase: 0.3, selling: 0.6, tax: 5, reorder: 25, status: 'near-expiry' },
    { id: 'MED202614', name: 'Cough Syrup', category: 'Syrup', batch: 'B-2023', qty: 12, expiry: '2025-12-01', purchase: 1.2, selling: 2.0, tax: 5, reorder: 10, status: 'expired' },
  ]);

  const statusColors = {
    'available': 'green',
    'low-stock': 'orange',
    'near-expiry': 'yellow',
    'expired': 'red',
  };

  // Modal state
  const [editModal, setEditModal] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setEditModal(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    setMedicines(prev => prev.map(m => m.id === editModal.id ? editModal : m));
    setEditModal(null);
  };

  const markLowStock = (id) => setMedicines(prev => prev.map(m => m.id === id ? { ...m, status: 'low-stock' } : m));
  const markNearExpiry = (id) => setMedicines(prev => prev.map(m => m.id === id ? { ...m, status: 'near-expiry' } : m));
  const markExpired = (id) => setMedicines(prev => prev.map(m => m.id === id ? { ...m, status: 'expired' } : m));
  const deleteMedicine = (id) => setMedicines(prev => prev.filter(m => m.id !== id));
  const editMedicine = (id) => {
    const med = medicines.find(m => m.id === id);
    setEditModal({ ...med });
  };

  // Filtered medicines based on search and status
  const filteredMeds = medicines.filter(m =>
    (m.name.toLowerCase().includes(search.toLowerCase()) ||
     m.batch.toLowerCase().includes(search.toLowerCase()) ||
     m.category.toLowerCase().includes(search.toLowerCase())) &&
    (!filterStatus || m.status === filterStatus)
  );

  return (
    <div className="ui container fluid my-4">

      <div className="card p-3 shadow-sm fluid bg-light">
        <div className="mb-3 d-flex gap-2 flex-wrap">
          <input
            className="ui input"
            placeholder="Search by Name / Category / Batch..."
            value={search}
            onInput={e => setSearch(e.target.value)}
          />
          <select
            className="ui dropdown"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map(s => (
              <option key={s} value={s}>{s.replace('-', ' ').toUpperCase()}</option>
            ))}
          </select>
          <button className="ui grey button" onClick={() => { setSearch(''); setFilterStatus(''); }}>Clear</button>
        </div>

        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Id</th><th>Name</th><th>Category</th><th>Batch</th><th>Qty</th>
                <th>Expiry</th><th>Purchase Price</th><th>Selling Price</th>
                <th>Tax/VAT %</th><th>Re-order level</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeds.map(m => (
                <tr key={m.id}>
                  <td>{m.id}</td><td>{m.name}</td><td>{m.category}</td><td>{m.batch}</td><td>{m.qty}</td>
                  <td>{m.expiry}</td><td>${m.purchase.toFixed(2)}</td><td>${m.selling.toFixed(2)}</td>
                  <td>{m.tax}%</td><td>{m.reorder}</td>
                  <td>
                    <div className={`ui ${statusColors[m.status]} label`} style={{ textTransform: 'capitalize' }}>
                      {m.status.replace('-', ' ')}
                    </div>
                  </td>
                  <td>
                    <div className="ui buttons tiny">
                      <button className="ui blue button" onClick={() => editMedicine(m.id)}>
                        <i className="edit icon"></i>
                      </button>
                      <button className="ui orange button" onClick={() => markLowStock(m.id)}>
                        <i className="warning icon"></i>
                      </button>
                      <button className="ui yellow button" onClick={() => markNearExpiry(m.id)}>
                        <i className="clock icon"></i>
                      </button>
                      <button className="ui red button" onClick={() => markExpired(m.id)}>
                        <i className="calendar times icon"></i>
                      </button>
                      <button className="ui grey button" onClick={() => deleteMedicine(m.id)}>
                        <i className="trash icon"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMeds.length === 0 && (
                <tr>
                  <td colSpan="12" className="text-center">No medicines found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div
          className="ui dimmer modals page active"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setEditModal(null)}
        >
          <div
            className="ui modal active"
            style={{ display: 'block', width: '600px' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="header">Edit Medicine</div>
            <div className="content">
              <div className="ui form">
                {['name','category','batch','qty','expiry','purchase','selling','tax','reorder','status'].map(field => (
                  <div className="field" key={field}>
                    <label>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                    <input
                      type={['qty','purchase','selling','tax','reorder'].includes(field) ? 'number' : 'text'}
                      name={field}
                      value={editModal[field]}
                      onInput={handleInputChange}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={saveEdit}>Save</button>
              <button className="ui grey button" onClick={() => setEditModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}