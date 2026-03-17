
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialPatients = [
  {
    id: 1,
    patient: "Jane Doe",
    ward: "General Ward A",
    bed: "Bed 05",
    doctor: "Dr. Smith",
    condition: "Stable",
    labStatus: "Completed",
    treatment: "Ongoing",
    admissionDate: "2026-02-20"
  },
  {
    id: 2,
    patient: "John Smith",
    ward: "ICU 1",
    bed: "Bed 02",
    doctor: "Dr. Adams",
    condition: "Critical",
    labStatus: "Pending",
    treatment: "Intensive Care",
    admissionDate: "2026-02-22"
  },
  {
    id: 3,
    patient: "Mary Johnson",
    ward: "Maternity Ward",
    bed: "Bed 08",
    doctor: "Dr. Lee",
    condition: "Recovering",
    labStatus: "Completed",
    treatment: "Post-Op Monitoring",
    admissionDate: "2026-02-18"
  }
];

const conditionColor = {
  Stable: "green",
  Observation: "yellow",
  Critical: "red",
  Recovering: "blue"
};

export default function Patientstatus() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState('');
  const [filterCondition, setFilterCondition] = useState('');

  const calculateLOS = (date) => {
    const admission = new Date(date);
    const today = new Date();
    const diff = Math.floor((today - admission) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch =
      p.patient.toLowerCase().includes(search.toLowerCase()) ||
      p.ward.toLowerCase().includes(search.toLowerCase());
    const matchesCondition =
      !filterCondition || p.condition === filterCondition;
    return matchesSearch && matchesCondition;
  });

  const escalateToICU = (id) => {
    setPatients(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, ward: "ICU 1", condition: "Critical" }
          : p
      )
    );
  };

  const markObservation = (id) => {
    setPatients(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, condition: "Observation" }
          : p
      )
    );
  };

  const dischargePatient = (id) => {
    setPatients(prev => prev.filter(p => p.id !== id));
  };

  const total = patients.length;
  const critical = patients.filter(p => p.condition === "Critical").length;
  const stable = patients.filter(p => p.condition === "Stable").length;

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="heartbeat icon"></i> Patient Status Monitoring
        </h3>

        {/* DASHBOARD */}
        <div className="ui three stackable cards mb-3">
          <div className="ui card"><div className="content">
            <div className="header">Total Admitted</div>
            <div className="description">{total}</div>
          </div></div>

          <div className="ui card"><div className="content">
            <div className="header">Critical</div>
            <div className="description">{critical}</div>
          </div></div>

          <div className="ui card"><div className="content">
            <div className="header">Stable</div>
            <div className="description">{stable}</div>
          </div></div>
        </div>

        {/* FILTERS */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search patient or ward..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="six wide column">
            <select
              className="ui fluid dropdown"
              value={filterCondition}
              onChange={e => setFilterCondition(e.target.value)}
            >
              <option value="">All Conditions</option>
              <option>Stable</option>
              <option>Observation</option>
              <option>Critical</option>
              <option>Recovering</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Ward</th>
              <th>Bed</th>
              <th>Doctor</th>
              <th>Condition</th>
              <th>Lab Status</th>
              <th>Treatment</th>
              <th>LOS (Days)</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(p => (
              <tr key={p.id}>
                <td><strong>{p.patient}</strong></td>
                <td>{p.ward}</td>
                <td>{p.bed}</td>
                <td>{p.doctor}</td>
                <td>
                  <div className={`ui ${conditionColor[p.condition]} label`}>
                    {p.condition}
                  </div>
                </td>
                <td>{p.labStatus}</td>
                <td>{p.treatment}</td>
                <td>{calculateLOS(p.admissionDate)}</td>
                <td>
                  <button
                    className="ui tiny yellow button mr-1"
                    onClick={() => markObservation(p.id)}
                  >
                    <i className="eye icon"></i> Observe
                  </button>

                  <button
                    className="ui tiny red button mr-1"
                    onClick={() => escalateToICU(p.id)}
                  >
                    <i className="warning icon"></i> ICU
                  </button>

                  <button
                    className="ui tiny grey button"
                    onClick={() => dischargePatient(p.id)}
                  >
                    <i className="sign-out icon"></i> Discharge
                  </button>
                </td>
              </tr>
            ))}

            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}