import { useState } from "preact/hooks";

// Sample medications data
const initialMeds = [
  {
    id: "MED-001",
    patientName: "John Doe",
    MRN: "MRN-004567",
    department: "IPD",
    drug: "Paracetamol",
    dosage: "500mg",
    route: "Oral",
    frequency: "3 times/day",
    timing: "08:00, 14:00, 20:00",
    status: "Pending",
    notes: "",
  },
  {
    id: "MED-002",
    patientName: "Jane Smith",
    MRN: "MRN-004568",
    department: "Maternity",
    drug: "Amoxicillin",
    dosage: "250mg",
    route: "Oral",
    frequency: "2 times/day",
    timing: "09:00, 21:00",
    status: "Administered",
    notes: "Given with food",
  },
];

export default function Medss({ nurseName }) {
  const [medications, setMedications] = useState(initialMeds);
  const [filters, setFilters] = useState({ search: "", department: "", status: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMed, setEditingMed] = useState(null);

  // 🔹 Filter handling
  const handleFilterChange = (e) => {
    const { name, value } = e.currentTarget;
    setFilters({ ...filters, [name]: value });
  };

  const filteredMeds = medications.filter((m) => {
    return (
      (filters.search === "" ||
        m.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        m.MRN.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.department === "" || m.department === filters.department) &&
      (filters.status === "" || m.status === filters.status)
    );
  });

  // 🔹 Administer medication
  const markAsAdministered = (id) => {
    setMedications(
      medications.map((m) =>
        m.id === id ? { ...m, status: "Administered", notes: m.notes || "Administered by " + nurseName } : m
      )
    );
  };

  // 🔹 Open dialog for add/edit
  const openDialog = (med = null) => {
    setEditingMed(
      med || {
        id: `MED-${medications.length + 1}`.padStart(6, "0"),
        patientName: "",
        MRN: "",
        department: "",
        drug: "",
        dosage: "",
        route: "",
        frequency: "",
        timing: "",
        status: "Pending",
        notes: "",
      }
    );
    setDialogOpen(true);
  };

  // 🔹 Close dialog
  const closeDialog = () => {
    setEditingMed(null);
    setDialogOpen(false);
  };

  // 🔹 Handle input changes in dialog
  const handleDialogInput = (e) => {
    const { name, value } = e.currentTarget;
    setEditingMed({ ...editingMed, [name]: value });
  };

  // 🔹 Save medication (add or update)
  const saveMedication = (e) => {
    e.preventDefault();
    if (!editingMed.patientName || !editingMed.MRN || !editingMed.drug) {
      alert("Patient Name, MRN, and Drug are required");
      return;
    }
    setMedications((prev) => {
      const exists = prev.find((m) => m.id === editingMed.id);
      if (exists) {
        return prev.map((m) => (m.id === editingMed.id ? editingMed : m));
      }
      return [editingMed, ...prev];
    });
    closeDialog();
  };

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Medications Management - Nurse {nurseName}</h3>

      {/* 🔹 Filters */}
      <form className="ui form">
        <div className="three fields">
          <div className="field">
            <input
              type="text"
              name="search"
              placeholder="Search Patient / MRN"
              value={filters.search}
              onInput={handleFilterChange}
            />
          </div>
          <div className="field">
            <select
              className="ui dropdown"
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All Departments</option>
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
              <option value="Maternity">Maternity</option>
              <option value="Dental">Dental</option>
            </select>
          </div>
          <div className="field">
            <select
              className="ui dropdown"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Administered">Administered</option>
              <option value="Missed">Missed</option>
            </select>
          </div>
        </div>
      </form>

      <div className="ui divider"></div>

      {/* 🔹 Add Medication Button */}
      <button className="ui green button" onClick={() => openDialog()}>
        Add Medication
      </button>

      <div className="ui divider"></div>

      {/* 🔹 Medications Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>MRN</th>
            <th>Department</th>
            <th>Drug</th>
            <th>Dosage</th>
            <th>Route</th>
            <th>Frequency</th>
            <th>Timing</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMeds.length > 0 ? (
            filteredMeds.map((m) => (
              <tr
                key={m.id}
                className={m.status === "Pending" ? "" : m.status === "Missed" ? "red" : "green"}
              >
                <td>{m.patientName}</td>
                <td>{m.MRN}</td>
                <td>{m.department}</td>
                <td>{m.drug}</td>
                <td>{m.dosage}</td>
                <td>{m.route}</td>
                <td>{m.frequency}</td>
                <td>{m.timing}</td>
                <td>{m.status}</td>
                <td>{m.notes}</td>
                <td>
                  <div className="ui buttons">
                    {m.status !== "Administered" && (
                      <button
                        className="ui green mini button"
                        onClick={() => markAsAdministered(m.id)}
                      >
                        Administer
                      </button>
                    )}
                    <button className="ui blue mini button" onClick={() => openDialog(m)}>
                      View / Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="center aligned" colSpan="11">
                No medications found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔹 Fullscreen Dialog for Add / Edit */}
      {dialogOpen && (
        <div className="ui fullscreen modal visible active">
          <div className="header">Medication Details</div>
          <div className="content">
            <form className="ui form" onSubmit={saveMedication}>
              <div className="two fields">
                <div className="field">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={editingMed.patientName}
                    onInput={handleDialogInput}
                  />
                </div>
                <div className="field">
                  <label>MRN</label>
                  <input type="text" name="MRN" value={editingMed.MRN} onInput={handleDialogInput} />
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <label>Department</label>
                  <select name="department" value={editingMed.department} onChange={handleDialogInput}>
                    <option value="">Select</option>
                    <option value="OPD">OPD</option>
                    <option value="IPD">IPD</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Dental">Dental</option>
                  </select>
                </div>
                <div className="field">
                  <label>Drug</label>
                  <input type="text" name="drug" value={editingMed.drug} onInput={handleDialogInput} />
                </div>
              </div>
              <div className="four fields">
                <div className="field">
                  <label>Dosage</label>
                  <input type="text" name="dosage" value={editingMed.dosage} onInput={handleDialogInput} />
                </div>
                <div className="field">
                  <label>Route</label>
                  <input type="text" name="route" value={editingMed.route} onInput={handleDialogInput} />
                </div>
                <div className="field">
                  <label>Frequency</label>
                  <input type="text" name="frequency" value={editingMed.frequency} onInput={handleDialogInput} />
                </div>
                <div className="field">
                  <label>Timing</label>
                  <input type="text" name="timing" value={editingMed.timing} onInput={handleDialogInput} />
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <label>Status</label>
                  <select name="status" value={editingMed.status} onChange={handleDialogInput}>
                    <option value="Pending">Pending</option>
                    <option value="Administered">Administered</option>
                    <option value="Missed">Missed</option>
                  </select>
                </div>
                <div className="field">
                  <label>Notes</label>
                  <input type="text" name="notes" value={editingMed.notes} onInput={handleDialogInput} />
                </div>
              </div>
              <button type="submit" className="ui green button">Save</button>
              <button type="button" className="ui red button" onClick={closeDialog}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}