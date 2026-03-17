import { h } from 'preact';
import { useState } from 'preact/hooks';

const sampleAppointments = [
  { date: '2026-02-12', doctor: 'Dr. Smith', department: 'OPD', status: 'Confirmed' },
];

const sampleRecords = [
  { type: 'OPD Visit', date: 'Jan 2026', diagnosis: 'Malaria', notes: 'Follow up in 2 weeks' },
];

const sampleLabs = [
  { test: 'Blood Test', date: '10 Feb', status: 'Ready', file: 'blood_report.pdf' },
];

const samplePrescriptions = [
  { name: 'Paracetamol', dosage: '2x Daily - 5 Days' },
];

const sampleBilling = [
  { item: 'Consultation', amount: '$50', status: 'Paid' },
  { item: 'Lab', amount: '$70', status: 'Pending' },
];

const sampleReferrals = [
  { message: 'Referred to Radiology Department', date: '12 Feb 2026' },
];

const sampleAdmissions = [
  { type: 'OPD', ward: 'N/A', date: '12 Feb 2026', status: 'Active' },
];

const sampleDocuments = [
  { name: 'Discharge Summary', file: 'discharge_summary.pdf' },
];

const sampleMessages = [
  { from: 'Dr. Ian Walya', message: 'Take meds regularly', date: '12 Feb 2026' },
];

function Client() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="ui container fluid">

      {/* Top Menu */}
      <div className="ui top fixed menu">
        <div className="item ui blue label"><strong>Genius Medical Services</strong></div>
        <div className="right menu">
          <div className="item ui green label">Ian Walya</div>
          <a className="" href="?"><div className="item"><i className="sign out icon"></i></div></a>
        </div>
      </div>

      <div className="pusher" style={{ marginTop: '80px' }}>

        {/* Patient Profile */}
        <div className="ui raised fluid card p-3 mb-3">
          <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="bi bi-person" style={{ fontSize: 'xx-large', color: 'blue' }}></i>
            <h3 className="ui blue large pointing below label">Ian Walya</h3>
          </div>
          <div className="ui four stackable cards mt-2">
            <div className="card"><div className="content"><div className="header ui green">Status</div><div className="description">OPD - Active</div></div></div>
            <div className="card"><div className="content"><div className="header ui blue">Next Appointment</div><div className="description">12 Feb 2026</div></div></div>
            <div className="card"><div className="content"><div className="header ui orange">Outstanding Balance</div><div className="description">$120</div></div></div>
            <div className="card"><div className="content"><div className="header ui blue">Assigned Doctor</div><div className="description">Dr. John Smith</div></div></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="ui top attached tabular menu">
          {['dashboard','appointments','records','labs','prescriptions','billing','referrals','admissions','documents','messages'].map(tab => (
            <a
              className={`item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </a>
          ))}
        </div>

        {/* Tab Content */}
        <div className="ui bottom fluid attached segment">

          {activeTab === 'appointments' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Appointments <span className="ui label">{sampleAppointments.length}</span></h3>
              <table className="ui celled table">
                <thead><tr><th>Date</th><th>Doctor</th><th>Department</th><th>Status</th></tr></thead>
                <tbody>
                  {sampleAppointments.map((a,i) => (
                    <tr key={i}>
                      <td><i className="calendar icon"></i> {a.date}</td>
                      <td>{a.doctor}</td>
                      <td>{a.department}</td>
                      <td>{a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="ui blue button"><i className="book icon"></i> Book Appointment</button>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Medical Records <span className="ui label">{sampleRecords.length}</span></h3>
              <table className="ui celled table">
                <thead><tr><th>Type</th><th>Date</th><th>Diagnosis</th><th>Notes</th></tr></thead>
                <tbody>
                  {sampleRecords.map((r,i) => (
                    <tr key={i}>
                      <td>{r.type}</td>
                      <td>{r.date}</td>
                      <td>{r.diagnosis}</td>
                      <td>{r.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Lab & Imaging <span className="ui label">{sampleLabs.length}</span></h3>
              <table className="ui striped table">
                <thead><tr><th>Test</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {sampleLabs.map((l,i) => (
                    <tr key={i}>
                      <td>{l.test}</td>
                      <td>{l.date}</td>
                      <td>{l.status}</td>
                      <td>
                        <button className="ui tiny blue button">
                          <i className="download icon"></i> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Prescriptions <span className="ui label">{samplePrescriptions.length}</span></h3>
              <table className="ui celled table">
                <thead><tr><th>Medicine</th><th>Dosage</th></tr></thead>
                <tbody>
                  {samplePrescriptions.map((p,i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.dosage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Billing & Payments <span className="ui label">Total Bill: 1000 (UGX)</span></h3>
              <table className="ui celled table">
                <thead><tr><th>Item</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {sampleBilling.map((b,i) => (
                    <tr key={i}>
                      <td>{b.item}</td>
                      <td>{b.amount}</td>
                      <td>{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="ui green button"><i className="money icon"></i> Pay Now</button>
            </div>
          )}

          {activeTab === 'referrals' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Referrals <span className="ui label">{sampleReferrals.length}</span></h3>
              {sampleReferrals.map((r,i) => (
                <div key={i} className="ui message green">{r.message} - <i>{r.date}</i></div>
              ))}
            </div>
          )}

          {activeTab === 'admissions' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Admissions <span className="ui label">{sampleAdmissions.length}</span></h3>
              {sampleAdmissions.map((a,i) => (
                <div key={i}>{a.type} - {a.ward} - {a.status} ({a.date})</div>
              ))}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Documents <span className="ui label">{sampleDocuments.length}</span></h3>
              {sampleDocuments.map((d,i) => (
                <div key={i} className="item">
                  {d.name} <button className="ui tiny blue button"><i className="download icon"></i></button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="ui fluid card p-2">
              <h3 className="ui header blue">Messages <span className="ui label">{sampleMessages.length}</span></h3>
              <div className="ui comments">
                {sampleMessages.map((m,i) => (
                  <div key={i} className="comment">
                    <div className="content card p-2">
                      <span className="author">{m.from}</span>
                      <div className="text">{m.message}</div>
                      <div className="metadata">{m.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div>
              <p>Welcome to your patient portal, Ian Walya. Use the tabs above to navigate your medical information.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Client;