import { useState } from "preact/hooks";

// Sample vitals data
const initialVitals = [
  {
    id: "VTL-001",
    patientName: "John Doe",
    MRN: "MRN-004567",
    department: "IPD",
    date: "2026-02-24 08:00",
    BP: "120/80",
    HR: 76,
    Temp: 36.8,
    Respiration: 18,
    SpO2: 98,
    Weight: 70,
  },
  {
    id: "VTL-002",
    patientName: "Jane Smith",
    MRN: "MRN-004568",
    department: "Maternity",
    date: "2026-02-24 08:15",
    BP: "110/70",
    HR: 82,
    Temp: 37.2,
    Respiration: 20,
    SpO2: 97,
    Weight: 65,
  },
];

export default function Vitalss({ nurseName }) {
  const [vitals, setVitals] = useState(initialVitals);
  const [filters, setFilters] = useState({ search: "", department: "" });
  const [newVital, setNewVital] = useState({
    patientName: "",
    MRN: "",
    department: "",
    BP: "",
    HR: "",
    Temp: "",
    Respiration: "",
    SpO2: "",
    Weight: "",
  });

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentVital, setCurrentVital] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.currentTarget;
    setFilters({ ...filters, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setNewVital({ ...newVital, [name]: value });
  };

  const handleAddVitals = (e) => {
    e.preventDefault();
    if (!newVital.patientName || !newVital.MRN || !newVital.BP) {
      alert("Please fill in patient name, MRN, and BP at minimum");
      return;
    }

    const vitalRecord = {
      id: `VTL-${vitals.length + 1}`.padStart(6, "0"),
      ...newVital,
      date: new Date().toLocaleString(),
    };

    setVitals([vitalRecord, ...vitals]);
    setNewVital({
      patientName: "",
      MRN: "",
      department: "",
      BP: "",
      HR: "",
      Temp: "",
      Respiration: "",
      SpO2: "",
      Weight: "",
    });
  };

  const openDialog = (vital) => {
    setCurrentVital(vital);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentVital(null);
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.currentTarget;
    setCurrentVital({ ...currentVital, [name]: value });
  };

  const saveVitals = () => {
    setVitals(vitals.map((v) => (v.id === currentVital.id ? currentVital : v)));
    closeDialog();
  };

  const filteredVitals = vitals.filter((v) => {
    return (
      (filters.search === "" ||
        v.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        v.MRN.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.department === "" || v.department === filters.department)
    );
  });

  const highlightAbnormal = (field, value) => {
    if (field === "BP") {
      const [systolic, diastolic] = value.split("/").map(Number);
      if (systolic > 140 || diastolic > 90) return "red";
    }
    if (field === "HR" && (value < 60 || value > 100)) return "red";
    if (field === "Temp" && value > 37.5) return "red";
    if (field === "SpO2" && value < 95) return "red";
    return "";
  };

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Vitals Monitoring - Nurse {nurseName}</h3>

      {/* Filters */}
      <form className="ui form">
        <div className="two fields">
          <div className="field">
            <input
              type="text"
              name="search"
              placeholder="Search Patient / MRN"
              value={filters.search}
              onInput={handleFilterChange}
            />
          </div>
          <div className="field">
            <select
              className="ui dropdown"
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All Departments</option>
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
              <option value="Maternity">Maternity</option>
              <option value="Dental">Dental</option>
            </select>
          </div>
        </div>
      </form>

      <div className="ui divider"></div>

      {/* Add Vitals Form */}
      <form className="ui form" onSubmit={handleAddVitals}>
        <h4 className="ui header">Add / Update Vitals</h4>
        <div className="three fields">
          <div className="field">
            <input
              type="text"
              name="patientName"
              value={newVital.patientName}
              onInput={handleInputChange}
              placeholder="Patient Name"
            />
          </div>
          <div className="field">
            <input
              type="text"
              name="MRN"
              value={newVital.MRN}
              onInput={handleInputChange}
              placeholder="MRN"
            />
          </div>
          <div className="field">
            <select
              className="ui dropdown"
              name="department"
              value={newVital.department}
              onChange={handleInputChange}
            >
              <option value="">Department</option>
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
              <option value="Maternity">Maternity</option>
              <option value="Dental">Dental</option>
            </select>
          </div>
        </div>

        <div className="six fields">
          <div className="field">
            <input
              type="text"
              name="BP"
              value={newVital.BP}
              onInput={handleInputChange}
              placeholder="BP (e.g., 120/80)"
            />
          </div>
          <div className="field">
            <input
              type="number"
              name="HR"
              value={newVital.HR}
              onInput={handleInputChange}
              placeholder="HR"
            />
          </div>
          <div className="field">
            <input
              type="number"
              name="Temp"
              value={newVital.Temp}
              onInput={handleInputChange}
              placeholder="Temp (°C)"
              step="0.1"
            />
          </div>
          <div className="field">
            <input
              type="number"
              name="Respiration"
              value={newVital.Respiration}
              onInput={handleInputChange}
              placeholder="Respiration"
            />
          </div>
          <div className="field">
            <input
              type="number"
              name="SpO2"
              value={newVital.SpO2}
              onInput={handleInputChange}
              placeholder="SpO₂ (%)"
            />
          </div>
          <div className="field">
            <input
              type="number"
              name="Weight"
              value={newVital.Weight}
              onInput={handleInputChange}
              placeholder="Weight (kg)"
            />
          </div>
        </div>

        <button className="ui green button" type="submit">
          Add / Update Vitals
        </button>
      </form>

      <div className="ui divider"></div>

      {/* Vitals Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>Date / Time</th>
            <th>Patient Name</th>
            <th>MRN</th>
            <th>Department</th>
            <th>BP</th>
            <th>HR</th>
            <th>Temp</th>
            <th>Respiration</th>
            <th>SpO₂</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVitals.length > 0 ? (
            filteredVitals.map((v) => (
              <tr key={v.id}>
                <td>{v.date}</td>
                <td>{v.patientName}</td>
                <td>{v.MRN}</td>
                <td>{v.department}</td>
                <td className={highlightAbnormal("BP", v.BP)}>{v.BP}</td>
                <td className={highlightAbnormal("HR", v.HR)}>{v.HR}</td>
                <td className={highlightAbnormal("Temp", v.Temp)}>{v.Temp}</td>
                <td>{v.Respiration}</td>
                <td className={highlightAbnormal("SpO2", v.SpO2)}>{v.SpO2}</td>
                <td>{v.Weight}</td>
                <td>
                  <div className="ui buttons">
                    <button
                      className="ui blue mini button"
                      onClick={() => openDialog(v)}
                    >
                      View / Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="center aligned">
                No vitals recorded
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Full-screen Vitals Dialog */}
      {dialogOpen && currentVital && (
        <div
          className="ui fullscreen modal active"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "white",
            padding: "2em",
            overflowY: "auto",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className="ui header">Vitals - {currentVital.patientName}</h2>
          <div className="ui form">
            <div className="field">
              <label>Patient Name</label>
              <input type="text" value={currentVital.patientName} disabled />
            </div>
            <div className="field">
              <label>MRN</label>
              <input type="text" value={currentVital.MRN} disabled />
            </div>
            <div className="field">
              <label>Department</label>
              <input type="text" value={currentVital.department} disabled />
            </div>

            <h4 className="ui header">Vitals (Editable by Nurse)</h4>
            <div className="two fields">
              <div className="field">
                <label>BP</label>
                <input
                  type="text"
                  name="BP"
                  value={currentVital.BP}
                  onInput={handleDialogChange}
                />
              </div>
              <div className="field">
                <label>HR</label>
                <input
                  type="number"
                  name="HR"
                  value={currentVital.HR}
                  onInput={handleDialogChange}
                />
              </div>
            </div>
            <div className="three fields">
              <div className="field">
                <label>Temp</label>
                <input
                  type="number"
                  step="0.1"
                  name="Temp"
                  value={currentVital.Temp}
                  onInput={handleDialogChange}
                />
              </div>
              <div className="field">
                <label>Respiration</label>
                <input
                  type="number"
                  name="Respiration"
                  value={currentVital.Respiration}
                  onInput={handleDialogChange}
                />
              </div>
              <div className="field">
                <label>SpO₂</label>
                <input
                  type="number"
                  name="SpO2"
                  value={currentVital.SpO2}
                  onInput={handleDialogChange}
                />
              </div>
            </div>
            <div className="field">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="Weight"
                value={currentVital.Weight}
                onInput={handleDialogChange}
              />
            </div>
          </div>

          <div style={{ marginTop: "1em" }}>
            <button className="ui button" onClick={closeDialog}>
              Close
            </button>
            <button
              className="ui green button"
              style={{ marginLeft: "0.5em" }}
              onClick={saveVitals}
            >
              Save Vitals
            </button>
          </div>
        </div>
      )}
    </div>
  );
}