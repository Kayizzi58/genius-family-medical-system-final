import { h } from "preact";
import { useState } from "preact/hooks";

const initialReferrals = [
  {
    id: "REF-001",
    patientName: "John Doe",
    MRN: "MRN-004567",
    referredTo: "Cardiology",
    reason: "Chest pain evaluation",
    status: "Pending",
    referredBy: "Dr. Smith",
    createdAt: "2026-02-24 10:00",
  },
  {
    id: "REF-002",
    patientName: "Jane Smith",
    MRN: "MRN-004568",
    referredTo: "Gastroenterology",
    reason: "Abdominal pain follow-up",
    status: "Approved",
    referredBy: "Dr. Smith",
    createdAt: "2026-02-24 10:30",
  },
];

export default function Referrals({ doctorName }) {
  const [referrals, setReferrals] = useState(initialReferrals);
  const [filters, setFilters] = useState({ search: "", status: "", doctor: "" });
  const [actionRef, setActionRef] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newRef, setNewRef] = useState({
    patientName: "",
    MRN: "",
    referredTo: "",
    reason: "",
  });

  // FILTERED REFERRALS
  const filteredRef = referrals.filter(r =>
    (filters.search === "" ||
      r.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.MRN.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.referredTo.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.status === "" || r.status === filters.status) &&
    (filters.doctor === "" || r.referredBy === filters.doctor)
  );

  // STATUS COLOR
  const statusColor = status =>
    status === "Pending" ? "grey" :
    status === "Approved" ? "blue" :
    status === "Completed" ? "green" :
    status === "Cancelled" ? "red" : "black";

  // ACTION MODALS
  const openModal = (ref, type) => { setActionRef(ref); setActionType(type); };
  const closeModal = () => { setActionRef(null); setActionType(null); setCancelReason(""); };

  const confirmCancel = () => {
    setReferrals(prev => prev.map(r => r.id === actionRef.id ? { ...r, status: "Cancelled", cancelReason } : r));
    closeModal();
  };

  const handleReorder = () => {
    const newOrder = {
      ...actionRef,
      id: `REF-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
      referredBy: doctorName
    };
    setReferrals([newOrder, ...referrals]);
    closeModal();
  };

  const handleAddChange = e => {
    const { name, value } = e.currentTarget;
    setNewRef({ ...newRef, [name]: value });
  };

  const handleAddReferral = e => {
    e.preventDefault();
    if (!newRef.patientName || !newRef.MRN || !newRef.referredTo || !newRef.reason) {
      alert("Please fill all required fields");
      return;
    }
    const ref = { ...newRef, id: `REF-${Date.now()}`, status: "Pending", referredBy: doctorName, createdAt: new Date().toLocaleString() };
    setReferrals([ref, ...referrals]);
    setNewRef({ patientName: "", MRN: "", referredTo: "", reason: "" });
    setOpenDialog(false);
  };

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Referrals</h3>

      {/* FILTER BAR */}
      <div className="ui segment">
        <div className="ui stackable grid">
          <div className="four wide column">
            <div className="ui fluid icon input">
              <input type="text" placeholder="Search patient / MRN / dept..."
                value={filters.search} onInput={e => setFilters({ ...filters, search: e.target.value })} />
              <i className="search icon"></i>
            </div>
          </div>
          <div className="three wide column">
            <select className="ui fluid dropdown" onChange={e => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Completed</option>
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
            <button className="ui fluid grey button" onClick={() => setFilters({ search: "", status: "", doctor: "" })}>Clear Filters</button>
          </div>
        </div>
        <div className="ui small grey text mt-2">
          Showing {filteredRef.length} of {referrals.length} records
        </div>
      </div>

      {/* TABLE */}
      <button className="ui green button mb-3" onClick={() => setOpenDialog(true)}>
        <i className="add icon"></i> New Referral
      </button>
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>MRN</th>
            <th>Referred To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Referred By</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRef.length > 0 ? filteredRef.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.patientName}</td>
              <td>{r.MRN}</td>
              <td>{r.referredTo}</td>
              <td>{r.reason}</td>
              <td><div className={`ui ${statusColor(r.status)} label`}>{r.status}</div></td>
              <td>{r.referredBy}</td>
              <td>{r.createdAt}</td>
              <td>
                <div className="ui tiny buttons">
                  {r.status === "Pending" && <>
                    <button className="ui tiny green button mr-1" onClick={() => openModal(r, "approve")}>Approve</button>
                    <button className="ui tiny red button" onClick={() => openModal(r, "cancel")}>Cancel</button>
                  </>}
                  {r.status === "Approved" &&
                    <button className="ui tiny blue button" onClick={() => openModal(r, "complete")}>Complete</button>
                  }
                  {(r.status === "Cancelled" || r.status === "Completed") &&
                    <button className="ui tiny teal button" onClick={() => openModal(r, "reorder")}>Re-Order</button>
                  }
                </div>
              </td>
            </tr>
          )) : <tr><td colSpan="9" className="center aligned">No referrals found</td></tr>}
        </tbody>
      </table>

      {/* ACTION MODAL */}
      {actionRef && (
        <div className="ui dimmer modals page transition visible active" style={{ display: "block" }}>
          <div className="ui small modal visible active">
            <div className="header">
              {actionType === "cancel" && "Cancel Referral"}
              {actionType === "reorder" && "Re-Order Referral"}
              {actionType === "approve" && "Approve Referral"}
              {actionType === "complete" && "Complete Referral"}
            </div>
            <div className="content">
              {(actionType === "cancel") && <>
                <p>Cancel referral: <strong>{actionRef.referredTo}</strong> for {actionRef.patientName}</p>
                <div className="ui form">
                  <div className="field">
                    <label>Reason for Cancellation</label>
                    <textarea value={cancelReason} onInput={e => setCancelReason(e.target.value)} />
                  </div>
                </div>
                <div className="ui warning message">This will mark the referral as Cancelled.</div>
              </>}
              {(actionType === "reorder") && <>
                <p>Re-order referral for patient:</p>
                <div className="ui segment"><strong>{actionRef.patientName}</strong><br />{actionRef.referredTo}</div>
                <div className="ui info message">A new referral will be created with status "Pending".</div>
              </>}
              {(actionType === "approve") && <p>Approve referral for patient: <strong>{actionRef.patientName}</strong></p>}
              {(actionType === "complete") && <p>Complete referral for patient: <strong>{actionRef.patientName}</strong></p>}
            </div>
            <div className="actions">
              <button className="ui button" onClick={closeModal}>Close</button>
              {actionType === "cancel" && <button className="ui red button" disabled={!cancelReason} onClick={confirmCancel}>Confirm Cancel</button>}
              {actionType === "reorder" && <button className="ui teal button" onClick={handleReorder}>Confirm Re-Order</button>}
              {actionType === "approve" && <button className="ui green button" onClick={() => { updateStatus(actionRef.id, "Approved"); closeModal(); }}>Confirm Approve</button>}
              {actionType === "complete" && <button className="ui blue button" onClick={() => { updateStatus(actionRef.id, "Completed"); closeModal(); }}>Confirm Complete</button>}
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW REFERRAL DIALOG */}
      {openDialog && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#fff", zIndex: 1000, padding: 40, overflowY: "auto" }}>
          <h2 className="ui dividing header">New Referral</h2>
          <form className="ui form" onSubmit={handleAddReferral}>
            <div className="two fields">
              <div className="field">
                <label>Patient Name</label>
                <input type="text" name="patientName" value={newRef.patientName} onInput={handleAddChange} />
              </div>
              <div className="field">
                <label>MRN</label>
                <input type="text" name="MRN" value={newRef.MRN} onInput={handleAddChange} />
              </div>
            </div>
            <div className="two fields">
              <div className="field">
                <label>Referred To</label>
                <select name="referredTo" value={newRef.referredTo} onChange={handleAddChange}>
                  <option value="">Select Department</option>
                  <option>Cardiology</option>
                  <option>Gastroenterology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                </select>
              </div>
              <div className="field">
                <label>Reason / Notes</label>
                <input type="text" name="reason" value={newRef.reason} onInput={handleAddChange} />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <button type="button" className="ui black button" onClick={() => setOpenDialog(false)}>Cancel</button>
              <button type="submit" className="ui positive button" style={{ marginLeft: 10 }}>Save Referral</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}