
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialConsultations = [
  {
    id: 1,
    patient: "Jane Doe",
    doctor: "Dr. Smith",
    department: "Dental",
    consultationDate: "2026-02-25",
    notes: "Routine check-up, advised cleaning",
    prescription: "Mouthwash, Fluoride paste",
    status: "Reviewed"
  },
  {
    id: 2,
    patient: "John Smith",
    doctor: "Dr. Adams",
    department: "General Medicine",
    consultationDate: "2026-02-26",
    notes: "Mild fever, prescribed medication",
    prescription: "Paracetamol 500mg",
    status: "Pending"
  },
  {
    id: 3,
    patient: "Mary Johnson",
    doctor: "Dr. Lee",
    department: "ENT",
    consultationDate: "2026-02-27",
    notes: "Ear infection, follow-up in 1 week",
    prescription: "Antibiotic drops",
    status: "Pending"
  }
];

const statusColor = {
  Reviewed: "green",
  Pending: "orange",
  Flagged: "red"
};

export default function Opdconsultations() {
  const [consultations, setConsultations] = useState(initialConsultations);
  const [search, setSearch] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredConsultations = consultations.filter(c => {
    const matchesSearch =
      c.patient.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase());
    const matchesDoctor = !filterDoctor || c.doctor === filterDoctor;
    const matchesStatus = !filterStatus || c.status === filterStatus;
    return matchesSearch && matchesDoctor && matchesStatus;
  });

  const markReviewed = (id) => {
    setConsultations(prev =>
      prev.map(c => c.id === id ? { ...c, status: "Reviewed" } : c)
    );
  };

  const flagConsultation = (id) => {
    setConsultations(prev =>
      prev.map(c => c.id === id ? { ...c, status: "Flagged" } : c)
    );
  };

  return (
    <div className="ui container fluid my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="file medical icon"></i> All OPD Consultations
        </h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search patient or department..."
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
              <option>Reviewed</option>
              <option>Flagged</option>
            </select>
          </div>
        </div>

        {/* Consultations Table */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Prescription</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredConsultations.map(c => (
              <tr key={c.id}>
                <td>{c.patient}</td>
                <td>{c.doctor}</td>
                <td>{c.department}</td>
                <td>{c.consultationDate}</td>
                <td>{c.notes}</td>
                <td>{c.prescription}</td>
                <td>
                  <div className={`ui ${statusColor[c.status]} label`}>
                    {c.status}
                  </div>
                </td>
                <td>
                  {c.status !== "Reviewed" && (
                    <button
                      className="ui tiny green button mr-1"
                      onClick={() => markReviewed(c.id)}
                    >
                      <i className="check icon"></i> Review
                    </button>
                  )}
                  {c.status !== "Flagged" && (
                    <button
                      className="ui tiny red button"
                      onClick={() => flagConsultation(c.id)}
                    >
                      <i className="exclamation triangle icon"></i> Flag
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredConsultations.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No consultations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Consultation Button */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open Add Consultation Modal")}
          >
            <i className="add icon"></i> Add Consultation
          </button>
        </div>
      </div>
    </div>
  );
}