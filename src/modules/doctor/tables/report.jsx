import { h } from "preact";
import { useState } from "preact/hooks";

const initialReports = [
  {
    id: "RPT-001",
    patientName: "John Doe",
    MRN: "MRN-004567",
    type: "Blood Test",
    description: "CBC and hemoglobin levels",
    date: "2026-02-24",
    createdBy: "Dr. Smith",
  },
  {
    id: "RPT-002",
    patientName: "Jane Smith",
    MRN: "MRN-004568",
    type: "X-Ray",
    description: "Chest X-ray analysis",
    date: "2026-02-23",
    createdBy: "Dr. Smith",
  },
];

export default function Reports({ doctorName }) {
  const [reports, setReports] = useState(initialReports);
  const [filters, setFilters] = useState({ search: "", type: "", date: "" });

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogReport, setDialogReport] = useState(null);
  const [dialogMode, setDialogMode] = useState("view"); // "view", "edit", "add"

  const emptyReport = {
    patientName: "",
    MRN: "",
    type: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.currentTarget;
    setFilters({ ...filters, [name]: value });
  };

  const openReportDialog = (report, mode) => {
    setDialogReport(report || emptyReport);
    setDialogMode(mode);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogReport(null);
  };

  const handleDialogChange = (e) => {
    const { name, value } = e.currentTarget;
    setDialogReport({ ...dialogReport, [name]: value });
  };

  const saveDialogEdit = () => {
    if (dialogMode === "edit") {
      setReports(reports.map(r => r.id === dialogReport.id ? dialogReport : r));
    } else if (dialogMode === "add") {
      const newRpt = { ...dialogReport, id: `RPT-${Date.now()}`, createdBy: doctorName };
      setReports([newRpt, ...reports]);
    }
    closeDialog();
  };

  const filteredReports = reports.filter(r =>
    (filters.search === "" ||
      r.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.MRN.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.type === "" || r.type.toLowerCase().includes(filters.type.toLowerCase())) &&
    (filters.date === "" || r.date === filters.date)
  );

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Patient Reports</h3>

      {/* Filters */}
      <div className="ui segment">
        <div className="ui stackable grid">
          <div className="four wide column">
            <input
              type="text"
              name="search"
              placeholder="Search Patient / MRN"
              value={filters.search}
              onInput={handleFilterChange}
              className="ui fluid input"
            />
          </div>
          <div className="four wide column">
            <input
              type="text"
              name="type"
              placeholder="Filter by Type"
              value={filters.type}
              onInput={handleFilterChange}
              className="ui fluid input"
            />
          </div>
          <div className="four wide column">
            <input
              type="date"
              name="date"
              value={filters.date}
              onInput={handleFilterChange}
              className="ui fluid input"
            />
          </div>
          <div className="four wide column">
            <button className="ui grey button fluid" onClick={() => setFilters({ search: "", type: "", date: "" })}>
              Clear Filters
            </button>
          </div>
        </div>
        <div className="ui small grey text mt-2">
          Showing {filteredReports.length} of {reports.length} records
        </div>
      </div>

      {/* Add Report */}
      <button className="ui green button mb-3" onClick={() => openReportDialog(emptyReport, "add")}>
        <i className="add icon"></i> Add Report
      </button>

      {/* Reports Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Patient Name</th>
            <th>MRN</th>
            <th>Type</th>
            <th>Description</th>
            <th>Date</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length > 0 ? filteredReports.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.patientName}</td>
              <td>{r.MRN}</td>
              <td>{r.type}</td>
              <td>{r.description}</td>
              <td>{r.date}</td>
              <td>{r.createdBy}</td>
              <td>
                <div className="ui tiny buttons">
                  <button className="ui blue mini button" onClick={() => openReportDialog(r, "view")}>View</button>
                  <button className="ui orange mini button" onClick={() => openReportDialog(r, "edit")}>Edit</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="8" className="center aligned">No reports found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Full-Screen Dialog */}
      {dialogOpen && (
        <div className="ui fullscreen modal active" style={{
          display: "flex",
          flexDirection: "column",
          padding: "2em",
          background: "white",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          zIndex: 1000,
        }}>
          <h2 className="ui header">
            {dialogMode === "view" ? "View Report" : dialogMode === "edit" ? "Edit Report" : "Add Report"}
          </h2>

          <div className="ui form">
            <div className="field">
              <label>Patient Name</label>
              <input type="text" name="patientName" value={dialogReport.patientName} onInput={dialogMode !== "view" ? handleDialogChange : undefined} disabled={dialogMode === "view"} />
            </div>
            <div className="field">
              <label>MRN</label>
              <input type="text" name="MRN" value={dialogReport.MRN} onInput={dialogMode !== "view" ? handleDialogChange : undefined} disabled={dialogMode === "view"} />
            </div>
            <div className="field">
              <label>Type</label>
              <input type="text" name="type" value={dialogReport.type} onInput={dialogMode !== "view" ? handleDialogChange : undefined} disabled={dialogMode === "view"} />
            </div>
            <div className="field">
              <label>Description</label>
              <input type="text" name="description" value={dialogReport.description} onInput={dialogMode !== "view" ? handleDialogChange : undefined} disabled={dialogMode === "view"} />
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" name="date" value={dialogReport.date} onInput={dialogMode !== "view" ? handleDialogChange : undefined} disabled={dialogMode === "view"} />
            </div>
            <div className="field">
              <label>Created By</label>
              <input type="text" value={dialogReport.createdBy || doctorName} disabled />
            </div>
          </div>

          <div style={{ marginTop: "1em" }}>
            <button className="ui button" onClick={closeDialog}>Close</button>
            {dialogMode !== "view" && (
              <button className="ui green button" style={{ marginLeft: "0.5em" }} onClick={saveDialogEdit}>
                {dialogMode === "add" ? "Add Report" : "Save Changes"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}