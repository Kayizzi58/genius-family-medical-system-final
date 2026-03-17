import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialOPDPatients = [
  { id: 1, patient: "Jane Doe", age: 28, gender: "Female", contact: "555-1234", doctor: "Dr. Smith", department: "Dental", visitDate: "2026-02-24", status: "Checked-In" },
  { id: 2, patient: "John Smith", age: 35, gender: "Male", contact: "555-5678", doctor: "Dr. Adams", department: "General Medicine", visitDate: "2026-02-24", status: "Waiting" },
  { id: 3, patient: "Mary Johnson", age: 42, gender: "Female", contact: "555-8765", doctor: "Dr. Lee", department: "ENT", visitDate: "2026-02-23", status: "Completed" }
];

const statusColor = {
  "Checked-In": "yellow",
  "Waiting": "orange",
  "Completed": "green",
  "Cancelled": "red"
};

export default function Opdpatients() {
  const [patients, setPatients] = useState(initialOPDPatients);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');

  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const [patientForm, setPatientForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contact: "",
    doctor: "",
    department: "",
    visitDate: new Date().toISOString().slice(0, 10),
    status: "Checked-In",
    id: `P${Date.now()}`
  });

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.patient.toLowerCase().includes(search.toLowerCase()) || p.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || p.status === filterStatus;
    const matchesDoctor = !filterDoctor || p.doctor === filterDoctor;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const markCompleted = (id) => setPatients(prev => prev.map(p => p.id === id ? { ...p, status: "Completed" } : p));
  const cancelVisit = (id) => setPatients(prev => prev.map(p => p.id === id ? { ...p, status: "Cancelled" } : p));

  const savePatient = () => {
    if (!patientForm.firstName || !patientForm.lastName) return;
    setPatients(prev => [...prev, { ...patientForm, patient: `${patientForm.firstName} ${patientForm.lastName}` }]);
    setNewPatientOpen(false);
    setPatientForm({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      contact: "",
      doctor: "",
      department: "",
      visitDate: new Date().toISOString().slice(0, 10),
      status: "Checked-In",
      id: `P${Date.now()}`
    });
  };

  return (
    <div className="ui container fluid my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal"><i className="users icon"></i> OPD Registered Patients</h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input type="text" placeholder="Search patient or department..." value={search} onInput={e => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="five wide column">
            <select className="ui fluid dropdown" value={filterDoctor} onChange={e => setFilterDoctor(e.target.value)}>
              <option value="">All Doctors</option>
              <option>Dr. Smith</option>
              <option>Dr. Adams</option>
              <option>Dr. Lee</option>
            </select>
          </div>
          <div className="five wide column">
            <select className="ui fluid dropdown" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option>Waiting</option>
              <option>Checked-In</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Patients Table */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Patient</th><th>Age</th><th>Gender</th><th>Contact</th><th>Doctor</th><th>Department</th><th>Visit Date</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(p => (
              <tr key={p.id}>
                <td>{p.patient}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.contact}</td>
                <td>{p.doctor}</td>
                <td>{p.department}</td>
                <td>{p.visitDate}</td>
                <td><div className={`ui ${statusColor[p.status]} label`}>{p.status}</div></td>
                <td>
                  {p.status !== "Completed" && <button className="ui tiny green button mr-1" onClick={() => markCompleted(p.id)}><i className="check icon"></i> Complete</button>}
                  {p.status !== "Cancelled" && <button className="ui tiny red button" onClick={() => cancelVisit(p.id)}><i className="close icon"></i> Cancel</button>}
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && <tr><td colSpan="9" className="text-center">No patients found.</td></tr>}
          </tbody>
        </table>

        {/* Add Patient Button */}
        <div className="mt-3">
          <button className="ui blue button" onClick={() => setNewPatientOpen(true)}><i className="add icon"></i> Register New Patient</button>
        </div>
      </div>

      {/* Full-Screen Patient Dialog */}
      {newPatientOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "#fff", zIndex: 3000, overflowY: "auto", padding: "30px"
        }}>
          <div className="ui clearing segment">
            <h2 className="ui left floated header">Register New Patient</h2>
            <button className="ui right floated red button" onClick={() => setNewPatientOpen(false)}>Close</button>
          </div>

          <div className="ui form">
            <div className="two fields">
              <div className="field">
                <label>First Name</label>
                <input value={patientForm.firstName} onInput={e => setPatientForm({ ...patientForm, firstName: e.target.value })} />
              </div>
              <div className="field">
                <label>Last Name</label>
                <input value={patientForm.lastName} onInput={e => setPatientForm({ ...patientForm, lastName: e.target.value })} />
              </div>
            </div>

            <div className="three fields">
              <div className="field">
                <label>Age</label>
                <input type="number" value={patientForm.age} onInput={e => setPatientForm({ ...patientForm, age: e.target.value })} />
              </div>
              <div className="field">
                <label>Gender</label>
                <select value={patientForm.gender} onChange={e => setPatientForm({ ...patientForm, gender: e.target.value })}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field">
                <label>Contact</label>
                <input value={patientForm.contact} onInput={e => setPatientForm({ ...patientForm, contact: e.target.value })} />
              </div>
            </div>

            <div className="two fields">
              <div className="field">
                <label>Doctor</label>
                <input value={patientForm.doctor} onInput={e => setPatientForm({ ...patientForm, doctor: e.target.value })} />
              </div>
              <div className="field">
                <label>Department</label>
                <input value={patientForm.department} onInput={e => setPatientForm({ ...patientForm, department: e.target.value })} />
              </div>
            </div>

            <div className="field">
              <label>Visit Date</label>
              <input type="date" value={patientForm.visitDate} onInput={e => setPatientForm({ ...patientForm, visitDate: e.target.value })} />
            </div>

            <div className="field">
              <label>Patient ID</label>
              <input value={patientForm.id} disabled />
            </div>

            <div style={{ marginTop: "20px" }}>
              <button className="ui black button" onClick={() => setNewPatientOpen(false)}>Cancel</button>
              <button className="ui positive button" onClick={savePatient}>Save Patient</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}