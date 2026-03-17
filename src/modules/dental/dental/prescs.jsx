
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialPrescriptions = [
  {
    id: 1,
    patient: 'John Doe',
    dentist: 'Dr. Smith',
    medications: ['Ibuprofen', 'Paracetamol', 'Amoxicillin'],
    dosages: ['400mg 3/Day', '500mg 2/Day', '250mg 1/Day'],
    totalCost: 20000,
    status: 'pending',
  },
  {
    id: 2,
    patient: 'Jane Doe',
    dentist: 'Dr. Lee',
    medications: ['Cefixime', 'Vitamin D'],
    dosages: ['200mg 2/Day', '1000 IU 1/Day'],
    totalCost: 15000,
    status: 'pending',
  },
  {
    id: 3,
    patient: 'Mary Johnson',
    dentist: 'Dr. Smith',
    medications: ['Ibuprofen', 'Paracetamol'],
    dosages: ['400mg 3/Day', '500mg 2/Day'],
    totalCost: 12000,
    status: 'given',
  },
];

const statusColors = {
  pending: 'yellow',
  given: 'green',
};

function Presc() {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = prescriptions.filter(p => {
    const matchesSearch =
      p.patient.toLowerCase().includes(search.toLowerCase()) ||
      p.dentist.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setPrescriptions(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header blue">Prescriptions</h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="eight wide column">
            <input
              type="text"
              className="ui fluid input"
              placeholder="Search by patient or dentist..."
              value={search}
              onInput={e => setSearch(e.target.value)}
            />
          </div>
          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="given">Given</option>
            </select>
          </div>
          <div className="four wide column">
            <button
              className="ui grey button fluid"
              onClick={() => {
                setSearch('');
                setFilterStatus('');
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Prescriptions Table */}
        <div className="ui responsive table">
          <table className="ui celled striped table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Dentist</th>
                <th>Medications</th>
                <th>Dosages</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map(p => (
                  <tr key={p.id}>
                    <td>{p.patient}</td>
                    <td>{p.dentist}</td>
                    <td>
                      <ul style={{ paddingLeft: '1rem' }}>
                        {p.medications.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <ul style={{ paddingLeft: '1rem' }}>
                        {p.dosages.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </td>
                    <td>{p.totalCost}</td>
                    <td>
                      <div
                        className={`ui ${statusColors[p.status]} label`}
                        style={{ textTransform: 'capitalize' }}
                      >
                        {p.status}
                      </div>
                    </td>
                    <td>
                      {p.status === 'pending' ? (
                        <div>
                          <button
                            className="ui green mini button me-1"
                            onClick={() => updateStatus(p.id, 'given')}
                          >
                            Mark Given
                          </button>
                          <button
                            className="ui red mini button"
                            onClick={() => updateStatus(p.id, 'cancelled')}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted">No actions</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No prescriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Presc;