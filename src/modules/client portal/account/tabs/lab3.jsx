
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialLabActivities = [
  { id: 1, orderNo: 'LAB-101', patient: 'Jane Doe', sample: 'Blood', collectedBy: 'Nurse Anna', processedBy: 'Lab Tech Mike', status: 'Pending' },
  { id: 2, orderNo: 'LAB-102', patient: 'John Smith', sample: 'Urine', collectedBy: 'Nurse Brian', processedBy: '', status: 'Collected' },
  { id: 3, orderNo: 'LAB-103', patient: 'Mary Johnson', sample: 'Blood', collectedBy: 'Nurse Clara', processedBy: 'Lab Tech Mike', status: 'Processing' },
  { id: 4, orderNo: 'LAB-104', patient: 'Paul Lee', sample: 'X-Ray', collectedBy: 'Nurse Anna', processedBy: 'Lab Tech Sara', status: 'Completed' },
];

const statusColors = {
  Pending: 'yellow',
  Collected: 'blue',
  Processing: 'orange',
  Completed: 'green',
};

export default function Labactivities() {
  const [labActivities, setLabActivities] = useState(initialLabActivities);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSample, setFilterSample] = useState('');

  const filteredActivities = labActivities.filter(a => {
    const matchesSearch = a.patient.toLowerCase().includes(search.toLowerCase()) || a.orderNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || a.status === filterStatus;
    const matchesSample = !filterSample || a.sample === filterSample;
    return matchesSearch && matchesStatus && matchesSample;
  });

  const updateStatus = (id, newStatus) => {
    setLabActivities(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal"><i className="flask icon"></i> Lab Activities</h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="four wide column">
            <div className="ui input fluid">
              <input
                type="text"
                placeholder="Search by patient or order..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterSample}
              onChange={e => setFilterSample(e.target.value)}
            >
              <option value="">All Sample Types</option>
              <option value="Blood">Blood</option>
              <option value="Urine">Urine</option>
              <option value="X-Ray">X-Ray</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Collected">Collected</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="four wide column">
            <button className="ui grey fluid button" onClick={() => { setSearch(''); setFilterSample(''); setFilterStatus(''); }}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Lab Activities Table */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Order No</th>
                <th>Patient</th>
                <th>Sample Type</th>
                <th>Collected By</th>
                <th>Processed By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length > 0 ? filteredActivities.map(a => (
                <tr key={a.id}>
                  <td>{a.orderNo}</td>
                  <td>{a.patient}</td>
                  <td>{a.sample}</td>
                  <td>{a.collectedBy}</td>
                  <td>{a.processedBy || '-'}</td>
                  <td>
                    <div className={`ui ${statusColors[a.status]} label`} style={{ textTransform: 'capitalize' }}>
                      {a.status}
                    </div>
                  </td>
                  <td>
                    {a.status === 'Pending' && (
                      <button className="ui tiny blue button mr-1" onClick={() => updateStatus(a.id, 'Collected')}>
                        <i className="check icon"></i> Collect
                      </button>
                    )}
                    {a.status === 'Collected' && (
                      <button className="ui tiny orange button mr-1" onClick={() => updateStatus(a.id, 'Processing')}>
                        <i className="cogs icon"></i> Process
                      </button>
                    )}
                    {a.status === 'Processing' && (
                      <button className="ui tiny green button mr-1" onClick={() => updateStatus(a.id, 'Completed')}>
                        <i className="flask icon"></i> Complete
                      </button>
                    )}
                    {(a.status === 'Completed' || a.status === 'Collected' || a.status === 'Processing') && (
                      <button className="ui tiny teal button" onClick={() => updateStatus(a.id, 'Pending')}>
                        <i className="undo icon"></i> Reset
                      </button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No lab activities found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}