import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialReports = [
  { id: 1, patient: 'John Doe', sample: 'Blood', technician: 'Lab Tech Mike', resultStatus: 'Verified', date: '2026-02-24', reportType: 'Lab Test', content: 'Hemoglobin: 13.5 g/dL' },
  { id: 2, patient: 'Jane Smith', sample: 'Urine', technician: 'Lab Tech Mike', resultStatus: 'Draft', date: '2026-02-23', reportType: 'Lab Test', content: 'Normal' },
  { id: 3, patient: 'Mary Johnson', sample: 'X-ray', technician: 'Lab Tech Sarah', resultStatus: 'Verified', date: '2026-02-22', reportType: 'Imaging', content: 'No abnormalities' },
  { id: 4, patient: 'Paul Lee', sample: 'Blood', technician: 'Lab Tech Mike', resultStatus: 'Cancelled', date: '2026-02-24', reportType: 'Lab Test', content: 'Cancelled by user' },
];

const statusColors = {
  Draft: 'grey',
  Verified: 'green',
  Cancelled: 'red',
};

export default function Reports() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');

  // Modal state
  const [modal, setModal] = useState({ visible: false, type: '', report: null });

  const filteredReports = reports.filter(r => {
    const matchesSearch =
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.sample.toLowerCase().includes(search.toLowerCase()) ||
      r.technician.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || r.resultStatus === filterStatus;
    const matchesType = !filterType || r.reportType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const openModal = (type, report) => setModal({ visible: true, type, report });
  const closeModal = () => setModal({ visible: false, type: '', report: null });

  const handlePrint = () => {
    if (modal.report) {
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow.document.write(`<pre>${modal.report.content}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
    closeModal();
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="ui header purple"><i className="chart bar icon"></i> Reports</h3>
          <button className="ui tiny green button" onClick={() => {
            const header = 'Patient,Sample,Technician,Result Status,Date,Report Type\n';
            const rows = reports.map(r => `${r.patient},${r.sample},${r.technician},${r.resultStatus},${r.date},${r.reportType}`).join('\n');
            const csvContent = "data:text/csv;charset=utf-8," + header + rows;
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "lab_reports.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}>
            <i className="download icon"></i> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="five wide column">
            <input
              className="ui fluid input"
              placeholder="Search by patient, sample, technician..."
              value={search}
              onInput={e => setSearch(e.target.value)}
            />
          </div>
          <div className="three wide column">
            <select className="ui fluid dropdown" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              {Object.keys(statusColors).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="three wide column">
            <select className="ui fluid dropdown" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="">All Report Types</option>
              <option value="Lab Test">Lab Test</option>
              <option value="Imaging">Imaging</option>
              <option value="Prescription">Prescription</option>
            </select>
          </div>
          <div className="five wide column">
            <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); setFilterType(''); }}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Sample</th>
                <th>Technician</th>
                <th>Result Status</th>
                <th>Date</th>
                <th>Report Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? filteredReports.map(r => (
                <tr key={r.id}>
                  <td>{r.patient}</td>
                  <td>{r.sample}</td>
                  <td>{r.technician}</td>
                  <td>
                    <div className={`ui ${statusColors[r.resultStatus]} label`} style={{ textTransform: 'capitalize' }}>
                      {r.resultStatus}
                    </div>
                  </td>
                  <td>{r.date}</td>
                  <td>{r.reportType}</td>
                  <td>
                    <div className="ui buttons tiny">
                      <button className="ui tiny blue button" onClick={() => openModal('view', r)}>
                        <i className="eye icon"></i> View
                      </button>
                      <button className="ui tiny green button" onClick={() => openModal('print', r)}>
                        <i className="print icon"></i> Print
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="text-center">No reports found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal.visible && (
        <div className="ui dimmer modals page active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={closeModal}>
          <div className="ui modal active" style={{ display: 'block', width: '500px' }} onClick={e => e.stopPropagation()}>
            <div className="header">
              {modal.type === 'view' ? 'View Report' : modal.type === 'print' ? 'Print Report' : ''}
            </div>
            <div className="content">
              {modal.report && (
                <div className="ui segment">
                  <p><strong>Patient:</strong> {modal.report.patient}</p>
                  <p><strong>Sample:</strong> {modal.report.sample}</p>
                  <p><strong>Technician:</strong> {modal.report.technician}</p>
                  <p><strong>Date:</strong> {modal.report.date}</p>
                  <p><strong>Report Type:</strong> {modal.report.reportType}</p>
                  <p><strong>Result Status:</strong> {modal.report.resultStatus}</p>
                  <hr />
                  <pre>{modal.report.content}</pre>
                </div>
              )}
            </div>
            <div className="actions">
              {modal.type === 'print' && <button className="ui green button" onClick={handlePrint}>Print</button>}
              <button className="ui grey button" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}