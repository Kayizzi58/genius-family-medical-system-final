import { h } from "preact";
import { useState } from "preact/hooks";

const initialReports = [
  { id: "RPT-2001", patient: "John Doe", study: "CT Brain", status: "Final", date: "2026-02-26", remarks: "Normal" },
  { id: "RPT-2002", patient: "Jane Smith", study: "MRI Spine", status: "Draft", date: "2026-02-25", remarks: "" },
  { id: "RPT-2003", patient: "Mary Johnson", study: "X-ray Chest", status: "Cancelled", date: "2026-02-24", remarks: "Cancelled by doctor" },
];

const statusColors = {
  Draft: "grey",
  Final: "green",
  Cancelled: "red",
};

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modal, setModal] = useState({ visible: false, type: "", report: null });

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      !search ||
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.study.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (value) => {
    setSearch(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const matched = reports
      .filter((r) => r.patient.toLowerCase().includes(value.toLowerCase()))
      .map((r) => r.patient);
    setSuggestions([...new Set(matched)]);
  };

  const openModal = (type, report) => setModal({ visible: true, type, report });
  const closeModal = () => setModal({ visible: false, type: "", report: null });

  const saveReport = (updatedReport) => {
    setReports((prev) => prev.map((r) => (r.id === updatedReport.id ? updatedReport : r)));
    closeModal();
  };

  return (
    <div class="ui container my-4">
      <div class="d-flex justify-content-between mb-3">
        <button class="ui green button" onClick={() => openModal("create", null)}>
          <i class="plus icon"></i> Create Report
        </button>

        <div class="ui form">
          <div class="fields">
            <div class="field" style={{ position: "relative" }}>
              <input
                placeholder="Search patient or report ID..."
                value={search}
                onInput={(e) => handleSearch(e.target.value)}
              />
              {suggestions.length > 0 && (
                <div class="ui segment" style={{ position: "absolute", zIndex: 10, width: "100%", maxHeight: "150px", overflowY: "auto", padding: "0.5rem" }}>
                  {suggestions.map((s) => (
                    <div
                      class="item"
                      style={{ cursor: "pointer", padding: "0.25rem 0" }}
                      onClick={() => {
                        setSearch(s);
                        setSuggestions([]);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div class="field">
              <select class="ui dropdown" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All Statuses</option>
                {Object.keys(statusColors).map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div class="field">
              <button class="ui grey button" onClick={() => { setSearch(""); setFilterStatus(""); setSuggestions([]); }}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <table class="ui celled selectable table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Patient</th>
            <th>Study</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length > 0 ? filteredReports.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.patient}</td>
              <td>{r.study}</td>
              <td>
                <div class={`ui ${statusColors[r.status]} label`}>{r.status}</div>
              </td>
              <td>{r.date}</td>
              <td>
                <button class="ui tiny blue button mr-1" onClick={() => openModal("view", r)}>
                  <i class="eye icon"></i> View
                </button>
                <button class="ui tiny orange button mr-1" onClick={() => openModal("edit", r)}>
                  <i class="edit icon"></i> Edit
                </button>
                {r.status !== "Cancelled" && (
                  <button class="ui tiny red button" onClick={() => saveReport({ ...r, status: "Cancelled" })}>
                    <i class="times icon"></i> Cancel
                  </button>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} class="text-center">No reports found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modal.visible && (
        <div
          class="ui dimmer modals page active"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={closeModal}
        >
          <div class="ui modal active" style={{ display: "block", width: "450px" }} onClick={(e) => e.stopPropagation()}>
            <div class="header">
              {modal.type === "view" && "View Report"}
              {modal.type === "edit" && "Edit Report"}
              {modal.type === "create" && "Create Report"}
            </div>
            <div class="content">
              <div class="ui form">
                <div class="field">
                  <label>Report ID</label>
                  <input
                    type="text"
                    value={modal.report?.id || ""}
                    disabled={modal.type !== "create"}
                    onInput={(e) => modal.report && (modal.report.id = e.target.value)}
                  />
                </div>
                <div class="field">
                  <label>Patient</label>
                  <input
                    type="text"
                    value={modal.report?.patient || ""}
                    onInput={(e) => modal.report && (modal.report.patient = e.target.value)}
                    disabled={modal.type === "view"}
                  />
                </div>
                <div class="field">
                  <label>Study</label>
                  <input
                    type="text"
                    value={modal.report?.study || ""}
                    onInput={(e) => modal.report && (modal.report.study = e.target.value)}
                    disabled={modal.type === "view"}
                  />
                </div>
                <div class="field">
                  <label>Status</label>
                  <select
                    value={modal.report?.status || "Draft"}
                    onChange={(e) => modal.report && (modal.report.status = e.target.value)}
                    disabled={modal.type === "view"}
                  >
                    {Object.keys(statusColors).map((s) => (
                      <option value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div class="field">
                  <label>Date</label>
                  <input
                    type="date"
                    value={modal.report?.date || ""}
                    onInput={(e) => modal.report && (modal.report.date = e.target.value)}
                    disabled={modal.type === "view"}
                  />
                </div>
                <div class="field">
                  <label>Remarks</label>
                  <textarea
                    value={modal.report?.remarks || ""}
                    onInput={(e) => modal.report && (modal.report.remarks = e.target.value)}
                    disabled={modal.type === "view"}
                  />
                </div>
              </div>
            </div>
            <div class="actions">
              {modal.type !== "view" && (
                <button
                  class="ui green button"
                  onClick={() => saveReport(modal.report)}
                >
                  Save
                </button>
              )}
              <button class="ui grey button" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}