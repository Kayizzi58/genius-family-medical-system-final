import { h } from 'preact';
import { useState } from 'preact/hooks';

const reportsData = [
  { id: 1, patient: 'Jane Doe', type: 'Vital Signs', date: '2026-02-24', status: 'pending', details: 'Patient blood pressure fluctuates.' },
  { id: 2, patient: 'John Smith', type: 'Medication', date: '2026-02-23', status: 'completed', details: 'Medication administered successfully.' },
  { id: 3, patient: 'Mary Johnson', type: 'Lab Results', date: '2026-02-24', status: 'urgent', details: 'Lab results indicate urgent care required.' },
];

const statusColors = {
  pending: 'yellow',
  completed: 'green',
  urgent: 'red',
};

export default function Reports() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [modalReport, setModalReport] = useState(null);

  const filteredReports = reportsData.filter(r => {
    const matchesSearch = `${r.patient} ${r.type}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filter || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAction = (action, report) => {
    if(action === "complete") report.status = "completed";
    if(action === "escalate") report.status = "urgent";
    if(action === "print") window.print(); // simple print
    setModalReport({...report}); // refresh modal
  }

  return (
    <div className="ui fluid container" style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      
      {/* Filters */}
      <div className="ui segment" style={{ marginBottom: '2rem' }}>
        <div className="ui stackable grid">
          <div className="eight wide column">
            <div className="ui fluid icon input">
              <input
                type="text"
                placeholder="Search by patient or report..."
                value={search}
                onInput={e => setSearch(e.currentTarget.value)}
              />
              <i className="search icon"></i>
            </div>
          </div>
          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filter}
              onChange={e => setFilter(e.currentTarget.value)}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="four wide column">
            <button
              className="ui fluid blue button"
              onClick={() => { setSearch(''); setFilter(''); }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <table className="ui celled striped selectable table">
        <thead className="full-width">
          <tr>
            <th>Patient Name</th>
            <th>Report Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map(r => (
            <tr key={r.id}>
              <td>{r.patient}</td>
              <td>{r.type}</td>
              <td>{r.date}</td>
              <td>
                <div className={`ui ${statusColors[r.status]} label`} style={{ textTransform: 'capitalize' }}>
                  {r.status}
                </div>
              </td>
              <td>
                <button className="ui mini blue button" onClick={() => setModalReport(r)}>View</button>
              </td>
            </tr>
          ))}
          {filteredReports.length === 0 && (
            <tr>
              <td style={{ textAlign: 'center', padding: '1rem' }} colSpan="5">No reports found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Fullscreen Modal */}
      {modalReport && (
        <div
          className="ui dimmer modals page active"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setModalReport(null)}
        >
          <div
            className="ui modal scrolling active"
            style={{ display: 'block', width: '90%', height: '90%', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="header">Report Details</div>
            <div className="content">
              <div className="ui form">
                <div className="field">
                  <label>Patient Name</label>
                  <input type="text" value={modalReport.patient} readOnly />
                </div>
                <div className="field">
                  <label>Report Type</label>
                  <input type="text" value={modalReport.type} readOnly />
                </div>
                <div className="field">
                  <label>Date</label>
                  <input type="text" value={modalReport.date} readOnly />
                </div>
                <div className="field">
                  <label>Status</label>
                  <input type="text" value={modalReport.status} readOnly />
                </div>
                <div className="field">
                  <label>Details</label>
                  <textarea readOnly value={modalReport.details}></textarea>
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={() => handleAction("complete", modalReport)}>Mark Complete</button>
              <button className="ui red button" onClick={() => handleAction("escalate", modalReport)}>Escalate</button>
              <button className="ui blue button" onClick={() => handleAction("print", modalReport)}>Print</button>
              <button className="ui grey button" onClick={() => setModalReport(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}