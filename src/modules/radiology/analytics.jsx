import { h } from "preact";
import { useState } from "preact/hooks";

const initialAnalytics = [
  { id: "RA-001", patient: "John Doe", modality: "CT", study: "CT Brain", findings: "Normal", status: "Reviewed", date: "2026-02-24" },
  { id: "RA-002", patient: "Jane Smith", modality: "MRI", study: "MRI Spine", findings: "Disc protrusion", status: "Draft", date: "2026-02-23" },
  { id: "RA-003", patient: "Mary Johnson", modality: "X-ray", study: "Chest X-ray", findings: "Mild infiltrates", status: "Reviewed", date: "2026-02-22" },
];

const statusColors = {
  Draft: "grey",
  Reviewed: "green",
  Pending: "yellow",
};

export default function Radiologyanalytics() {
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterModality, setFilterModality] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modal, setModal] = useState({ visible: false, record: null });

  // Filtered records
  const filteredRecords = analytics.filter((r) => {
    const matchesSearch =
      !search ||
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.study.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || r.status === filterStatus;
    const matchesModality = !filterModality || r.modality === filterModality;
    return matchesSearch && matchesStatus && matchesModality;
  });

  const handleSearch = (value) => {
    setSearch(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const matched = analytics
      .filter((r) => r.patient.toLowerCase().includes(value.toLowerCase()))
      .map((r) => r.patient);
    setSuggestions([...new Set(matched)]);
  };

  const openModal = (record) => setModal({ visible: true, record });
  const closeModal = () => setModal({ visible: false, record: null });

  const exportCSV = () => {
    const header = "ID,Patient,Modality,Study,Findings,Status,Date\n";
    const rows = analytics.map(r => `${r.id},${r.patient},${r.modality},${r.study},${r.findings},${r.status},${r.date}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + header + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "radiology_analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div class="ui container my-4">
      <div class="d-flex justify-content-between mb-3">
        <h3 class="ui header blue"><i class="chart line icon"></i> Radiology Analytics</h3>
        <button class="ui tiny green button" onClick={exportCSV}>
          <i class="download icon"></i> Export CSV
        </button>
      </div>

      {/* Filters & Search */}
      <div class="ui stackable grid mb-3">
        <div class="five wide column" style={{ position: "relative" }}>
          <input
            placeholder="Search patient or study..."
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

        <div class="three wide column">
          <select class="ui dropdown" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map((s) => (
              <option value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div class="three wide column">
          <select class="ui dropdown" value={filterModality} onChange={(e) => setFilterModality(e.target.value)}>
            <option value="">All Modalities</option>
            <option value="CT">CT</option>
            <option value="MRI">MRI</option>
            <option value="X-ray">X-ray</option>
            <option value="Ultrasound">Ultrasound</option>
          </select>
        </div>

        <div class="five wide column">
          <button class="ui grey button fluid" onClick={() => { setSearch(""); setFilterStatus(""); setFilterModality(""); setSuggestions([]); }}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Analytics Table */}
      <table class="ui celled selectable table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Modality</th>
            <th>Study</th>
            <th>Findings</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? filteredRecords.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.patient}</td>
              <td>{r.modality}</td>
              <td>{r.study}</td>
              <td>{r.findings}</td>
              <td>
                <div class={`ui ${statusColors[r.status]} label`}>{r.status}</div>
              </td>
              <td>{r.date}</td>
              <td>
                <button class="ui tiny blue button" onClick={() => openModal(r)}>
                  <i class="eye icon"></i> View
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={8} class="text-center">No records found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modal.visible && (
        <div
          class="ui dimmer modals page active"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setModal({ visible: false, record: null })}
        >
          <div class="ui modal active" style={{ display: "block", width: "450px" }} onClick={(e) => e.stopPropagation()}>
            <div class="header">Radiology Analytics - {modal.record?.id}</div>
            <div class="content">
              <div class="ui form">
                <div class="field"><label>Patient</label><input type="text" value={modal.record?.patient} disabled /></div>
                <div class="field"><label>Modality</label><input type="text" value={modal.record?.modality} disabled /></div>
                <div class="field"><label>Study</label><input type="text" value={modal.record?.study} disabled /></div>
                <div class="field"><label>Findings</label><textarea value={modal.record?.findings} disabled></textarea></div>
                <div class="field"><label>Status</label><input type="text" value={modal.record?.status} disabled /></div>
                <div class="field"><label>Date</label><input type="text" value={modal.record?.date} disabled /></div>
              </div>
            </div>
            <div class="actions">
              <button class="ui grey button" onClick={() => setModal({ visible: false, record: null })}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}