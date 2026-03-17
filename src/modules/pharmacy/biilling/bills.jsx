import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Bills() {
  const [patient, setPatient] = useState({ name: '', number: '', age: '', insurance: '' });
  const [cart, setCart] = useState([]);
  const [filterType, setFilterType] = useState('All'); // Medicines or Supplies
  const [search, setSearch] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [discount, setDiscount] = useState(0); // percentage discount

  const [inventory, setInventory] = useState([
    { id: 'MED202611', name: 'Paracetamol 500mg', category: 'Tablet', batch: 'B-2026', qty: 120, price: 0.50, tax: 5, type: 'Medicine' },
    { id: 'MED202612', name: 'Amoxicillin', category: 'Capsule', batch: 'B-2025', qty: 8, price: 0.80, tax: 5, type: 'Medicine' },
    { id: 'MED202613', name: 'Ibuprofen', category: 'Tablet', batch: 'B-2024', qty: 30, price: 0.60, tax: 5, type: 'Medicine' },
    { id: 'MED202614', name: 'Cough Syrup', category: 'Syrup', batch: 'B-2023', qty: 12, price: 2.00, tax: 5, type: 'Medicine' },
    { id: 'SUP202701', name: 'Cotton', category: 'Gauze', batch: 'S-2027', qty: 200, price: 0.10, tax: 0, type: 'Supply' },
    { id: 'SUP202702', name: 'Syringe 5ml', category: 'Injection', batch: 'S-2027', qty: 150, price: 0.25, tax: 0, type: 'Supply' },
    { id: 'SUP202703', name: 'Bandage', category: 'Dressing', batch: 'S-2026', qty: 100, price: 0.15, tax: 0, type: 'Supply' },
  ]);

  // Filtered inventory
  const filteredInventory = inventory.filter(item => {
    const matchesType = filterType === 'All' || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Cart functions
  const addToCart = (item, qty) => {
    if (!qty || qty <= 0 || qty > item.qty) return alert('Invalid quantity');
    const exists = cart.find(c => c.id === item.id);
    if (exists) {
      setCart(prev => prev.map(c => c.id === item.id ? { ...c, qty: c.qty + qty } : c));
    } else {
      setCart(prev => [...prev, { ...item, qty }]);
    }
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(c => c.id !== id));

  // Totals
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const taxTotal = cart.reduce((sum, c) => sum + (c.price * c.qty * c.tax) / 100, 0);
  const discountAmount = (subtotal + taxTotal) * (discount / 100);
  const total = subtotal + taxTotal - discountAmount;

  const checkout = () => {
    if (!patient.name && !patient.number) return alert('Enter patient name or number');
    if (cart.length === 0) return alert('Cart is empty');

    const updatedInventory = inventory.map(item => {
      const inCart = cart.find(c => c.id === item.id);
      return inCart ? { ...item, qty: item.qty - inCart.qty } : item;
    });

    setInventory(updatedInventory);
    setShowDialog(false);
    alert(`Bill generated for ${patient.name || patient.number}, Total: $${total.toFixed(2)}`);
    setCart([]);
    setPatient({ name: '', number: '', age: '', insurance: '' });
    setDiscount(0);
  };

  return (
    <div className="ui container fluid my-4">

      {/* Patient Info */}
      <div className="ui card p-3 fluid shadow-sm mb-4 bg-light">
        <div className="ui segment raised">
          <h4 className="ui blue header large">Patient Information</h4>
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <label>Name / Patient Number</label>
                <input
                  list="patient-suggestions"
                  placeholder="Type name or patient number..."
                  value={patient.name || patient.number}
                  onInput={e => {
                    const val = e.target.value;
                    // Check if input matches an inventory batch, default to name
                    const match = inventory.find(i => `${i.name} (${i.batch})` === val);
                    if (match) setPatient({ ...patient, name: match.name, number: match.batch });
                    else setPatient({ ...patient, name: val, number: '' });
                  }}
                />
                <datalist id="patient-suggestions">
                  {inventory.map(item => (
                    <option key={item.id} value={`${item.name} (${item.batch})`} />
                  ))}
                </datalist>
              </div>
              <div className="field">
                <input type="number" placeholder="Age" value={patient.age} onInput={e => setPatient({ ...patient, age: e.target.value })} />
              </div>
              <div className="field">
                <input type="text" placeholder="Insurance / Card No" value={patient.insurance} onInput={e => setPatient({ ...patient, insurance: e.target.value })} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Inventory (same as before) */}
      <div className="ui card p-3 shadow-sm mb-4 fluid bg-light">
        <div className="ui segment raised">
          <h4 className="ui blue header large">Add to Cart</h4>
          <div className="ui stackable grid mb-3">
            <div className="four wide column">
              <select className="ui fluid dropdown" value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="All">All</option>
                <option value="Medicine">Medicines</option>
                <option value="Supply">Supplies</option>
              </select>
            </div>
            <div className="eight wide column">
              <input className="ui fluid input" placeholder="Search medicine or supply..." value={search} onInput={e => setSearch(e.target.value)} />
            </div>
            <div className="four wide column">
              <button className="ui grey button fluid" onClick={() => { setFilterType('All'); setSearch(''); }}>Clear Filters</button>
            </div>
          </div>

          <div className="ui three stackable cards">
            {filteredInventory.map(item => (
              <div className="ui card" key={item.id}>
                <div className="content">
                  <div className="header">{item.name}</div>
                  <div className="meta">{item.category} - {item.type}</div>
                  <div className="description">
                    <p>Batch: {item.batch}</p>
                    <p>Available: {item.qty}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Tax: {item.tax}%</p>
                  </div>
                </div>
                <div className="extra content">
                  <div className="ui input mb-1">
                    <input type="number" placeholder="Qty" id={`qty-${item.id}`} min="1" max={item.qty} />
                  </div>
                  <button className="ui green button fluid" onClick={() => {
                    const qty = parseInt(document.getElementById(`qty-${item.id}`).value);
                    addToCart(item, qty);
                  }}>
                    <i className="add icon"></i> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Cart Dialog */}
      <button className="ui huge blue fluid button mb-3" onClick={() => setShowDialog(true)}>
        <i className="shopping cart icon"></i> View Cart / Billing Summary
      </button>

      {showDialog && (
        <div className="ui  modals visible active">
          <div className="ui standard modal visible active" style={{ width: '95%', height: '95%', margin: 'auto', top: '2.5%' }}>
            <i className="close icon" onClick={() => setShowDialog(false)} style={{ cursor: 'pointer' }}></i>
            <div className="header">Billing Summary</div>
            <div className="content">
              <p><strong>Patient:</strong> {patient.name || patient.number}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Insurance:</strong> {patient.insurance}</p>

              <table className="ui celled striped table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Tax</th>
                    <th>Subtotal</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.tax}%</td>
                      <td>${(item.price * item.qty).toFixed(2)}</td>
                      <td>
                        <button className="ui red tiny button" onClick={() => removeFromCart(item.id)}>
                          <i className="trash icon"></i> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ui form mt-2">
                <div className="fields">
                  <div className="eight wide field">
                    <label>Discount (%)</label>
                    <input type="number" value={discount} onInput={e => setDiscount(parseFloat(e.target.value))} />
                  </div>
                </div>
              </div>

              <div className="ui grid mt-2">
                <div className="eight wide column"><strong>Subtotal:</strong></div>
                <div className="eight wide column">${subtotal.toFixed(2)}</div>
                <div className="eight wide column"><strong>Tax:</strong></div>
                <div className="eight wide column">${taxTotal.toFixed(2)}</div>
                <div className="eight wide column"><strong>Discount:</strong></div>
                <div className="eight wide column">-${discountAmount.toFixed(2)}</div>
                <div className="eight wide column"><strong>Total:</strong></div>
                <div className="eight wide column">${total.toFixed(2)}</div>
              </div>
            </div>
            <div className="actions">
              <button className="ui green huge button fluid" onClick={checkout}>
                <i className="credit card icon"></i> Process Payment
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}