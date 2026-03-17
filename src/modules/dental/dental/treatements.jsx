import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialTreatments = [
  { id: 1, patient: 'Jane Doe', treatment: 'Teeth Cleaning', date: '2026-02-25', dentist: 'Dr. Smith', status: 'pending' },
  { id: 2, patient: 'John Smith', treatment: 'Cavity Filling', date: '2026-02-26', dentist: 'Dr. Lee', status: 'completed' },
  { id: 3, patient: 'Mary Johnson', treatment: 'Root Canal', date: '2026-02-27', dentist: 'Dr. Smith', status: 'pending' },
];

const statusColors = {
  pending: 'warning',
  completed: 'success',
  cancelled: 'danger',
};

export default function Treatmentss() {
  const [treatments, setTreatments] = useState(initialTreatments);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState({
    patient: '',
    treatment: '',
    date: '',
    dentist: '',
    status: 'pending',
  });

  // Patient suggestions
  const patientNames = [...new Set(treatments.map(t => t.patient))];

  // Filtered treatments
  const filteredTreatments = treatments.filter(t => {
    const matchesSearch = t.patient.toLowerCase().includes(search.toLowerCase()) || t.treatment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setTreatments(prev => prev.map(t => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  const openModal = (treatment = null) => {
    setCurrentTreatment(treatment || { patient: '', treatment: '', date: '', dentist: '', status: 'pending' });
    setModalOpen(true);
  };

  const saveTreatment = () => {
    if (!currentTreatment.patient || !currentTreatment.treatment || !currentTreatment.date || !currentTreatment.dentist) {
      alert("Please fill all fields");
      return;
    }

    if (currentTreatment.id) {
      // Edit existing
      setTreatments(prev => prev.map(t => t.id === currentTreatment.id ? currentTreatment : t));
    } else {
      // Add new
      setTreatments(prev => [...prev, { ...currentTreatment, id: prev.length + 1 }]);
    }

    setModalOpen(false);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Dental Treatments</h2>

      {/* ---------------- Filters ---------------- */}
      <div className="row mb-3 g-2">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by patient or treatment..."
            value={search}
            onInput={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={() => openModal()}>Add Treatment</button>
        </div>
      </div>

      {/* ---------------- Treatments Table ---------------- */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Patient</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Dentist</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTreatments.length > 0 ? filteredTreatments.map(t => (
              <tr key={t.id}>
                <td>{t.patient}</td>
                <td>{t.treatment}</td>
                <td>{t.date}</td>
                <td>{t.dentist}</td>
                <td>
                  <span className={`badge bg-${statusColors[t.status]}`} style={{ textTransform: 'capitalize' }}>
                    {t.status}
                  </span>
                </td>
                <td>
                  {t.status === 'pending' && (
                    <>
                      <button className="btn btn-success btn-sm me-1" onClick={() => updateStatus(t.id, 'completed')}>Complete</button>
                      <button className="btn btn-danger btn-sm me-1" onClick={() => updateStatus(t.id, 'cancelled')}>Cancel</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => openModal(t)}>Edit</button>
                    </>
                  )}
                  {t.status !== 'pending' && <button className="btn btn-secondary btn-sm" onClick={() => openModal(t)}>Edit</button>}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="text-center">No treatments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- Modal ---------------- */}
      {modalOpen && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentTreatment.id ? "Edit Treatment" : "Add Treatment"}</h5>
                <button className="btn-close" onClick={() => setModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentTreatment.patient}
                    onInput={e => setCurrentTreatment({ ...currentTreatment, patient: e.target.value })}
                    list="patient-suggestions"
                  />
                  <datalist id="patient-suggestions">
                    {patientNames.map(name => <option key={name} value={name} />)}
                  </datalist>
                </div>
                <div className="mb-3">
                  <label>Treatment</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentTreatment.treatment}
                    onInput={e => setCurrentTreatment({ ...currentTreatment, treatment: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={currentTreatment.date}
                    onInput={e => setCurrentTreatment({ ...currentTreatment, date: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Dentist</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentTreatment.dentist}
                    onInput={e => setCurrentTreatment({ ...currentTreatment, dentist: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={currentTreatment.status}
                    onChange={e => setCurrentTreatment({ ...currentTreatment, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
                <button className="btn btn-primary" onClick={saveTreatment}>{currentTreatment.id ? "Save Changes" : "Add Treatment"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}