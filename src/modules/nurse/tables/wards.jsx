import { useState } from "preact/hooks";

// Sample wards and patients
const initialWards = [
  {
    id: "WD-01",
    name: "IPD Ward A",
    floor: 1,
    totalBeds: 10,
    patients: [
      {
        id: "PT-001",
        name: "John Doe",
        MRN: "MRN-004567",
        room: "101A",
        condition: "Stable",
        alerts: "None",
        vitals: { temp: "36.8°C", bp: "120/80", pulse: 78 },
        labReports: [],
      },
      {
        id: "PT-002",
        name: "Jane Smith",
        MRN: "MRN-004568",
        room: "102A",
        condition: "Critical",
        alerts: "Allergy: Penicillin",
        vitals: { temp: "39°C", bp: "110/70", pulse: 95 },
        labReports: [],
      },
    ],
  },
  {
    id: "WD-02",
    name: "Maternity Ward B",
    floor: 2,
    totalBeds: 8,
    patients: [
      {
        id: "PT-003",
        name: "Mary Johnson",
        MRN: "MRN-004569",
        room: "201B",
        condition: "Stable",
        alerts: "None",
        vitals: { temp: "37°C", bp: "118/76", pulse: 82 },
        labReports: [],
      },
    ],
  },
];

export default function Wardd({ nurseName }) {
  const [wards, setWards] = useState(initialWards);
  const [selectedWardId, setSelectedWardId] = useState(wards[0].id);

  const [patientFilters, setPatientFilters] = useState({
    search: "",
    condition: "",
    alerts: "",
  });

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  const selectedWard = wards.find((w) => w.id === selectedWardId);

  const handlePatientFilterChange = (e) => {
    const { name, value } = e.currentTarget;
    setPatientFilters({ ...patientFilters, [name]: value });
  };

  const openDialog = (patient) => {
    setCurrentPatient(patient);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentPatient(null);
  };

  const handleVitalsChange = (e) => {
    const { name, value } = e.currentTarget;
    setCurrentPatient({
      ...currentPatient,
      vitals: { ...currentPatient.vitals, [name]: value },
    });
  };

  const saveVitals = () => {
    setWards(
      wards.map((w) =>
        w.id === selectedWardId
          ? {
              ...w,
              patients: w.patients.map((p) =>
                p.id === currentPatient.id ? currentPatient : p
              ),
            }
          : w
      )
    );
    closeDialog();
  };

  const addLabReport = () => {
    const report = prompt("Enter lab report:");
    if (report) {
      const updatedPatient = {
        ...currentPatient,
        labReports: [...currentPatient.labReports, report],
      };
      setCurrentPatient(updatedPatient);
      setWards(
        wards.map((w) =>
          w.id === selectedWardId
            ? {
                ...w,
                patients: w.patients.map((p) =>
                  p.id === currentPatient.id ? updatedPatient : p
                ),
              }
            : w
        )
      );
    }
  };

  const dischargePatient = (patientId) => {
    if (confirm("Discharge patient from this ward?")) {
      setWards(
        wards.map((ward) =>
          ward.id === selectedWardId
            ? {
                ...ward,
                patients: ward.patients.filter((p) => p.id !== patientId),
              }
            : ward
        )
      );
    }
  };

  const filteredPatients = selectedWard.patients.filter((p) => {
    return (
      (patientFilters.search === "" ||
        p.name.toLowerCase().includes(patientFilters.search.toLowerCase()) ||
        p.MRN.toLowerCase().includes(patientFilters.search.toLowerCase())) &&
      (patientFilters.condition === "" || p.condition === patientFilters.condition) &&
      (patientFilters.alerts === "" || p.alerts.includes(patientFilters.alerts))
    );
  });

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Ward Management - Nurse {nurseName}</h3>

      {/* Ward selector */}
      <div className="field">
        <label>Select Ward:</label>
        <select
          className="ui dropdown"
          value={selectedWardId}
          onChange={(e) => setSelectedWardId(e.currentTarget.value)}
        >
          {wards.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name} - Floor {w.floor} ({w.patients.length}/{w.totalBeds} beds occupied)
            </option>
          ))}
        </select>
      </div>

      {/* Ward Summary */}
      <div className="ui segment">
        <h4 className="ui header">Ward Summary</h4>
        <p>
          Total Beds: {selectedWard.totalBeds} | Occupied: {selectedWard.patients.length} | Free Beds:{" "}
          {selectedWard.totalBeds - selectedWard.patients.length}
        </p>
      </div>

      {/* Patient Filters */}
      <form className="ui form">
        <div className="three fields">
          <div className="field">
            <input
              type="text"
              name="search"
              placeholder="Search Patient / MRN"
              value={patientFilters.search}
              onInput={handlePatientFilterChange}
            />
          </div>
          <div className="field">
            <select
              className="ui dropdown"
              name="condition"
              value={patientFilters.condition}
              onChange={handlePatientFilterChange}
            >
              <option value="">All Conditions</option>
              <option value="Stable">Stable</option>
              <option value="Critical">Critical</option>
              <option value="Under observation">Under observation</option>
            </select>
          </div>
          <div className="field">
            <input
              type="text"
              name="alerts"
              placeholder="Filter by alerts"
              value={patientFilters.alerts}
              onInput={handlePatientFilterChange}
            />
          </div>
        </div>
      </form>

      <div className="ui divider"></div>

      {/* Patients Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>MRN</th>
            <th>Name</th>
            <th>Room / Bed</th>
            <th>Condition</th>
            <th>Alerts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => (
              <tr key={p.id}>
                <td>{p.MRN}</td>
                <td>{p.name}</td>
                <td>{p.room}</td>
                <td>{p.condition}</td>
                <td>{p.alerts}</td>
                <td>
                  <div className="ui buttons">
                    <button className="ui blue mini button" onClick={() => openDialog(p)}>View</button>
                    <button className="ui orange mini button" onClick={() => openDialog(p)}>Update</button>
                    <button className="ui red mini button" onClick={() => dischargePatient(p.id)}>Discharge</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="center aligned">
                No patients in this ward
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Full-screen Patient Dialog */}
      {dialogOpen && currentPatient && (
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
          <h2 className="ui header">Patient Info - {currentPatient.name}</h2>
          <div className="ui form">
            <div className="field">
              <label>MRN</label>
              <input type="text" value={currentPatient.MRN} disabled />
            </div>
            <div className="field">
              <label>Name</label>
              <input type="text" value={currentPatient.name} disabled />
            </div>
            <div className="field">
              <label>Room / Bed</label>
              <input type="text" value={currentPatient.room} disabled />
            </div>
            <div className="field">
              <label>Condition</label>
              <input type="text" value={currentPatient.condition} disabled />
            </div>
            <div className="field">
              <label>Alerts</label>
              <input type="text" value={currentPatient.alerts} disabled />
            </div>

            <h4 className="ui header">Vitals (Editable by Nurse)</h4>
            <div className="two fields">
              <div className="field">
                <label>Temperature</label>
                <input
                  type="text"
                  name="temp"
                  value={currentPatient.vitals.temp}
                  onInput={handleVitalsChange}
                />
              </div>
              <div className="field">
                <label>Blood Pressure</label>
                <input
                  type="text"
                  name="bp"
                  value={currentPatient.vitals.bp}
                  onInput={handleVitalsChange}
                />
              </div>
            </div>
            <div className="field">
              <label>Pulse</label>
              <input
                type="number"
                name="pulse"
                value={currentPatient.vitals.pulse}
                onInput={handleVitalsChange}
              />
            </div>

            <h4 className="ui header">Lab Reports</h4>
            <ul>
              {currentPatient.labReports.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "1em" }}>
            <button className="ui button" onClick={closeDialog}>Close</button>
            <button className="ui green button" style={{ marginLeft: "0.5em" }} onClick={saveVitals}>
              Save Vitals
            </button>
            <button className="ui blue button" style={{ marginLeft: "0.5em" }} onClick={addLabReport}>
              Add Lab Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}