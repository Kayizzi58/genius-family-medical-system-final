import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialInventory = [
  { id: 1, drug: 'Paracetamol 500mg', batch: 'BATCH-001', quantity: 100, unit: 'tablets', location: 'Main Store', status: 'in-stock', expiry: '2026-12-31' },
  { id: 2, drug: 'Amoxicillin 250mg', batch: 'BATCH-002', quantity: 50, unit: 'capsules', location: 'Branch A', status: 'low-stock', expiry: '2025-08-15' },
  { id: 3, drug: 'Ibuprofen 200mg', batch: 'BATCH-003', quantity: 0, unit: 'tablets', location: 'Main Store', status: 'out-of-stock', expiry: '2026-01-20' },
];

const statusColors = {
  'in-stock': 'green',
  'low-stock': 'yellow',
  'out-of-stock': 'red',
  'expired': 'grey',
};

export default function Pharmacyinventory() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    drug: '',
    batch: '',
    quantity: '',
    unit: '',
    location: '',
    expiry: '',
    status: 'in-stock',
  });

  const filtered = inventory.filter(item => {
    const matchesSearch =
      item.drug.toLowerCase().includes(search.toLowerCase()) ||
      item.batch.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, status) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const openModal = (item = null) => {
    setCurrentItem(item || { drug: '', batch: '', quantity: '', unit: '', location: '', expiry: '', status: 'in-stock' });
    setModalOpen(true);
  };

  const saveItem = () => {
    if (!currentItem.drug || !currentItem.batch || !currentItem.quantity || !currentItem.unit || !currentItem.location) {
      alert("Please fill all required fields");
      return;
    }

    if (currentItem.id) {
      // Edit existing
      setInventory(prev => prev.map(i => i.id === currentItem.id ? currentItem : i));
    } else {
      // Add new
      setInventory(prev => [...prev, { ...currentItem, id: prev.length + 1 }]);
    }

    setModalOpen(false);
  };

  return (
    <div className="ui container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="ui header blue"><i className="medkit icon"></i> Pharmacy Inventory</h3>
        <button className="ui tiny blue button" onClick={() => openModal()}>
          <i className="add icon"></i> Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="ui stackable grid mb-3">
        <div className="eight wide column">
          <input
            className="ui fluid input"
            placeholder="Search by drug, batch, or location..."
            value={search}
            onInput={e => setSearch(e.target.value)}
          />
        </div>
        <div className="four wide column">
          <select className="ui fluid dropdown" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map(s => (
              <option key={s} value={s}>{s.replace('-', ' ').toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="four wide column">
          <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); }}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card p-2 shadow-sm">
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Drug</th>
                <th>Batch</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Location</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(item => (
                <tr key={item.id}>
                  <td>{item.drug}</td>
                  <td>{item.batch}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unit}</td>
                  <td>{item.location}</td>
                  <td>{item.expiry || '-'}</td>
                  <td>
                    <div className={`ui ${statusColors[item.status]} label`} style={{ textTransform: 'capitalize' }}>
                      {item.status.replace('-', ' ')}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-1">
                      <button className="ui tiny blue button" onClick={() => openModal(item)}>
                        <i className="edit icon"></i>Edit
                      </button>
                      {item.status !== 'out-of-stock' && (
                        <button className="ui tiny red button" onClick={() => updateStatus(item.id, 'out-of-stock')}>
                          <i className="close icon"></i>Mark Out
                        </button>
                      )}
                      {item.status !== 'in-stock' && (
                        <button className="ui tiny green button" onClick={() => updateStatus(item.id, 'in-stock')}>
                          <i className="check icon"></i>Restock
                        </button>
                      )}
                      <button className="ui tiny grey button" onClick={() => updateStatus(item.id, 'expired')}>
                        <i className="calendar times icon"></i>Expire
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center">No inventory items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="ui modal active" style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', position: 'fixed', top:0, left:0, right:0, bottom:0, justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="ui segment" style={{ width: '400px', background: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3 className="ui header">{currentItem.id ? "Edit Item" : "Add Item"}</h3>
            <div className="ui form">
              <div className="field">
                <label>Drug</label>
                <input type="text" value={currentItem.drug} onInput={e => setCurrentItem({...currentItem, drug: e.target.value})}/>
              </div>
              <div className="field">
                <label>Batch</label>
                <input type="date" placeholder=""value={currentItem.batch} onInput={e => setCurrentItem({...currentItem, batch: e.target.value})}/>
              </div>
              <div className="field">
                <label>Quantity</label>
                <input type="number" value={currentItem.quantity} onInput={e => setCurrentItem({...currentItem, quantity: e.target.value})}/>
              </div>
              <div className="field">
                <label>Unit</label>
                <input type="text" value={currentItem.unit} onInput={e => setCurrentItem({...currentItem, unit: e.target.value})}/>
              </div>
              <div className="field">
                <label>Location</label>
                <input type="text" value={currentItem.location} onInput={e => setCurrentItem({...currentItem, location: e.target.value})}/>
              </div>
              <div className="field">
                <label>Expiry</label>
                <input type="date" value={currentItem.expiry} onInput={e => setCurrentItem({...currentItem, expiry: e.target.value})}/>
              </div>
              <div className="field">
                <label>Status</label>
                <select value={currentItem.status} onChange={e => setCurrentItem({...currentItem, status: e.target.value})} className="ui dropdown">
                  {Object.keys(statusColors).map(s => <option key={s} value={s}>{s.replace('-', ' ').toUpperCase()}</option>)}
                </select>
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-end gap-2">
              <button className="ui grey button" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="ui blue button" onClick={saveItem}>{currentItem.id ? "Save" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}