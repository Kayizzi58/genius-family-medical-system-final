import { h } from "preact";
import { useState } from "preact/hooks";

// Registered patients
const patients = [
  { id: "P001", name: "John Doe" },
  { id: "P002", name: "Jane Doe" },
  { id: "P003", name: "Mary Johnson" },
];

// Registered dentists
const dentists = [
  { id: "D001", name: "Dr. Smith" },
  { id: "D002", name: "Dr. Lee" },
];

const statusOrder = ["ordered", "in_progress", "completed", "reported", "cancelled"];
const statusColors = {
  ordered: "grey",
  in_progress: "yellow",
  completed: "blue",
  reported: "green",
  cancelled: "red",
};

export default function RadiologyOrdersPro() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    patientId: "",
    dentistId: "",
    examType: "",
    region: "",
    priority: "routine",
    notes: "",
    status: "ordered",
    date: new Date().toISOString().slice(0, 10),
  });

  // Filtered view
  const filtered = orders.filter(order => {
    const patientName = patients.find(p => p.id === order.patientId)?.name || "";
    const dentistName = dentists.find(d => d.id === order.dentistId)?.name || "";
    const matchesSearch =
      patientName.toLowerCase().includes(search.toLowerCase()) ||
      dentistName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const saveOrder = () => {
    if (!form.patientId || !form.examType) return;

    if (form.id) {
      setOrders(prev => prev.map(o => o.id === form.id ? form : o));
    } else {
      setOrders(prev => [...prev, { ...form, id: Date.now() }]);
    }

    setDialogOpen(false);
    setForm({
      id: null,
      patientId: "",
      dentistId: "",
      examType: "",
      region: "",
      priority: "routine",
      notes: "",
      status: "ordered",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const cycleStatus = id => {
    setOrders(prev =>
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
      {/* Header */}
      <div className="ui clearing segment">
        <h3 className="ui left floated header blue">
          <i className="x-ray icon"></i> Radiology Orders
        </h3>
        <button className="ui right floated blue button" onClick={() => setDialogOpen(true)}>
          <i className="add icon"></i> New Order
        </button>
      </div>

      {/* Filters */}
      <div className="ui stackable grid mb-3">
        <div className="eight wide column">
          <input
            className="ui fluid input"
            placeholder="Search patient or dentist..."
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
            <option value="">All Status</option>
            {statusOrder.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="four wide column">
          <button className="ui grey fluid button" onClick={() => { setSearch(""); setFilterStatus(""); }}>
            Clear
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="ui responsive table">
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Dentist</th>
              <th>Exam</th>
              <th>Region</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map(o => (
              <tr key={o.id}>
                <td>{patients.find(p => p.id === o.patientId)?.name}</td>
                <td>{dentists.find(d => d.id === o.dentistId)?.name}</td>
                <td>{o.examType}</td>
                <td>{o.region}</td>
                <td>
                  <div className={`ui ${o.priority === "urgent" ? "red" : o.priority === "stat" ? "orange" : "blue"} label`}>
                    {o.priority}
                  </div>
                </td>
                <td>
                  <div className={`ui ${statusColors[o.status]} label`} style={{ textTransform:'capitalize' }}>
                    {o.status}
                  </div>
                </td>
                <td>{o.date}</td>
                <td>
                  <button className="ui mini blue button me-1" onClick={() => { setForm(o); setDialogOpen(true); }}>Edit</button>
                  <button className="ui mini orange button" onClick={() => cycleStatus(o.id)}>Next Status</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" className="center aligned">No radiology orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Full-screen Dialog */}
      {dialogOpen && (
        <div style={{
          position: "fixed",
          top:0, left:0, width:'100%', height:'100%',
          background:'#fff', padding:'30px', overflowY:'auto', zIndex:2000
        }}>
          <div className="ui clearing segment">
            <h2 className="ui left floated header">{form.id ? 'Edit' : 'New'} Radiology Order</h2>
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
                <label>Dentist</label>
                <input
                  list="dentist-list"
                  placeholder="Select dentist..."
                  value={form.dentistId ? dentists.find(d=>d.id===form.dentistId)?.name : ''}
                  onInput={e => {
                    const selected = dentists.find(d=>d.name===e.target.value);
                    setForm({...form, dentistId: selected?.id || ''});
                  }}
                />
                <datalist id="dentist-list">
                  {dentists.map(d => <option key={d.id} value={d.name}>{d.id}</option>)}
                </datalist>
              </div>
            </div>

            <div className="field">
              <label>Exam Type</label>
              <select className="ui dropdown" value={form.examType} onChange={e => setForm({...form, examType:e.target.value})}>
                <option value="">Select Exam</option>
                <option>Periapical X-Ray</option>
                <option>OPG</option>
                <option>CBCT</option>
                <option>Bitewing</option>
              </select>
            </div>

            <div className="field">
              <label>Region / Tooth</label>
              <input placeholder="e.g. Tooth 26 or Upper Left" value={form.region} onInput={e => setForm({...form, region:e.target.value})} />
            </div>

            <div className="field">
              <label>Priority</label>
              <select className="ui dropdown" value={form.priority} onChange={e => setForm({...form, priority:e.target.value})}>
                <option value="routine">Routine</option>
                <option value="urgent">Urgent</option>
                <option value="stat">STAT</option>
              </select>
            </div>

            <div className="field">
              <label>Clinical Notes</label>
              <textarea value={form.notes} onInput={e => setForm({...form, notes:e.target.value})}></textarea>
            </div>

            <div style={{marginTop:'20px'}}>
              <button className="ui black button" onClick={() => setDialogOpen(false)}>Cancel</button>
              <button className="ui positive button" onClick={saveOrder}>{form.id ? 'Update' : 'Save'} Order</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}