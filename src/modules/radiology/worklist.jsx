import { h } from "preact";
import { useState } from "preact/hooks";

const mockStudies = [
  { id: "RAD-001", patient: "John Doe", modality: "CT", priority: "STAT" },
  { id: "RAD-002", patient: "Jane Smith", modality: "MRI", priority: "Routine" },
  { id: "RAD-003", patient: "Mary Johnson", modality: "X-ray", priority: "Routine" },
  { id: "RAD-004", patient: "Paul Lee", modality: "Ultrasound", priority: "STAT" },
];

export default function Worklist() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modal, setModal] = useState({ visible: false, study: null });
  const [filterModality, setFilterModality] = useState("");

  // Filter studies based on search + modality
  const filteredStudies = mockStudies.filter((s) => {
    const matchesSearch = !search || s.patient.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchesModality = !filterModality || s.modality === filterModality;
    return matchesSearch && matchesModality;
  });

  // Update search suggestions
  const handleSearch = (value) => {
    setSearch(value);
    if (!value) {
      setSuggestions([]);
      return;
    }
    const matched = mockStudies
      .filter((s) => s.patient.toLowerCase().includes(value.toLowerCase()))
      .map((s) => s.patient);
    setSuggestions([...new Set(matched)]);
  };

  const openModal = (study) => setModal({ visible: true, study });
  const closeModal = () => setModal({ visible: false, study: null });

  return (
    <div class="ui container my-4">
      {/* Search and Filters */}
      <form class="ui form mb-3">
        <div class="fields">
          <div class="field" style={{ position: "relative" }}>
            <input
              placeholder="Search patient or study ID..."
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
            <select class="ui dropdown" value={filterModality} onChange={(e) => setFilterModality(e.target.value)}>
              <option value="">All Modalities</option>
              {[...new Set(mockStudies.map((s) => s.modality))].map((m) => (
                <option value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Worklist Table */}
      <table class="ui celled selectable table">
        <thead>
          <tr>
            <th>Priority</th>
            <th>Study ID</th>
            <th>Patient</th>
            <th>Modality</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudies.length > 0 ? (
            filteredStudies.map((s) => (
              <tr key={s.id}>
                <td>
                  <div class={`ui ${s.priority === "STAT" ? "red" : "green"} label`}>{s.priority}</div>
                </td>
                <td>{s.id}</td>
                <td>{s.patient}</td>
                <td>{s.modality}</td>
                <td>
                  <button class="ui primary button" onClick={() => openModal(s)}>
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} class="text-center">
                No studies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modal.visible && modal.study && (
        <div
          class="ui dimmer modals page active"
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={closeModal}
        >
          <div class="ui modal active" style={{ display: "block", width: "400px" }} onClick={(e) => e.stopPropagation()}>
            <div class="header">Study Details</div>
            <div class="content">
              <div class="ui segment">
                <p>
                  <strong>Study ID:</strong> {modal.study.id}
                </p>
                <p>
                  <strong>Patient:</strong> {modal.study.patient}
                </p>
                <p>
                  <strong>Modality:</strong> {modal.study.modality}
                </p>
                <p>
                  <strong>Priority:</strong> {modal.study.priority}
                </p>
              </div>
            </div>
            <div class="actions">
              <button class="ui grey button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}