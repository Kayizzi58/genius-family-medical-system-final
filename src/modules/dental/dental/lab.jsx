import { h } from 'preact';
import { useState } from 'preact/hooks';

// Registered patients
const patients = [
  { id: 'P001', name: 'John Doe' },
  { id: 'P002', name: 'Jane Doe' },
  { id: 'P003', name: 'Mary Johnson' },
];

// Registered doctors
const doctors = [
  { id: 'D001', name: 'Dr. Smith' },
  { id: 'D002', name: 'Dr. Lee' },
];

const statusOrder = ['pending', 'in progress', 'completed'];
const statusColors = {
  pending: 'yellow',
  'in progress': 'blue',
  completed: 'green',
};

export default function LabOrdersPro() {
  const [labOrders, setLabOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    patientId: '',
    doctorId: '',
    tests: [''],
    requestedDate: new Date().toISOString().slice(0, 10),
    status: 'pending',
  });

  const filtered = labOrders.filter(order => {
    const patientName = patients.find(p => p.id === order.patientId)?.name || '';
    const doctorName = doctors.find(d => d.id === order.doctorId)?.name || '';
    const matchesSearch =
      patientName.toLowerCase().includes(search.toLowerCase()) ||
      doctorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const saveOrder = () => {
    if (!form.patientId || !form.doctorId) return;

    if (form.id) {
      setLabOrders(prev => prev.map(o => o.id === form.id ? form : o));
    } else {
      setLabOrders(prev => [...prev, { ...form, id: Date.now() }]);
    }

    setDialogOpen(false);
    setForm({ id: null, patientId: '', doctorId: '', tests: [''], requestedDate: new Date().toISOString().slice(0, 10), status: 'pending' });
  };

  const cycleStatus = id => {
    setLabOrders(prev =>
      prev.map(o => {
        if (o.id === id) {
          const currentIndex = statusOrder.indexOf(o.status);
          const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
          return { ...o, status: nextStatus };
        }
        return o;
      })
    );
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">Lab Orders</h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="eight wide column">
            <input
              type="text"
              className="ui fluid input"
              placeholder="Search by patient or doctor..."
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
              {statusOrder.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="four wide column">
            <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); }}>
              Clear
            </button>
          </div>
        </div>

        {/* Add new */}
        <button className="ui blue button mb-3" onClick={() => setDialogOpen(true)}>
          <i className="add icon"></i> New Lab Order
        </button>

        {/* Table */}
        <div className="ui responsive table">
          <table className="ui celled striped table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Tests</th>
                <th>Requested Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(order => (
                <tr key={order.id}>
                  <td>{patients.find(p => p.id === order.patientId)?.name}</td>
                  <td>{doctors.find(d => d.id === order.doctorId)?.name}</td>
                  <td>
                    <ul style={{ paddingLeft: '1rem' }}>
                      {order.tests.map((t,i) => <li key={i}>{t}</li>)}
                    </ul>
                  </td>
                  <td>{order.requestedDate}</td>
                  <td>
                    <div className={`ui ${statusColors[order.status]} label`} style={{ textTransform:'capitalize' }}>
                      {order.status}
                    </div>
                  </td>
                  <td>
                    <button className="ui mini blue button me-1" onClick={() => { setForm(order); setDialogOpen(true); }}>
                      Edit
                    </button>
                    <button className="ui mini orange button" onClick={() => cycleStatus(order.id)}>
                      Next Status
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center">No lab orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Full-screen Dialog */}
        {dialogOpen && (
          <div style={{
            position: 'fixed',
            top:0, left:0, width:'100%', height:'100%',
            background:'#fff', padding:'30px', overflowY:'auto', zIndex:2000
          }}>
            <div className="ui clearing segment">
              <h2 className="ui left floated header">{form.id ? 'Edit' : 'New'} Lab Order</h2>
              <button className="ui right floated red button" onClick={() => setDialogOpen(false)}>Close</button>
            </div>

            <div className="ui form">
              <div className="two fields">
                <div className="field">
                  <label>Patient</label>
                  <input
                    list="patient-list"
                    placeholder="Select patient..."
                    value={form.patientId ? patients.find(p=>p.id===form.patientId)?.name : ''}
                    onInput={e => {
                      const selected = patients.find(p=>p.name===e.target.value);
                      setForm({...form, patientId: selected?.id || ''});
                    }}
                  />
                  <datalist id="patient-list">
                    {patients.map(p => <option key={p.id} value={p.name}>{p.id}</option>)}
                  </datalist>
                </div>
                <div className="field">
                  <label>Doctor</label>
                  <input
                    list="doctor-list"
                    placeholder="Select doctor..."
                    value={form.doctorId ? doctors.find(d=>d.id===form.doctorId)?.name : ''}
                    onInput={e => {
                      const selected = doctors.find(d=>d.name===e.target.value);
                      setForm({...form, doctorId: selected?.id || ''});
                    }}
                  />
                  <datalist id="doctor-list">
                    {doctors.map(d => <option key={d.id} value={d.name}>{d.id}</option>)}
                  </datalist>
                </div>
              </div>

              <div className="field">
                <label>Requested Date</label>
                <input type="date" value={form.requestedDate} onInput={e => setForm({...form, requestedDate: e.target.value})} />
              </div>

              <label>Tests</label>
              {form.tests.map((t,i) => (
                <div className="field" key={i}>
                  <input
                    placeholder="Test name"
                    value={t}
                    onInput={e => {
                      const newTests = [...form.tests];
                      newTests[i] = e.target.value;
                      setForm({...form, tests:newTests});
                    }}
                  />
                </div>
              ))}
              <button className="ui mini grey button mb-3" onClick={() => setForm({...form, tests:[...form.tests,'']})}>
                + Add Test
              </button>

              <button className="ui positive button" onClick={saveOrder}>
                {form.id ? 'Update' : 'Save'} Lab Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}