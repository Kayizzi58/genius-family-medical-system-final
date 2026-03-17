import { useState } from "preact/hooks";

const patientsDB = [
  { id: 1, name: "John Doe", MRN: "MRN-004567", age: 34, gender: "M" },
  { id: 2, name: "Jane Smith", MRN: "MRN-004568", age: 28, gender: "F" },
  { id: 3, name: "Michael Brown", MRN: "MRN-004569", age: 41, gender: "M" }
];

const initialConsultations = [];

function Consult() {
  const [consultations, setConsultations] = useState(initialConsultations);

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
    triage: "",
    doctor: "",
    payment: ""
  });

  const [showAddModal, setShowAddModal] = useState(false);

  const [newConsult, setNewConsult] = useState({
    patient: null,
    chiefComplaint: "",
    department: "OPD",
    visitType: "OPD",
    triageLevel: "Low",
    assignedDoctor: "",
    paymentStatus: "Pending",
    scheduledTime: "",
    notes: ""
  });

  const [patientSearch, setPatientSearch] = useState("");

  /* ---------------- FILTERING ---------------- */

  const filteredData = consultations.filter(c =>
    (filters.search === "" ||
      c.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      c.MRN.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.department === "" || c.department === filters.department) &&
    (filters.status === "" || c.status === filters.status) &&
    (filters.triage === "" || c.triageLevel === filters.triage) &&
    (filters.doctor === "" || c.assignedDoctor === filters.doctor) &&
    (filters.payment === "" || c.paymentStatus === filters.payment)
  );

  /* ---------------- CREATE CONSULT ---------------- */

  const addConsultation = () => {
    if (!newConsult.patient) return alert("Select patient");

    const newRecord = {
      id: "CONS-" + Date.now(),
      patientName: newConsult.patient.name,
      MRN: newConsult.patient.MRN,
      age: newConsult.patient.age,
      gender: newConsult.patient.gender,
      department: newConsult.department,
      visitType: newConsult.visitType,
      triageLevel: newConsult.triageLevel,
      status: "Waiting",
      assignedDoctor: newConsult.assignedDoctor,
      paymentStatus: newConsult.paymentStatus,
      createdAt: newConsult.scheduledTime,
      chiefComplaint: newConsult.chiefComplaint
    };

    setConsultations([...consultations, newRecord]);
    setShowAddModal(false);
  };

  const suggestedPatients = patientsDB.filter(p =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase())
  );

  return (
    <div className="ui fluid container">

      {/* HEADER */}
      <div className="ui clearing segment">
        <h3 className="ui left floated header">
          <i className="stethoscope icon"></i>
          Consultation Management
        </h3>

        <button
          className="ui right floated primary button"
          onClick={() => setShowAddModal(true)}
        >
          <i className="plus icon"></i>
          New Consultation
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="ui segment">
        <div className="ui stackable grid">

          <div className="four wide column">
            <input
              className="ui fluid input"
              placeholder="Search Patient / MRN"
              value={filters.search}
              onInput={e =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>

          <div className="three wide column">
            <select className="ui fluid dropdown"
              onChange={e =>
                setFilters({ ...filters, department: e.target.value })
              }>
              <option value="">All Departments</option>
              <option>OPD</option>
              <option>IPD</option>
            </select>
          </div>

          <div className="three wide column">
            <select className="ui fluid dropdown"
              onChange={e =>
                setFilters({ ...filters, status: e.target.value })
              }>
              <option value="">All Status</option>
              <option>Waiting</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="three wide column">
            <select className="ui fluid dropdown"
              onChange={e =>
                setFilters({ ...filters, triage: e.target.value })
              }>
              <option value="">All Triage</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="three wide column">
            <button
              className="ui fluid grey button"
              onClick={() =>
                setFilters({
                  search: "",
                  department: "",
                  status: "",
                  triage: "",
                  doctor: "",
                  payment: ""
                })
              }
            >
              Clear Filters
            </button>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <table className="ui celled striped table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Dept</th>
            <th>Status</th>
            <th>Doctor</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.patientName}</td>
              <td>{c.department}</td>
              <td>{c.status}</td>
              <td>{c.assignedDoctor}</td>
              <td>{c.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD CONSULT MODAL */}
      {/* ADD CONSULT MODAL */}
{showAddModal && (
  <div className="ui active modal small">
    <div className="header">
      <i className="plus circle icon"></i>
      New Consultation
    </div>

    <div className="content">
      <div className="ui form">

        {/* SMART PATIENT SEARCH */}
        <div className="field">
          <label>Search Patient (Name or Personal Number)</label>
          <div className="ui icon input fluid">
            <input
              type="text"
              placeholder="Type name or personal number..."
              value={patientSearch}
              onInput={(e) => setPatientSearch(e.target.value)}
            />
            <i className="search icon"></i>
          </div>

          {patientSearch && (
            <div className="ui segment" style={{ maxHeight: "150px", overflowY: "auto" }}>
              {patientsDB
                .filter(p =>
                  p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
                  p.MRN.toLowerCase().includes(patientSearch.toLowerCase())
                )
                .map(p => (
                  <div
                    key={p.id}
                    className="ui item"
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee"
                    }}
                    onClick={() => {
                      setNewConsult({ ...newConsult, patient: p });
                      setPatientSearch(`${p.name} • ${p.MRN}`);
                    }}
                  >
                    <strong>{p.name}</strong>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {p.MRN} • {p.age}yrs • {p.gender}
                    </div>
                  </div>
                ))}

              {patientsDB.filter(p =>
                p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
                p.MRN.toLowerCase().includes(patientSearch.toLowerCase())
              ).length === 0 && (
                <div style={{ padding: "8px", color: "#999" }}>
                  No matching patients found
                </div>
              )}
            </div>
          )}
        </div>

        {/* REASON FIELD */}
        <div className="field">
          <label>Reason for Consultation</label>
          <textarea
            rows="4"
            placeholder="Enter reason / chief complaint..."
            value={newConsult.chiefComplaint}
            onInput={(e) =>
              setNewConsult({
                ...newConsult,
                chiefComplaint: e.target.value
              })
            }
          />
        </div>

      </div>
    </div>

    <div className="actions">
      <button
        className="ui button"
        onClick={() => {
          setShowAddModal(false);
          setPatientSearch("");
        }}
      >
        Cancel
      </button>

      <button
        className="ui primary button"
        onClick={addConsultation}
        disabled={!newConsult.patient || !newConsult.chiefComplaint}
      >
        <i className="check icon"></i>
        Create Consultation
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default Consult;