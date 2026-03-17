import { h } from 'preact';
import { useState } from 'preact/hooks';

const patientsList = [
  { id: 'P1001', name: 'Jane Doe' },
  { id: 'P1002', name: 'John Smith' },
  { id: 'P1003', name: 'Mary Johnson' },
];

const statusColors = {
  Admitted: 'green',
  Pending: 'yellow',
  Discharged: 'grey',
  Transferred: 'orange',
};

const staffList = [
  'Dr. John Doe',
  'Dr. Jane Smith',
  'Dr. Mary Johnson',
  'Dr. Robert Brown',
  'Dr. Alice Johnson',
];

export default function Admissions() {

  const [admissions, setAdmissions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patient: '',
    patientId: '',
    type: '',
    ward: '',
    bed: '',
    room: '',
    admittedBy: '',
    date: '',
    notes: '',
    status: 'Admitted'
  });

  const [patientSearch, setPatientSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredPatients = patientsList.filter(p =>
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    p.id.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const handleSelectPatient = (patient) => {
    setFormData({
      ...formData,
      patient: patient.name,
      patientId: patient.id
    });
    setPatientSearch(`${patient.name} (${patient.id})`);
    setShowSuggestions(false);
  };

  const handleSave = () => {
    if (!formData.patient || !formData.type) {
      alert("Patient and Admission Type required.");
      return;
    }

    const newAdmission = {
      ...formData,
      id: Date.now(),
    };

    setAdmissions(prev => [...prev, newAdmission]);
    setModalOpen(false);

    // Reset form
    setFormData({
      patient: '',
      patientId: '',
      type: '',
      ward: '',
      bed: '',
      room: '',
      admittedBy: '',
      date: '',
      notes: '',
      status: 'Admitted'
    });
    setPatientSearch('');
  };

  return (
    <div className="ui container my-4">

      <h3 className="ui teal header">
        <i className="hospital icon"></i> Patient Admissions
      </h3>

      <button className="ui blue button mb-3" onClick={() => setModalOpen(true)}>
        <i className="add icon"></i> Add Admission
      </button>

      {/* Admissions Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Type</th>
            <th>Location</th>
            <th>Admitted By</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {admissions.length > 0 ? (
            admissions.map(a => (
              <tr key={a.id}>
                <td>{a.patient} ({a.patientId})</td>
                <td>{a.type}</td>
                <td>
                  {a.type === 'IPD' && `${a.ward} - Bed ${a.bed}`}
                  {a.type === 'OPD' && `Room: ${a.room}`}
                  {a.type === 'Emergency' && `ER: ${a.ward}`}
                  {a.type === 'Maternity' && `${a.ward}`}
                </td>
                <td>{a.admittedBy}</td>
                <td>{a.date}</td>
                <td>
                  <div className={`ui ${statusColors[a.status]} label`}>
                    {a.status}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="center aligned">
                No admissions yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div className="ui dimmer modals visible active">
          <div className="ui large modal visible active">

            <div className="header">New Admission</div>

            <div className="content">
              <div className="ui form">

                {/* Patient Search */}
                <div className="field">
                  <label>Search Patient (Name or ID)</label>
                  <input
                    placeholder="Type name or patient ID..."
                    value={patientSearch}
                    onChange={(e) => {
                      setPatientSearch(e.target.value);
                      setShowSuggestions(true);
                    }}
                  />

                  {showSuggestions && patientSearch && (
                    <div className="ui segment" style={{ maxHeight: 150, overflowY: 'auto' }}>
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map(p => (
                          <div
                            key={p.id}
                            style={{ padding: 5, cursor: 'pointer' }}
                            onClick={() => handleSelectPatient(p)}
                          >
                            {p.name} ({p.id})
                          </div>
                        ))
                      ) : (
                        <div>No patients found</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Admission Type */}
                <div className="field">
                  <label>Admission Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select Type</option>
                    <option value="IPD">IPD</option>
                    <option value="OPD">OPD</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Maternity">Maternity</option>
                  </select>
                </div>

                {/* Dynamic Fields */}
                {formData.type === 'IPD' && (
                  <div className="two fields">
                    <div className="field">
                      <label>Ward</label>
                      <input
                        value={formData.ward}
                        onInput={e => setFormData({ ...formData, ward: e.target.value })}
                      />
                    </div>
                    <div className="field">
                      <label>Bed</label>
                      <input
                        value={formData.bed}
                        onInput={e => setFormData({ ...formData, bed: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {formData.type === 'OPD' && (
                  <div className="field">
                    <label>Consultation Room</label>
                    <input
                      value={formData.room}
                      onInput={e => setFormData({ ...formData, room: e.target.value })}
                    />
                  </div>
                )}

                {formData.type === 'Emergency' && (
                  <div className="field">
                    <label>ER Section</label>
                    <input
                      value={formData.ward}
                      onInput={e => setFormData({ ...formData, ward: e.target.value })}
                    />
                  </div>
                )}

                {/* Common Fields */}
                <div className="two fields">
                  <div className="field">
                    <label>Admitted By</label>
                    <input
                      value={formData.admittedBy}
                      placeholder="Type staff name..."
                      onChange={e => {
                        setFormData({ ...formData, admittedBy: e.target.value });
                        setShowSuggestions(true);
                      }}
                    />

                    {showSuggestions && formData.admittedBy && (
                      <div className="ui segment" style={{ maxHeight: 150, overflowY: 'auto' }}>
                        {staffList.filter(s =>
                          s.toLowerCase().includes(formData.admittedBy.toLowerCase())
                        ).map((s, index) => (
                          <div
                            key={index}
                            style={{ padding: 5, cursor: 'pointer' }}
                            onClick={() => {
                              setFormData({ ...formData, admittedBy: s });
                              setShowSuggestions(false);
                            }}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="field">
                    <label>Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onInput={e => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Notes</label>
                  <textarea
                    rows="3"
                    value={formData.notes}
                    onInput={e => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

              </div>
            </div>

            <div className="actions">
              <button className="ui button" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="ui blue button" onClick={handleSave}>
                Save Admission
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}