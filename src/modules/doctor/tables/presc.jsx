import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialPrescriptions = [
  {
    id: "RX-001",
    patientName: "John Doe",
    MRN: "MRN-004567",
    drugName: "Paracetamol",
    dosage: "500mg",
    route: "Oral",
    frequency: "3 times/day",
    duration: "5 days",
    notes: "For fever",
    status: "Pending",
    prescribedBy: "Dr. Smith",
    createdAt: "2026-02-24 08:45",
  },
  {
    id: "RX-002",
    patientName: "Jane Smith",
    MRN: "MRN-004568",
    drugName: "Amoxicillin",
    dosage: "250mg",
    route: "Oral",
    frequency: "2 times/day",
    duration: "7 days",
    notes: "",
    status: "Pending",
    prescribedBy: "Dr. Smith",
    createdAt: "2026-02-24 09:20",
  },
];

export default function Prescription({ doctorName }) {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [filters, setFilters] = useState({ search: "", status: "", doctor: "", date: "" });
  const [actionRx, setActionRx] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newRx, setNewRx] = useState({
    patientName: "",
    MRN: "",
    drugName: "",
    dosage: "",
    route: "Oral",
    frequency: "",
    duration: "",
    notes: ""
  });

  // FILTERED PRESCRIPTIONS
  const filteredRx = prescriptions.filter(rx =>
    (filters.search === "" ||
      rx.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      rx.MRN.toLowerCase().includes(filters.search.toLowerCase()) ||
      rx.drugName.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.status === "" || rx.status === filters.status) &&
    (filters.doctor === "" || rx.prescribedBy === filters.doctor) &&
    (filters.date === "" || (filters.date === "today" && rx.createdAt.includes(new Date().toLocaleDateString())))
  );

  // STATUS COLORS
  const statusColor = status => 
    status === "Pending" ? "grey" :
    status === "Dispensed" ? "green" :
    status === "Cancelled" ? "red" : "black";

  // ACTION MODALS
  const openModal = (rx, type) => { setActionRx(rx); setActionType(type); };
  const closeModal = () => { setActionRx(null); setActionType(null); setCancelReason(""); };

  const confirmCancel = () => {
    setPrescriptions(prev => prev.map(rx =>
      rx.id === actionRx.id ? { ...rx, status: "Cancelled", cancelReason } : rx
    ));
    closeModal();
  };

  const handleReorder = () => {
    const newOrder = {
      ...actionRx,
      id: `RX-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
      prescribedBy: doctorName
    };
    setPrescriptions([newOrder, ...prescriptions]);
    closeModal();
  };

  const handleAddRxChange = e => {
    const { name, value } = e.currentTarget;
    setNewRx({ ...newRx, [name]: value });
  };

  const handleAddRx = e => {
    e.preventDefault();
    if (!newRx.patientName || !newRx.MRN || !newRx.drugName || !newRx.dosage || !newRx.frequency || !newRx.duration) {
      alert("Please fill all required fields");
      return;
    }
    const rx = { ...newRx, id: `RX-${Date.now()}`, status: "Pending", prescribedBy: doctorName, createdAt: new Date().toLocaleString() };
    setPrescriptions([rx, ...prescriptions]);
    setNewRx({ patientName: "", MRN: "", drugName: "", dosage: "", route: "Oral", frequency: "", duration: "", notes: "" });
    setOpenDialog(false);
  };

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Prescriptions</h3>

      {/* FILTER BAR */}
      <div className="ui segment">
        <div className="ui stackable grid">
          <div className="four wide column">
            <div className="ui fluid icon input">
              <input type="text" placeholder="Search patient / MRN / drug..."
                value={filters.search} onInput={e => setFilters({ ...filters, search: e.target.value })} />
              <i className="search icon"></i>
            </div>
          </div>
          <div className="three wide column">
            <select className="ui fluid dropdown" onChange={e => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All Status</option>
              <option>Pending</option>
              <option>Dispensed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="three wide column">
            <select className="ui fluid dropdown" onChange={e => setFilters({ ...filters, doctor: e.target.value })}>
              <option value="">All Doctors</option>
              <option>Dr. Smith</option>
              <option>Dr. Adams</option>
            </select>
          </div>
          <div className="three wide column">
            <button className="ui fluid grey button" onClick={() => setFilters({ search: "", status: "", doctor: "", date: "" })}>
              Clear Filters
            </button>
          </div>
        </div>
        <div className="ui small grey text mt-2">
          Showing {filteredRx.length} of {prescriptions.length} records
        </div>
      </div>

      {/* TABLE */}
      <button className="ui green button mb-3" onClick={() => setOpenDialog(true)}>
        <i className="add icon"></i> New Prescription
      </button>
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>MRN</th>
            <th>Drug</th>
            <th>Dosage</th>
            <th>Route</th>
            <th>Frequency</th>
            <th>Duration</th>
            <th>Notes</th>
            <th>Status</th>
            <th>Prescribed By</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRx.length > 0 ? filteredRx.map(rx => (
            <tr key={rx.id}>
              <td>{rx.id}</td>
              <td>{rx.patientName}</td>
              <td>{rx.MRN}</td>
              <td>{rx.drugName}</td>
              <td>{rx.dosage}</td>
              <td>{rx.route}</td>
              <td>{rx.frequency}</td>
              <td>{rx.duration}</td>
              <td>{rx.notes}</td>
              <td><div className={`ui ${statusColor(rx.status)} label`}>{rx.status}</div></td>
              <td>{rx.prescribedBy}</td>
              <td>{rx.createdAt}</td>
              <td>
                <div className="ui tiny buttons">
                  {rx.status === "Pending" && <>
                    <button className="ui tiny green button mr-1" onClick={() => openModal(rx, "dispense")}>Dispensed</button>
                    <button className="ui tiny red button" onClick={() => openModal(rx, "cancel")}>Cancel</button>
                  </>}
                  {(rx.status === "Dispensed" || rx.status === "Cancelled") &&
                    <button className="ui tiny blue button" onClick={() => openModal(rx, "reorder")}>Re-Order</button>
                  }
                </div>
              </td>
            </tr>
          )) : <tr><td colSpan="13" className="center aligned">No prescriptions found</td></tr>}
        </tbody>
      </table>

      {/* MODAL */}
      {actionRx && (
        <div className="ui dimmer modals page transition visible active" style={{ display: "block" }}>
          <div className="ui small modal visible active">
            <div className="header">
              {actionType === "cancel" && "Cancel Prescription"}
              {actionType === "reorder" && "Re-Order Prescription"}
              {actionType === "dispense" && "Mark as Dispensed"}
            </div>
            <div className="content">
              {actionType === "cancel" && <>
                <p>Cancel prescription: <strong>{actionRx.drugName}</strong> for {actionRx.patientName}</p>
                <div className="ui form">
                  <div className="field">
                    <label>Reason for Cancellation</label>
                    <textarea value={cancelReason} onInput={e => setCancelReason(e.target.value)} />
                  </div>
                </div>
                <div className="ui warning message">This will mark the prescription as Cancelled.</div>
              </>}
              {actionType === "reorder" && <>
                <p>Re-order prescription for patient:</p>
                <div className="ui segment"><strong>{actionRx.patientName}</strong><br />{actionRx.drugName}</div>
                <div className="ui info message">A new prescription will be created with status "Pending".</div>
              </>}
              {actionType === "dispense" && <>
                <p>Mark prescription as Dispensed for patient: <strong>{actionRx.patientName}</strong></p>
              </>}
            </div>
            <div className="actions">
              <button className="ui button" onClick={closeModal}>Close</button>
              {actionType === "cancel" &&
                <button className="ui red button" disabled={!cancelReason} onClick={confirmCancel}>Confirm Cancel</button>
              }
              {actionType === "reorder" &&
                <button className="ui teal button" onClick={handleReorder}>Confirm Re-Order</button>
              }
              {actionType === "dispense" &&
                <button className="ui green button" onClick={() => { updateStatus(actionRx.id, "Dispensed"); closeModal(); }}>Confirm Dispensed</button>
              }
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW PRESCRIPTION DIALOG */}
      {openDialog && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#fff", zIndex: 1000, padding: 40, overflowY: "auto" }}>
          <h2 className="ui dividing header">New Prescription</h2>
          <form className="ui form" onSubmit={handleAddRx}>
            <div className="two fields">
              <div className="field">
                <label>Patient Name</label>
                <input type="text" name="patientName" value={newRx.patientName} onInput={handleAddRxChange} />
              </div>
              <div className="field">
                <label>MRN</label>
                <input type="text" name="MRN" value={newRx.MRN} onInput={handleAddRxChange} />
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Drug Name</label>
                <input type="text" name="drugName" value={newRx.drugName} onInput={handleAddRxChange} />
              </div>
              <div className="field">
                <label>Dosage</label>
                <input type="text" name="dosage" value={newRx.dosage} onInput={handleAddRxChange} />
              </div>
            </div>
            <div className="three fields">
              <div className="field">
                <label>Route</label>
                <select className="ui dropdown" name="route" value={newRx.route} onChange={handleAddRxChange}>
                  <option>Oral</option>
                  <option>IV</option>
                  <option>IM</option>
                  <option>Topical</option>
                </select>
              </div>
              <div className="field">
                <label>Frequency</label>
                <input type="text" name="frequency" value={newRx.frequency} onInput={handleAddRxChange} />
              </div>
              <div className="field">
                <label>Duration</label>
                <input type="text" name="duration" value={newRx.duration} onInput={handleAddRxChange} />
              </div>
            </div>
            <div className="field">
              <label>Notes</label>
              <textarea name="notes" value={newRx.notes} onInput={handleAddRxChange} />
            </div>
            <div style={{ marginTop: 20 }}>
              <button type="button" className="ui black button" onClick={() => setOpenDialog(false)}>Cancel</button>
              <button type="submit" className="ui positive button" style={{ marginLeft: 10 }}>Save Prescription</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}