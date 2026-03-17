import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Supplies() {
  const [supplies, setSupplies] = useState([
    { id: 'SUP202611', name: 'Paracetamol 500mg', category: 'Medicine', batch: 'B-2026', qty: 120, expiry: '2027-01-01', purchase: 0.25, selling: 0.50, tax: 5, reorder: 50, status: 'available' },
    { id: 'SUP202612', name: 'Amoxicillin', category: 'Medicine', batch: 'B-2025', qty: 8, expiry: '2026-04-10', purchase: 0.4, selling: 0.8, tax: 5, reorder: 20, status: 'low-stock' },
    { id: 'SUP202613', name: 'Ibuprofen', category: 'Medicine', batch: 'B-2024', qty: 30, expiry: '2026-03-01', purchase: 0.3, selling: 0.6, tax: 5, reorder: 25, status: 'near-expiry' },
    { id: 'SUP202614', name: 'Cough Syrup', category: 'Medicine', batch: 'B-2023', qty: 12, expiry: '2025-12-01', purchase: 1.2, selling: 2.0, tax: 5, reorder: 10, status: 'expired' },
  ]);

  const statusColors = {
    'available': 'green',
    'low-stock': 'orange',
    'near-expiry': 'yellow',
    'expired': 'red',
  };

  // Modal state
  const [editModal, setEditModal] = useState({ visible: false, supply: null });

  // Filters & search
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredSupplies = supplies.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.batch.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openEditModal = (supply) => setEditModal({ visible: true, supply: { ...supply } });
  const closeEditModal = () => setEditModal({ visible: false, supply: null });
  const saveEdit = () => {
    setSupplies(prev => prev.map(s => s.id === editModal.supply.id ? editModal.supply : s));
    closeEditModal();
  };

  const updateStatus = (id, status) => setSupplies(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  const deleteSupply = (id) => setSupplies(prev => prev.filter(s => s.id !== id));

  return (
    <div className="ui container fluid my-4">

      {/* 🔹 Filters */}
      <div className="ui stackable grid mb-3">
        <div className="eight wide column">
          <input
            className="ui fluid input"
            placeholder="Search by name or batch..."
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
            {Object.keys(statusColors).map(s => (
              <option key={s} value={s}>{s.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
        <div className="four wide column">
          <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); }}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* 🔹 Supplies Table */}
      <div className="card p-3 shadow-sm fluid bg-light">
        <div className="ui segment fluid raised">
          <h4 className="ui blue header large">Supplies Inventory</h4>
          <div className="ui fluid table">
            <table className="ui celled striped selectable table">
              <thead>
                <tr>
                  <th>Id</th><th>Name</th><th>Category</th><th>Batch</th><th>Qty</th><th>Expiry</th>
                  <th>Purchase</th><th>Selling</th><th>Tax</th><th>Reorder</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSupplies.length > 0 ? filteredSupplies.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.category}</td>
                    <td>{s.batch}</td>
                    <td>{s.qty}</td>
                    <td>{s.expiry}</td>
                    <td>${s.purchase.toFixed(2)}</td>
                    <td>${s.selling.toFixed(2)}</td>
                    <td>{s.tax}%</td>
                    <td>{s.reorder}</td>
                    <td>
                      <div className={`ui ${statusColors[s.status]} label`} style={{ textTransform: 'capitalize' }}>
                        {s.status.replace('-', ' ')}
                      </div>
                    </td>
                    <td>
                      <div className="ui buttons tiny">
                        <button className="ui blue button" onClick={() => openEditModal(s)}><i className="edit icon"></i></button>
                        <button className="ui orange button" onClick={() => updateStatus(s.id, 'low-stock')}><i className="warning icon"></i></button>
                        <button className="ui yellow button" onClick={() => updateStatus(s.id, 'near-expiry')}><i className="clock icon"></i></button>
                        <button className="ui red button" onClick={() => updateStatus(s.id, 'expired')}><i className="calendar times icon"></i></button>
                        <button className="ui grey button" onClick={() => deleteSupply(s.id)}><i className="trash icon"></i></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="12" className="text-center">No supplies found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🔹 Edit Modal */}
      {editModal.visible && (
        <div className="ui dimmer modals visible active">
          <div className="ui standard modal visible active" style={{ width: '50%', margin: 'auto', top: '10%' }}>
            <i className="close icon" style={{ cursor: 'pointer' }} onClick={closeEditModal}></i>
            <div className="header">Edit Supply: {editModal.supply.name}</div>
            <div className="content">
              <div className="ui form">
                {['name','category','batch','qty','expiry','purchase','selling','tax','reorder','status'].map(field => (
                  <div className="field" key={field}>
                    <label>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                    {field === 'status' ? (
                      <select
                        value={editModal.supply.status}
                        onChange={e => setEditModal(prev => ({ ...prev, supply: { ...prev.supply, status: e.target.value } }))}
                      >
                        {Object.keys(statusColors).map(s => (
                          <option key={s} value={s}>{s.replace('-', ' ')}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={['qty','purchase','selling','tax','reorder'].includes(field) ? 'number' : (field==='expiry'?'date':'text')}
                        value={editModal.supply[field]}
                        onInput={e => setEditModal(prev => ({
                          ...prev,
                          supply: { ...prev.supply, [field]: ['qty','reorder'].includes(field) ? parseInt(e.target.value) : ['purchase','selling','tax'].includes(field) ? parseFloat(e.target.value) : e.target.value }
                        }))}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="actions">
              <button className="ui green button fluid" onClick={saveEdit}><i className="save icon"></i> Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}