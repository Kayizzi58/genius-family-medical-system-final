import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialLabOrders = [
  {
    id: "LAB-001",
    testName: "Complete Blood Count",
    patientName: "John Doe",
    MRN: "MRN-004567",
    urgency: "Routine",
    status: "Pending",
    orderedBy: "Dr. Smith",
    createdAt: "2026-02-24 08:30",
    notes: "Check for anemia"
  },
  {
    id: "LAB-002",
    testName: "Liver Function Test",
    patientName: "Jane Smith",
    MRN: "MRN-004568",
    urgency: "Urgent",
    status: "Completed",
    orderedBy: "Dr. Smith",
    createdAt: "2026-02-24 09:00",
    notes: ""
  },
];

export default function Lab({ doctorName }) {
  const [labOrders, setLabOrders] = useState(initialLabOrders);
  const [filters, setFilters] = useState({ search: "", status: "", urgency: "", doctor: "", date: "" });
  const [actionOrder, setActionOrder] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const filteredOrders = labOrders.filter(order =>
    (filters.search === "" ||
      order.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.MRN.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.testName.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.status === "" || order.status === filters.status) &&
    (filters.urgency === "" || order.urgency === filters.urgency) &&
    (filters.doctor === "" || order.orderedBy === filters.doctor) &&
    (filters.date === "" ||
      (filters.date === "today" && order.createdAt.includes(new Date().toLocaleDateString())))
  );

  /* ---------- STATUS COLOR ---------- */
  const statusColor = (status) =>
    status === "Pending" ? "grey" :
    status === "In Progress" ? "blue" :
    status === "Completed" ? "green" :
    status === "Cancelled" ? "red" : "black";

  /* ---------- MODAL ACTIONS ---------- */
  const openModal = (order, type) => {
    setActionOrder(order);
    setActionType(type);
  };

  const closeModal = () => {
    setActionOrder(null);
    setActionType(null);
    setCancelReason("");
  };

  const confirmCancel = () => {
    setLabOrders(prev =>
      prev.map(order =>
        order.id === actionOrder.id
          ? { ...order, status: "Cancelled", cancelReason }
          : order
      )
    );
    closeModal();
  };

  const handleReorder = () => {
    const newOrder = {
      ...actionOrder,
      id: `LAB-${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
      orderedBy: doctorName
    };
    setLabOrders([newOrder, ...labOrders]);
    closeModal();
  };

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Lab Orders</h3>

      {/* ================= FILTER BAR ================= */}
      <div className="ui segment">
        <div className="ui stackable grid">
          <div className="four wide column">
            <div className="ui fluid icon input">
              <input
                type="text"
                placeholder="Search patient / MRN / test..."
                value={filters.search}
                onInput={e => setFilters({ ...filters, search: e.target.value })}
              />
              <i className="search icon"></i>
            </div>
          </div>

          <div className="three wide column">
            <select className="ui fluid dropdown"
              onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="three wide column">
            <select className="ui fluid dropdown"
              onChange={e => setFilters({ ...filters, urgency: e.target.value })}
            >
              <option value="">All Urgency</option>
              <option>Routine</option>
              <option>Urgent</option>
            </select>
          </div>

          <div className="three wide column">
            <select className="ui fluid dropdown"
              onChange={e => setFilters({ ...filters, doctor: e.target.value })}
            >
              <option value="">All Doctors</option>
              <option>Dr. Smith</option>
              <option>Dr. Adams</option>
            </select>
          </div>

          <div className="three wide column">
            <button className="ui fluid grey button"
              onClick={() => setFilters({ search: "", status: "", urgency: "", doctor: "", date: "" })}
            >Clear Filters</button>
          </div>
        </div>
        <div className="ui small grey text mt-2">
          Showing {filteredOrders.length} of {labOrders.length} records
        </div>
      </div>

      {/* ================= LAB TABLE ================= */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Test</th>
            <th>Urgency</th>
            <th>Status</th>
            <th>Doctor</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.patientName}</td>
              <td>{order.testName}</td>
              <td>{order.urgency}</td>
              <td><div className={`ui ${statusColor(order.status)} label`}>{order.status}</div></td>
              <td>{order.orderedBy}</td>
              <td>{order.createdAt}</td>
              <td>
                <div className="ui tiny buttons">
                  {(order.status === "Pending" || order.status === "In Progress") && (
                    <button className="ui red button" onClick={() => openModal(order, "cancel")}>
                      <i className="times icon"></i>
                    </button>
                  )}
                  {(order.status === "Completed" || order.status === "Cancelled") && (
                    <button className="ui teal button" onClick={() => openModal(order, "reorder")}>
                      <i className="redo icon"></i>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="8" className="center aligned">No lab orders found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= MODAL ================= */}
      {actionOrder && (
        <div className="ui dimmer modals page transition visible active" style={{ display: "block" }}>
          <div className="ui small modal visible active">
            <div className="header">
              {actionType === "cancel" ? "Cancel Lab Order" : "Re-Order Lab Test"}
            </div>

            <div className="content">
              {actionType === "cancel" && (
                <>
                  <p>Canceling: <strong>{actionOrder.testName}</strong> for {actionOrder.patientName}</p>
                  <div className="ui form">
                    <div className="field">
                      <label>Reason for Cancellation</label>
                      <textarea
                        placeholder="Enter reason..."
                        value={cancelReason}
                        onInput={e => setCancelReason(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="ui warning message">This will mark the order as Cancelled.</div>
                </>
              )}

              {actionType === "reorder" && (
                <>
                  <p>Re-order test for patient:</p>
                  <div className="ui segment">
                    <strong>{actionOrder.patientName}</strong><br />
                    {actionOrder.testName}
                  </div>
                  <div className="ui info message">A new lab order will be created with status "Pending".</div>
                </>
              )}
            </div>

            <div className="actions">
              <button className="ui button" onClick={closeModal}>Close</button>
              {actionType === "cancel" && (
                <button className="ui red button" disabled={!cancelReason} onClick={confirmCancel}>Confirm Cancel</button>
              )}
              {actionType === "reorder" && (
                <button className="ui teal button" onClick={handleReorder}>Confirm Re-Order</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}