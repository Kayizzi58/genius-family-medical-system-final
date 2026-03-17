import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Stock() {
  const [inventory, setInventory] = useState([
    { id: 'MED202611', name: 'Paracetamol 500mg', category: 'Medicine', batch: 'B-2026', qty: 120, expiry: '2027-01-01', purchase: 0.25, selling: 0.50, reorder: 50 },
    { id: 'MED202612', name: 'Amoxicillin', category: 'Medicine', batch: 'B-2025', qty: 8, expiry: '2026-04-10', purchase: 0.40, selling: 0.80, reorder: 20 },
    { id: 'SUP202613', name: 'Cotton Balls', category: 'Supply', batch: 'S-2024', qty: 30, expiry: '2026-03-01', purchase: 0.05, selling: 0.10, reorder: 15 },
    { id: 'MED202614', name: 'Cough Syrup', category: 'Medicine', batch: 'B-2023', qty: 12, expiry: '2025-12-01', purchase: 1.20, selling: 2.00, reorder: 10 },
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modalItem, setModalItem] = useState(null); // for edit
  const [modalAdd, setModalAdd] = useState(false);  // for new item

  const today = new Date();
  const statusColors = { 'available': 'green', 'low-stock': 'orange', 'near-expiry': 'yellow', 'expired': 'red', 'out-of-stock': 'grey' };

  // Compute status
  const inventoryWithStatus = inventory.map(item => {
    const expiryDate = new Date(item.expiry);
    let status = 'available';
    if (item.qty === 0) status = 'out-of-stock';
    else if (item.qty <= item.reorder) status = 'low-stock';
    else if ((expiryDate - today)/(1000*3600*24) <= 30) status = 'near-expiry';
    else if (expiryDate < today) status = 'expired';
    return { ...item, status };
  });

  const filteredInventory = inventoryWithStatus.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || i.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Action Handlers
  const openEdit = (item) => setModalItem({ ...item });
  const saveEdit = () => {
    setInventory(prev => prev.map(i => i.id === modalItem.id ? modalItem : i));
    setModalItem(null);
  };
  const deleteItem = (id) => setInventory(prev => prev.filter(i => i.id !== id));

  const openAddModal = () => setModalAdd(true);
  const saveAdd = (newItem) => {
    setInventory(prev => [newItem, ...prev]);
    setModalAdd(false);
  };

  return (
    <div className="ui container my-4">

      {/* Add Item Button */}
      <div className="mb-3">
        <button className="ui primary button" onClick={openAddModal}><i className="plus icon"></i> Add Medicine / Supply</button>
      </div>

      {/* Filters */}
      <div className="ui stackable grid mb-3">
        <div className="eight wide column">
          <input className="ui fluid input" placeholder="Search by name or category..." value={search} onInput={e => setSearch(e.target.value)} />
        </div>
        <div className="four wide column">
          <select className="ui fluid dropdown" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
        <div className="four wide column">
          <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); }}>Clear Filters</button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card p-3 shadow-sm bg-light">
        <div className="ui segment raised">
          <h4 className="ui blue header large">Inventory</h4>
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Category</th><th>Batch</th><th>Qty</th><th>Expiry</th><th>Purchase ($)</th><th>Selling ($)</th><th>Reorder</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map(i => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.category}</td>
                  <td>{i.batch}</td>
                  <td>{i.qty}</td>
                  <td>{i.expiry}</td>
                  <td>{i.purchase.toFixed(2)}</td>
                  <td>{i.selling?.toFixed(2) || '-'}</td>
                  <td>{i.reorder}</td>
                  <td><div className={`ui ${statusColors[i.status]} label`}>{i.status.replace('-', ' ')}</div></td>
                  <td>
                    <div className="ui buttons tiny">
                      <button className="ui blue button" onClick={()=>openEdit(i)}><i className="edit icon"></i></button>
                      <button className="ui red button" onClick={()=>deleteItem(i.id)}><i className="trash icon"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInventory.length===0 && <tr><td colSpan="11" className="text-center">No items found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {modalItem && (
        <div className="ui dimmer modals page active" style={{display:'flex', alignItems:'center', justifyContent:'center'}} onClick={()=>setModalItem(null)}>
          <div className="ui modal active" style={{display:'block', width:'500px'}} onClick={e=>e.stopPropagation()}>
            <div className="header">Edit Item</div>
            <div className="content">
              <div className="ui form">
                {['name','category','batch','qty','expiry','purchase','selling','reorder'].map(field=>(
                  <div className="field" key={field}>
                    <label>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                    <input type={field==='qty'||field==='purchase'||field==='selling'||field==='reorder'?'number':'text'} 
                      value={modalItem[field]} 
                      onInput={e=>setModalItem({...modalItem,[field]:field==='qty'||field==='purchase'||field==='selling'||field==='reorder'?Number(e.currentTarget.value):e.currentTarget.value})} />
                  </div>
                ))}
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={saveEdit}>Save</button>
              <button className="ui grey button" onClick={()=>setModalItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {modalAdd && (
        <div className="ui dimmer modals page active" style={{display:'flex', alignItems:'center', justifyContent:'center'}} onClick={()=>setModalAdd(false)}>
          <div className="ui modal active" style={{display:'block', width:'500px'}} onClick={e=>e.stopPropagation()}>
            <div className="header">Add New Item</div>
            <div className="content">
              <div className="ui form">
                {['name','category','batch','qty','expiry','purchase','selling','reorder'].map(field=>(
                  <div className="field" key={field}>
                    <label>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                    {field==='category' ? (
                      <select className="ui dropdown" onChange={e=>setModalItem(prev=>({...prev,[field]:e.currentTarget.value}))}>
                        <option value="Medicine">Medicine</option>
                        <option value="Supply">Supply</option>
                      </select>
                    ) : (
                      <input type={field==='qty'||field==='purchase'||field==='selling'||field==='reorder'?'number':'text'} 
                        onInput={e=>setModalItem(prev=>({...prev,[field]:field==='qty'||field==='purchase'||field==='selling'||field==='reorder'?Number(e.currentTarget.value):e.currentTarget.value}))} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={()=>{ saveAdd({...modalItem, id:(modalItem.category==='Medicine'?'MED':'SUP')+Date.now()}); setModalItem(null); }}>Add</button>
              <button className="ui grey button" onClick={()=>setModalAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}