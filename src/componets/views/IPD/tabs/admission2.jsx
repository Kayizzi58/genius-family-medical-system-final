
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialAdmissions = [
  {
    id: 1,
    admissionNo: "ADM-1001",
    patient: "Jane Doe",
    ward: "General Ward A",
    bed: "Bed 05",
    doctor: "Dr. Smith",
    nurse: "Nurse Anna",
    date: "2026-02-24",
    status: "Admitted"
  },
  {
    id: 2,
    admissionNo: "ADM-1002",
    patient: "John Smith",
    ward: "ICU 1",
    bed: "Bed 02",
    doctor: "Dr. Adams",
    nurse: "Nurse Clara",
    date: "2026-02-22",
    status: "Admitted"
  },
  {
    id: 3,
    admissionNo: "ADM-1003",
    patient: "Mary Johnson",
    ward: "Maternity Ward",
    bed: "Bed 08",
    doctor: "Dr. Lee",
    nurse: "Nurse Mercy",
    date: "2026-02-20",
    status: "Discharged"
  }
];

const statusColor = {
  Admitted: "green",
  Discharged: "grey",
  Transferred: "blue"
};

export default function Ipdadmissions() {
  const [admissions, setAdmissions] = useState(initialAdmissions);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredAdmissions = admissions.filter(a => {
    const matchesSearch =
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.admissionNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const dischargePatient = (id) => {
    setAdmissions(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: "Discharged" } : a
      )
    );
  };

  const transferPatient = (id) => {
    const newWard = prompt("Enter new ward name:");
    if (!newWard) return;

    setAdmissions(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, ward: newWard, status: "Transferred" }
          : a
      )
    );
  };

  const totalAdmissions = admissions.length;
  const activeAdmissions = admissions.filter(a => a.status === "Admitted").length;
  const discharged = admissions.filter(a => a.status === "Discharged").length;

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="bed icon"></i> IPD Admissions
        </h3>

        {/* SUMMARY CARDS */}
        <div className="ui three stackable cards mb-3">
          <div className="ui card">
            <div className="content">
              <div className="header">Total Admissions</div>
              <div className="description">{totalAdmissions}</div>
            </div>
          </div>

          <div className="ui card">
            <div className="content">
              <div className="header">Currently Admitted</div>
              <div className="description">{activeAdmissions}</div>
            </div>
          </div>

          <div className="ui card">
            <div className="content">
              <div className="header">Discharged</div>
              <div className="description">{discharged}</div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search by patient or admission no..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="six wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Admitted">Admitted</option>
              <option value="Transferred">Transferred</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>

          <div className="four wide column">
            <button
              className="ui grey fluid button"
              onClick={() => {
                setSearch('');
                setFilterStatus('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* ADMISSIONS TABLE */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Admission No</th>
                <th>Patient</th>
                <th>Ward</th>
                <th>Bed</th>
                <th>Doctor</th>
                <th>Nurse</th>
                <th>Date</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmissions.map(a => (
                <tr key={a.id}>
                  <td>{a.admissionNo}</td>
                  <td><strong>{a.patient}</strong></td>
                  <td>{a.ward}</td>
                  <td>{a.bed}</td>
                  <td>{a.doctor}</td>
                  <td>{a.nurse}</td>
                  <td>{a.date}</td>
                  <td>
                    <div className={`ui ${statusColor[a.status]} label`}>
                      {a.status}
                    </div>
                  </td>
                  <td>
                    {a.status === "Admitted" && (
                      <div>
                        <button
                          className="ui tiny orange button mr-1"
                          onClick={() => transferPatient(a.id)}
                        >
                          <i className="exchange icon"></i> Transfer
                        </button>

                        <button
                          className="ui tiny red button"
                          onClick={() => dischargePatient(a.id)}
                        >
                          <i className="sign-out icon"></i> Discharge
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredAdmissions.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No admissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ADD ADMISSION */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open New Admission Modal")}
          >
            <i className="add icon"></i> New Admission
          </button>
        </div>
      </div>
    </div>
  );
}