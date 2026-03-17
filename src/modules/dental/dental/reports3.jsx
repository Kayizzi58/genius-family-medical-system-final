import { h } from "preact";
import { useState } from "preact/hooks";

const statusColors = {
  draft: "grey",
  final: "blue",
  signed: "green"
};
const patients = [
  { id: "P001", name: "John Doe" },
  { id: "P002", name: "Jane Doe" },
  { id: "P003", name: "Mary Johnson" },
];
function Reports() {
  const [reports, setReports] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    patient: "",
    dentist: "",
    diagnosis: "",
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
    treatments: "",
    prescriptions: "",
    radiology: "",
    notes: "",
    status: "draft",
    date: new Date().toISOString().slice(0, 10)
  });

  const saveReport = () => {
    if (!form.patient || !form.diagnosis) return;

    setReports([...reports, { ...form, id: Date.now() }]);

    setForm({
      patient: "",
      dentist: "",
      diagnosis: "",
      subjective: "",
      objective: "",
      assessment: "",
      plan: "",
      treatments: "",
      prescriptions: "",
      radiology: "",
      notes: "",
      status: "draft",
      date: new Date().toISOString().slice(0, 10)
    });

    setOpen(false);
  };

  const updateStatus = (id, newStatus) => {
    setReports(prev =>
      prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filtered = reports.filter(r =>
    r.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div class="ui container" style="margin-top:20px;">

      {/* Header */}
      <div class="ui clearing segment">
        <h3 class="ui left floated header blue">
          <i class="file medical icon"></i>
          Clinical Reports
        </h3>

        <button
          class="ui right floated blue button"
          onClick={() => setOpen(true)}
        >
          <i class="add icon"></i> New Report
        </button>
      </div>

      {/* Search */}
      <input
        class="ui fluid input"
        placeholder="Search by patient..."
        value={search}
        onInput={e => setSearch(e.target.value)}
      />

      <br />

      {/* Reports Table */}
      <table class="ui celled striped table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Dentist</th>
            <th>Diagnosis</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? filtered.map(r => (
            <tr key={r.id}>
              <td>{r.patient}</td>
              <td>{r.dentist}</td>
              <td>{r.diagnosis}</td>
              <td>{r.date}</td>
              <td>
                <div class={`ui ${statusColors[r.status]} label`}>
                  {r.status}
                </div>
              </td>
              <td>
                {r.status === "draft" && (
                  <>
                    <button
                      class="ui blue mini button"
                      onClick={() => updateStatus(r.id, "final")}
                    >
                      Finalize
                    </button>
                    <button
                      class="ui green mini button"
                      onClick={() => updateStatus(r.id, "signed")}
                    >
                      Sign
                    </button>
                  </>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" class="center aligned">
                No reports found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ========================= */}
      {/* FULL SCREEN DIALOG */}
      {/* ========================= */}
      {open && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#fff",
          padding: "30px",
          overflowY: "auto",
          zIndex: 2000
        }}>

          <div class="ui clearing segment">
            <h2 class="ui left floated header">
              New Clinical Report
            </h2>

            <button
              class="ui right floated red button"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>

          <div class="ui form">

            <div class="two fields">
              <div class="field">
  <label>Patient</label>
  <input
    list="patient-list"
    value={form.patientName}
    placeholder="Type patient name..."
    onInput={e => {
      const val = e.target.value;
      setForm({ ...form, patientName: val });
    }}
  />
  <datalist id="patient-list">
    {patients.map(p => (
      <option key={p.id} value={p.name}>{p.id}</option>
    ))}
  </datalist>
</div>

              <div class="field">
                <label>Dentist</label>
                <input
                  value={form.dentist}
                  onInput={e => setForm({ ...form, dentist: e.target.value })}
                />
              </div>
            </div>

            <div class="field">
              <label>Primary Diagnosis</label>
              <input
                value={form.diagnosis}
                onInput={e => setForm({ ...form, diagnosis: e.target.value })}
              />
            </div>

            <h4 class="ui dividing header">SOAP Notes</h4>

            <div class="field">
              <label>Subjective</label>
              <textarea rows="3"
                value={form.subjective}
                onInput={e => setForm({ ...form, subjective: e.target.value })}
              />
            </div>

            <div class="field">
              <label>Objective</label>
              <textarea rows="3"
                value={form.objective}
                onInput={e => setForm({ ...form, objective: e.target.value })}
              />
            </div>

            <div class="field">
              <label>Assessment</label>
              <textarea rows="3"
                value={form.assessment}
                onInput={e => setForm({ ...form, assessment: e.target.value })}
              />
            </div>

            <div class="field">
              <label>Plan</label>
              <textarea rows="3"
                value={form.plan}
                onInput={e => setForm({ ...form, plan: e.target.value })}
              />
            </div>

            <h4 class="ui dividing header">Clinical Summary</h4>

            <div class="field">
              <label>Treatments Performed</label>
              <textarea rows="2"
                value={form.treatments}
                onInput={e => setForm({ ...form, treatments: e.target.value })}
              />
            </div>

            <div class="field">
              <label>Prescriptions Given</label>
              <textarea rows="2"
                value={form.prescriptions}
                onInput={e => setForm({ ...form, prescriptions: e.target.value })}
              />
            </div>

            <div class="field">
              <label>Radiology Findings</label>
              <textarea rows="2"
                value={form.radiology}
                onInput={e => setForm({ ...form, radiology: e.target.value })}
              />
            </div>

            <div class="field">
              <label>Additional Notes</label>
              <textarea rows="2"
                value={form.notes}
                onInput={e => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <br />

            <button
              class="ui positive button"
              onClick={saveReport}
            >
              Save Report
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Reports;