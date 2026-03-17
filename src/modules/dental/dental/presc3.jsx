import { h } from 'preact';
import { useState } from 'preact/hooks';

const statusColors = {
  pending: 'yellow',
  given: 'green',
  cancelled: 'red',
};

function Presc() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    patient: '',
    dentist: '',
    medications: [{ name: '', dosage: '', cost: 0 }],
    status: 'pending'
  });

  // ==============================
  // Add Medication Row
  // ==============================
  const addMedicationRow = () => {
    setForm({
      ...form,
      medications: [...form.medications, { name: '', dosage: '', cost: 0 }]
    });
  };

  const updateMedication = (index, field, value) => {
    const updated = [...form.medications];
    updated[index][field] = value;
    setForm({ ...form, medications: updated });
  };

  const totalCost = form.medications.reduce(
    (sum, m) => sum + Number(m.cost || 0),
    0
  );

  // ==============================
  // Save Prescription
  // ==============================
  const savePrescription = () => {
    const newPrescription = {
      id: Date.now(),
      ...form,
      totalCost,
    };

    setPrescriptions([...prescriptions, newPrescription]);

    setForm({
      patient: '',
      dentist: '',
      medications: [{ name: '', dosage: '', cost: 0 }],
      status: 'pending'
    });

    setOpen(false);
  };

  const updateStatus = (id, newStatus) => {
    setPrescriptions(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const filtered = prescriptions.filter(p => {
    const matchesSearch =
      p.patient.toLowerCase().includes(search.toLowerCase()) ||
      p.dentist.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div class="ui container" style="margin-top:20px; position:relative;">

      {/* Header */}
      <div class="ui clearing segment">
        <h3 class="ui left floated header blue">
          <i class="file alternate icon"></i>
          Prescriptions
        </h3>

        <button
          class="ui right floated blue button"
          onClick={() => setOpen(true)}
        >
          <i class="add icon"></i> New Prescription
        </button>
      </div>

      {/* Filters */}
      <div class="ui stackable grid">
        <div class="eight wide column">
          <input
            type="text"
            class="ui fluid input"
            placeholder="Search patient or dentist..."
            value={search}
            onInput={e => setSearch(e.target.value)}
          />
        </div>

        <div class="four wide column">
          <select
            class="ui fluid dropdown"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="given">Given</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div class="four wide column">
          <button
            class="ui grey fluid button"
            onClick={() => {
              setSearch('');
              setFilterStatus('');
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <br />

      {/* Table */}
      <table class="ui celled striped table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Dentist</th>
            <th>Medications</th>
            <th>Total Cost</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? filtered.map(p => (
            <tr key={p.id}>
              <td>{p.patient}</td>
              <td>{p.dentist}</td>
              <td>
                <ul style={{ paddingLeft: '1rem' }}>
                  {p.medications.map((m, i) => (
                    <li key={i}>
                      {m.name} — {m.dosage}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{p.totalCost.toLocaleString()}</td>
              <td>
                <div class={`ui ${statusColors[p.status]} label`}>
                  {p.status}
                </div>
              </td>
              <td>
                {p.status === 'pending' ? (
                  <>
                    <button
                      class="ui green mini button"
                      onClick={() => updateStatus(p.id, 'given')}
                    >
                      Mark Given
                    </button>
                    <button
                      class="ui red mini button"
                      onClick={() => updateStatus(p.id, 'cancelled')}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <span style="color:grey;">No actions</span>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" class="center aligned">
                No prescriptions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ============================= */}
      {/* SIDE DIALOG PANEL */}
      {/* ============================= */}
      {open && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '450px',
          background: '#fff',
          boxShadow: '-2px 0 10px rgba(0,0,0,0.2)',
          padding: '20px',
          overflowY: 'auto',
          zIndex: 1000
        }}>

          <h4 class="ui dividing header">
            New Prescription
          </h4>

          <div class="ui form">

            <div class="field">
              <label>Patient</label>
              <input
                type="text"
                value={form.patient}
                onInput={e => setForm({ ...form, patient: e.target.value })}
              />
            </div>

            <div class="field">
              <label>Dentist</label>
              <input
                type="text"
                value={form.dentist}
                onInput={e => setForm({ ...form, dentist: e.target.value })}
              />
            </div>

            <h5 class="ui dividing header">Medications</h5>

            {form.medications.map((m, index) => (
              <div class="three fields" key={index}>
                <div class="field">
                  <input
                    placeholder="Medication"
                    value={m.name}
                    onInput={e =>
                      updateMedication(index, 'name', e.target.value)
                    }
                  />
                </div>

                <div class="field">
                  <input
                    placeholder="Dosage"
                    value={m.dosage}
                    onInput={e =>
                      updateMedication(index, 'dosage', e.target.value)
                    }
                  />
                </div>

                <div class="field">
                  <input
                    type="number"
                    placeholder="Cost"
                    value={m.cost}
                    onInput={e =>
                      updateMedication(index, 'cost', e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              class="ui mini blue button"
              onClick={addMedicationRow}
            >
              Add Medication
            </button>

            <div class="ui segment" style="margin-top:15px;">
              <strong>Total Cost: </strong>
              {totalCost.toLocaleString()}
            </div>

          </div>

          <div style="margin-top:20px;">
            <button
              class="ui black button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>

            <button
              class="ui positive button"
              onClick={savePrescription}
            >
              Save Prescription
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

export default Presc;