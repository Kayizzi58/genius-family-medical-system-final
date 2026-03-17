import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Dispense() {
  const [orders, setOrders] = useState([
    { id: 'ORD202611', patient: 'John Doe', doctor: 'Dr. Smith', meds: ['Paracetamol 500mg', 'Cough Syrup'], status: 'pending', date: '2026-02-25' },
    { id: 'ORD202612', patient: 'Ana Smith', doctor: 'Dr. Brown', meds: ['Amoxicillin'], status: 'collected', date: '2026-02-24' },
    { id: 'ORD202613', patient: 'Mark Lee', doctor: 'Dr. Adams', meds: ['Ibuprofen'], status: 'pending', date: '2026-02-23' },
    { id: 'ORD202614', patient: 'Lucy Brown', doctor: 'Dr. Clark', meds: ['Cough Syrup', 'Bandage'], status: 'cancelled', date: '2026-02-22' },
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [editModal, setEditModal] = useState(null);

  const statusColors = { pending: 'yellow', collected: 'green', cancelled: 'red' };

  // Actions
  const markCollected = (id) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'collected' } : o));
  const cancelOrder = (id) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o));
  const revertOrder = (id) => setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'pending' } : o));
  const openEdit = (order) => setEditModal({ ...order });

  const handleEditChange = (e) => {
    const { name, value } = e.currentTarget;
    setEditModal(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    setOrders(prev => prev.map(o => o.id === editModal.id ? editModal : o));
    setEditModal(null);
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.patient.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Simulate synchronization with patient portal
  const syncOrders = () => {
    const newOrder = {
      id: `ORD${Math.floor(Math.random()*100000)}`,
      patient: 'New Patient',
      doctor: 'Dr. Sync',
      meds: ['Paracetamol 500mg'],
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <div className="ui container my-4">

      {/* Filters & Sync */}
      <div className="ui stackable grid mb-3">
        <div className="six wide column">
          <input className="ui fluid input" placeholder="Search patient or order ID..." value={search} onInput={e => setSearch(e.target.value)} />
        </div>
        <div className="four wide column">
          <select className="ui fluid dropdown" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
        </div>
        <div className="six wide column">
          <div className="ui buttons fluid">
            <button className="ui grey button" onClick={() => { setSearch(''); setFilterStatus(''); }}>Clear Filters</button>
            <button className="ui blue button" onClick={syncOrders}><i className="sync icon"></i> Sync</button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card p-3 shadow-sm bg-light">
        <div className="ui segment raised">
          <h4 className="ui blue header large">Dispensary Orders</h4>
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Order ID</th><th>Patient</th><th>Doctor</th><th>Medicines</th><th>Date</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? filteredOrders.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.patient}</td>
                  <td>{o.doctor}</td>
                  <td><div className="ui list">{o.meds.map((m,i)=><div key={i} className="item">{m}</div>)}</div></td>
                  <td>{o.date}</td>
                  <td><div className={`ui ${statusColors[o.status]} label`} style={{ textTransform: 'capitalize' }}>{o.status}</div></td>
                  <td>
                    {o.status==='pending' && <div className="ui buttons tiny">
                      <button className="ui green button" onClick={()=>markCollected(o.id)}><i className="check icon"></i> Collect</button>
                      <button className="ui red button" onClick={()=>cancelOrder(o.id)}><i className="close icon"></i> Cancel</button>
                      <button className="ui blue button" onClick={()=>openEdit(o)}><i className="edit icon"></i> Edit</button>
                    </div>}
                    {(o.status==='collected' || o.status==='cancelled') && <button className="ui grey tiny button" onClick={()=>revertOrder(o.id)}><i className="undo icon"></i> Revert</button>}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="text-center">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="ui dimmer modals page active" style={{ display:'flex', alignItems:'center', justifyContent:'center'}} onClick={()=>setEditModal(null)}>
          <div className="ui modal active" style={{ display:'block', width:'600px'}} onClick={e=>e.stopPropagation()}>
            <div className="header">Edit Order</div>
            <div className="content">
              <div className="ui form">
                <div className="field">
                  <label>Patient</label>
                  <input type="text" name="patient" value={editModal.patient} onInput={handleEditChange}/>
                </div>
                <div className="field">
                  <label>Doctor</label>
                  <input type="text" name="doctor" value={editModal.doctor} onInput={handleEditChange}/>
                </div>
                <div className="field">
                  <label>Medicines (comma separated)</label>
                  <input type="text" name="meds" value={editModal.meds.join(', ')} onInput={e=>handleEditChange({currentTarget:{name:'meds', value:e.currentTarget.value.split(',').map(s=>s.trim())}})} />
                </div>
                <div className="field">
                  <label>Date</label>
                  <input type="date" name="date" value={editModal.date} onInput={handleEditChange}/>
                </div>
                <div className="field">
                  <label>Status</label>
                  <select className="ui dropdown" name="status" value={editModal.status} onChange={handleEditChange}>
                    {Object.keys(statusColors).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={saveEdit}>Save</button>
              <button className="ui grey button" onClick={()=>setEditModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}