
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialPrescriptions = [
  {
    id: 201,
    patient: "Jane Doe",
    doctor: "Dr. Smith",
    medications: ["Ibuprofen 400mg", "Paracetamol 500mg"],
    dosage: ["2x/day", "3x/day"],
    totalCost: 25000,
    status: "Pending"
  },
  {
    id: 202,
    patient: "John Smith",
    doctor: "Dr. Adams",
    medications: ["Amoxicillin 500mg"],
    dosage: ["3x/day"],
    totalCost: 12000,
    status: "Dispensed"
  },
  {
    id: 203,
    patient: "Mary Johnson",
    doctor: "Dr. Lee",
    medications: ["Cough Syrup"],
    dosage: ["10ml 2x/day"],
    totalCost: 8000,
    status: "Pending"
  }
];

const statusColor = {
  Pending: "yellow",
  Dispensed: "green",
  Cancelled: "red"
};

export default function Allprescriptions() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');

  const filteredPrescriptions = prescriptions.filter(p => {
    const matchesSearch = p.patient.toLowerCase().includes(search.toLowerCase()) || p.medications.join(" ").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || p.status === filterStatus;
    const matchesDoctor = !filterDoctor || p.doctor === filterDoctor;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const updateStatus = (id, newStatus) => {
    setPrescriptions(prev =>
      prev.map(p => p.id === id ? { ...p, status: newStatus } : p)
    );
  };

  return (
    <div className="ui container fluid my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="file prescription icon"></i> All Prescriptions
        </h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search patient or medication..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="five wide column">
            <select
              className="ui fluid dropdown"
              value={filterDoctor}
              onChange={e => setFilterDoctor(e.target.value)}
            >
              <option value="">All Doctors</option>
              <option>Dr. Smith</option>
              <option>Dr. Adams</option>
              <option>Dr. Lee</option>
            </select>
          </div>

          <div className="five wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option>Pending</option>
              <option>Dispensed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* Prescriptions Table */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Medications</th>
              <th>Dosage</th>
              <th>Total Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrescriptions.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.patient}</td>
                <td>{p.doctor}</td>
                <td>
                  <ul>
                    {p.medications.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </td>
                <td>
                  <ul>
                    {p.dosage.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </td>
                <td>{p.totalCost}</td>
                <td>
                  <div className={`ui ${statusColor[p.status]} label`}>
                    {p.status}
                  </div>
                </td>
                <td>
                  {p.status !== "Dispensed" && (
                    <button
                      className="ui tiny green button mr-1"
                      onClick={() => updateStatus(p.id, "Dispensed")}
                    >
                      <i className="check icon"></i> Dispense
                    </button>
                  )}
                  {p.status !== "Cancelled" && (
                    <button
                      className="ui tiny red button"
                      onClick={() => updateStatus(p.id, "Cancelled")}
                    >
                      <i className="close icon"></i> Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredPrescriptions.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Prescription */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open Add Prescription Modal")}
          >
            <i className="add icon"></i> Add Prescription
          </button>
        </div>
      </div>
    </div>
  );
}