import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialNurses = [
  { id: 1, personalNo: 'N20261', name: 'Nurse Anna', ward: 'Ward A', status: 'Active' },
  { id: 2, personalNo: 'N20262', name: 'Nurse Brian', ward: 'Ward B', status: 'On Leave' },
  { id: 3, personalNo: 'N20263', name: 'Nurse Clara', ward: 'ICU', status: 'Active' },
];

export default function Nursess() {
  const [nurses, setNurses] = useState(initialNurses);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingNurse, setEditingNurse] = useState(null);

  const [formData, setFormData] = useState({
    personalNo: '',
    name: '',
    ward: '',
    status: 'Active',
  });

  const filteredNurses = nurses.filter(n => {
    const matchesSearch =
      n.name.toLowerCase().includes(search.toLowerCase()) ||
      n.ward.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || n.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Open Add Modal
  const openAddModal = () => {
    setEditingNurse(null);
    setFormData({
      personalNo: '',
      name: '',
      ward: '',
      status: 'Active',
    });
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (nurse) => {
    setEditingNurse(nurse);
    setFormData(nurse);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.personalNo || !formData.name) {
      alert("Personal No and Name are required");
      return;
    }

    if (editingNurse) {
      // Update
      setNurses(prev =>
        prev.map(n =>
          n.id === editingNurse.id
            ? { ...formData, id: editingNurse.id }
            : n
        )
      );
    } else {
      // Add
      const newNurse = {
        ...formData,
        id: Date.now(),
      };
      setNurses(prev => [...prev, newNurse]);
    }

    setModalOpen(false);
  };

  const handleDeactivate = (id) => {
    setNurses(prev =>
      prev.map(n => n.id === id ? { ...n, status: 'Inactive' } : n)
    );
  };

  const handleActivate = (id) => {
    setNurses(prev =>
      prev.map(n => n.id === id ? { ...n, status: 'Active' } : n)
    );
  };

  const handleDelete = (id) => {
    if (confirm('Delete this nurse?')) {
      setNurses(prev => prev.filter(n => n.id !== id));
    }
  };

  const statusColor = (status) => {
    if (status === 'Active') return 'green';
    if (status === 'On Leave') return 'yellow';
    return 'grey';
  };

  return (
    <div className="ui container my-4">
      <h3 className="ui blue header">
        <i className="user nurse icon"></i> Manage Nurses
      </h3>

      {/* Search & Filters */}
      <div className="ui stackable grid mb-3">
        <div className="eight wide column">
          <input
            className="ui fluid input"
            placeholder="Search by name or ward..."
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
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="four wide column">
          <button
            className="ui grey fluid button"
            onClick={() => { setSearch(''); setFilterStatus(''); }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Add Nurse */}
      <button className="ui blue button mb-3" onClick={openAddModal}>
        <i className="add icon"></i> Add Nurse
      </button>

      {/* Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>Personal No</th>
            <th>Name</th>
            <th>Ward</th>
            <th>Status</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {filteredNurses.length > 0 ? (
            filteredNurses.map(n => (
              <tr key={n.id}>
                <td>{n.personalNo}</td>
                <td>{n.name}</td>
                <td>{n.ward}</td>
                <td>
                  <div className={`ui ${statusColor(n.status)} label`}>
                    {n.status}
                  </div>
                </td>
                <td>
                  <div className="ui mini buttons">
                    <button
                      className="ui blue button"
                      onClick={() => openEditModal(n)}
                    >
                      <i className="edit icon"></i> Edit
                    </button>

                    {n.status !== 'Inactive' ? (
                      <button
                        className="ui orange button"
                        onClick={() => handleDeactivate(n.id)}
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="ui green button"
                        onClick={() => handleActivate(n.id)}
                      >
                        Activate
                      </button>
                    )}

                    <button
                      className="ui red button"
                      onClick={() => handleDelete(n.id)}
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
                No nurses found.
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
              {editingNurse ? "Edit Nurse" : "Add Nurse"}
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
                  <label>Ward</label>
                  <input
                    value={formData.ward}
                    onInput={e => setFormData({ ...formData, ward: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
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