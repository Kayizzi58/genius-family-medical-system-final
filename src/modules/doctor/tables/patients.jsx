import { useState } from "preact/hooks";

const initialPatients = [
  {
    id: "PT-001",
    name: "John Doe",
    MRN: "MRN-004567",
    age: 34,
    gender: "Male",
    department: "OPD",
    lastVisit: "2026-02-20",
    primaryDoctor: "Dr. Smith",
    status: "Active",
    phone: "+1 555-2233",
    bloodGroup: "O+",
    balance: 120.5,
    insurance: "AXA Health",
    ward: "-",
    bed: "-",
    risk: false,
  },
  {
    id: "PT-002",
    name: "Jane Smith",
    MRN: "MRN-004568",
    age: 28,
    gender: "Female",
    department: "IPD",
    lastVisit: "2026-02-18",
    primaryDoctor: "Dr. Smith",
    status: "Active",
    phone: "+1 555-9988",
    bloodGroup: "A-",
    balance: 0,
    insurance: "Self Pay",
    ward: "Ward A",
    bed: "Bed 12",
    risk: true,
  },
];

export default function Patientss() {
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
    gender: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.currentTarget;
    setFilters({ ...filters, [name]: value });
  };

  const archivePatient = (id) => {
    if (confirm("Archive this patient?")) {
      setPatients(
        patients.map((p) =>
          p.id === id ? { ...p, status: "Archived" } : p
        )
      );
    }
  };

  const filteredPatients = patients.filter((p) => {
    return (
      (filters.search === "" ||
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.MRN.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.department === "" || p.department === filters.department) &&
      (filters.status === "" || p.status === filters.status) &&
      (filters.gender === "" || p.gender === filters.gender)
    );
  });

  const statusColor = (status) => {
    if (status === "Active") return "green";
    if (status === "Archived") return "grey";
    return "blue";
  };

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Enterprise Patient Management</h3>

      {/* Filters */}
      <form className="ui form">
        <div className="four fields">
          <div className="field">
            <input
              type="text"
              name="search"
              placeholder="Search Name or MRN"
              value={filters.search}
              onInput={handleFilterChange}
            />
          </div>
          <div className="field">
            <select name="department" value={filters.department} onChange={handleFilterChange}>
              <option value="">All Departments</option>
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
            </select>
          </div>
          <div className="field">
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <div className="field">
            <select name="gender" value={filters.gender} onChange={handleFilterChange}>
              <option value="">All Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </form>

      <div className="ui divider"></div>

      {/* Patients Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>MRN</th>
            <th>Name</th>
            <th>Dept</th>
            <th>Doctor</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Risk</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p) => (
              <tr key={p.id}>
                <td>{p.MRN}</td>
                <td>{p.name}</td>
                <td>{p.department}</td>
                <td>{p.primaryDoctor}</td>
                <td>
                  <div className={`ui ${p.balance > 0 ? "red" : "green"} label`}>
                    ${p.balance.toFixed(2)}
                  </div>
                </td>
                <td>
                  <div className={`ui ${statusColor(p.status)} label`}>
                    {p.status}
                  </div>
                </td>
                <td>
                  {p.risk && <div className="ui red label">High Risk</div>}
                </td>
                <td>
                  <div className="ui mini buttons">
                    <button
                      className="ui blue button"
                      onClick={() => setSelectedPatient(p)}
                    >
                      View
                    </button>
                    <button
                      className="ui red button"
                      onClick={() => archivePatient(p.id)}
                    >
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="center aligned">
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* View Dialog */}
      {selectedPatient && (
        <div className="ui dimmer modals visible active">
          <div className="ui large modal visible active">
            <div className="header">
              Patient Details - {selectedPatient.name}
            </div>
            <div className="content">
              <div className="ui grid">
                <div className="eight wide column">
                  <p><b>MRN:</b> {selectedPatient.MRN}</p>
                  <p><b>Age:</b> {selectedPatient.age}</p>
                  <p><b>Gender:</b> {selectedPatient.gender}</p>
                  <p><b>Phone:</b> {selectedPatient.phone}</p>
                  <p><b>Blood Group:</b> {selectedPatient.bloodGroup}</p>
                </div>
                <div className="eight wide column">
                  <p><b>Department:</b> {selectedPatient.department}</p>
                  <p><b>Doctor:</b> {selectedPatient.primaryDoctor}</p>
                  <p><b>Insurance:</b> {selectedPatient.insurance}</p>
                  <p><b>Ward:</b> {selectedPatient.ward}</p>
                  <p><b>Bed:</b> {selectedPatient.bed}</p>
                </div>
              </div>
            </div>
            <div className="actions">
              <button
                className="ui button"
                onClick={() => setSelectedPatient(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}