import { useState } from "preact/hooks";

const samplePatients = [
  {
    id: "PT-001",
    ward: "WD12",
    bed: "5",
    name: "Jane Doe",
    diagnosis: "Malaria",
    medication: "Artemisinin",
    status: "Stable",
    vitals: { temp: "37°C", bp: "120/80", pulse: 80 },
    labReports: [],
  },
  {
    id: "PT-002",
    ward: "WD12",
    bed: "6",
    name: "John Smith",
    diagnosis: "Typhoid",
    medication: "Ciprofloxacin",
    status: "Stable",
    vitals: { temp: "38°C", bp: "118/75", pulse: 85 },
    labReports: [],
  },
];

export default function Patient() {
  const [patients, setPatients] = useState(samplePatients);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  const openDialog = (patient) => {
    setCurrentPatient(patient);
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);

  const handleVitalsChange = (e) => {
    const { name, value } = e.currentTarget;
    setCurrentPatient({
      ...currentPatient,
      vitals: { ...currentPatient.vitals, [name]: value },
    });
  };

  const saveVitals = () => {
    setPatients(
      patients.map((p) => (p.id === currentPatient.id ? currentPatient : p))
    );
    closeDialog();
  };

  const addLabReport = () => {
    const report = prompt("Enter lab report:");
    if (report) {
      setCurrentPatient({
        ...currentPatient,
        labReports: [...currentPatient.labReports, report],
      });
      setPatients(
        patients.map((p) =>
          p.id === currentPatient.id
            ? { ...currentPatient, labReports: [...currentPatient.labReports, report] }
            : p
        )
      );
    }
  };

  return (
    <div>
      <div className="card p-2 bg-light">
        <h3 className="ui header blue">Ward Overview</h3>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Ward</th>
              <th>Bed</th>
              <th>Patient</th>
              <th>Diagnosis</th>
              <th>Medication</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.ward}</td>
                <td>{p.bed}</td>
                <td>{p.name}</td>
                <td>{p.diagnosis}</td>
                <td>
                  <button className={`ui tiny ${p.medication ? "green" : "blue"} button`}>
                    {p.medication ? "Given" : "Give"}
                  </button>
                </td>
                <td>{p.status}</td>
                <td>
                  <button
                    className="ui tiny button"
                    onClick={() => openDialog(p)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full-screen dialog */}
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
              <label>Ward</label>
              <input type="text" value={currentPatient.ward} disabled />
            </div>
            <div className="field">
              <label>Bed</label>
              <input type="text" value={currentPatient.bed} disabled />
            </div>
            <div className="field">
              <label>Diagnosis</label>
              <input type="text" value={currentPatient.diagnosis} disabled />
            </div>
            <div className="field">
              <label>Status</label>
              <input type="text" value={currentPatient.status} disabled />
            </div>

            <h4 className="ui header">Vitals (Editable)</h4>
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
            <button
              className="ui blue button"
              style={{ marginLeft: "0.5em" }}
              onClick={addLabReport}
            >
              Add Lab Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}