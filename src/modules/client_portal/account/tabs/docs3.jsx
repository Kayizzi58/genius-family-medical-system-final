import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialDoctors = [
  { id: 1, personalNo: 'DC20261', name: 'John Smith', specialty: 'General', status: 'Available' },
  { id: 2, personalNo: 'DC20262', name: 'Mary Johnson', specialty: 'Dentist', status: 'On Leave' },
  { id: 3, personalNo: 'DC20263', name: 'Paul Lee', specialty: 'Cardiology', status: 'Available' },
];

export default function Docsmain() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [formData, setFormData] = useState({
    personalNo: '',
    name: '',
    specialty: '',
    status: 'Available',
  });

  const filteredDoctors = doctors.filter(d => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || d.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Open Add Modal
  const openAddModal = () => {
    setEditingDoctor(null);
    setFormData({
      personalNo: '',
      name: '',
      specialty: '',
      status: 'Available',
    });
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (doctor) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.personalNo || !formData.name) {
      alert("Personal No and Name are required");
      return;
    }

    if (editingDoctor) {
      // Update
      setDoctors(prev =>
        prev.map(d => d.id === editingDoctor.id ? { ...formData, id: editingDoctor.id } : d)
      );
    } else {
      // Add new
      const newDoctor = {
        ...formData,
        id: Date.now(),
      };
      setDoctors(prev => [...prev, newDoctor]);
    }

    setModalOpen(false);
  };

  const handleDeactivate = (id) => {
    setDoctors(prev =>
      prev.map(d => d.id === id ? { ...d, status: 'Inactive' } : d)
    );
  };

  const handleActivate = (id) => {
    setDoctors(prev =>
      prev.map(d => d.id === id ? { ...d, status: 'Available' } : d)
    );
  };

  const handleDelete = (id) => {
    if (confirm('Delete this doctor?')) {
      setDoctors(prev => prev.filter(d => d.id !== id));
    }
  };

  return (
    <div className="ui container my-4">
      <h3 className="ui blue header">
        <i className="user md icon"></i> Manage Doctors
      </h3>

      {/* Filters */}
      <div className="ui stackable grid mb-3">
        <div className="eight wide column">
          <input type="text"
            className="ui fluid input"
            placeholder="Search by name or specialty..."
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
            <option value="Available">Available</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="four wide column">
          <button className="ui grey fluid button" onClick={() => { setSearch(''); setFilterStatus(''); }}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Add Button */}
      <button className="ui blue button mb-3" onClick={openAddModal}>
        <i className="add icon"></i> Add Doctor
      </button>

      {/* Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>Personal No</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(d => (
              <tr key={d.id}>
                <td>{d.personalNo}</td>
                <td>{d.name}</td>
                <td>{d.specialty}</td>
                <td>
                  <div className={`ui ${
                    d.status === 'Available'
                      ? 'green'
                      : d.status === 'On Leave'
                      ? 'yellow'
                      : 'grey'
                  } label`}>
                    {d.status}
                  </div>
                </td>
                <td>
                  <div className="ui mini buttons">
                    <button
                      className="ui blue button"
                      onClick={() => openEditModal(d)}
                    >
                      <i className="edit icon"></i> Edit
                    </button>

                    {d.status !== 'Inactive' ? (
                      <button
                        className="ui orange button"
                        onClick={() => handleDeactivate(d.id)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="ui green button"
                        onClick={() => handleActivate(d.id)}
                      >
                        Activate
                      </button>
                    )}

                    <button
                      className="ui red button"
                      onClick={() => handleDelete(d.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="center aligned">
                No doctors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="ui dimmer modals visible active">
          <div className="ui small modal visible active">
            <div className="header">
              {editingDoctor ? "Edit Doctor" : "Add Doctor"}
            </div>
            <div className="content">
              <div className="ui form">
                <div className="field">
                  <label>Personal Number</label>
                  <input
                    value={formData.personalNo}
                    onInput={e => setFormData({ ...formData, personalNo: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Name</label>
                  <input
                    value={formData.name}
                    onInput={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Specialty</label>
                  <input
                    value={formData.specialty}
                    onInput={e => setFormData({ ...formData, specialty: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Available">Available</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="ui button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="ui blue button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}