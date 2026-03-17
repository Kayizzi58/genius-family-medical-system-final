import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialAppointments = [
  { id: 1, patient: 'Jane Doe', doctor: 'Dr. Smith', department: 'Dental', date: '2026-02-25', time: '10:00 AM', status: 'Scheduled', notes: 'Routine checkup' },
  { id: 2, patient: 'John Smith', doctor: 'Dr. Adams', department: 'General Medicine', date: '2026-02-26', time: '11:30 AM', status: 'Completed', notes: 'Follow-up' },
  { id: 3, patient: 'Mary Johnson', doctor: 'Dr. Lee', department: 'ENT', date: '2026-02-27', time: '02:00 PM', status: 'Cancelled', notes: 'Patient requested reschedule' },
];

const statusColor = {
  Scheduled: 'blue',
  Completed: 'green',
  Cancelled: 'red',
  Rescheduled: 'orange'
};

export default function Opdappointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDoctor, setFilterDoctor] = useState('');
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    patient: '',
    department: '',
    doctor: '',
    date: new Date().toISOString().slice(0, 10),
    time: '',
    status: 'Scheduled',
    notes: ''
  });

  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = a.patient.toLowerCase().includes(search.toLowerCase()) || a.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || a.status === filterStatus;
    const matchesDoctor = !filterDoctor || a.doctor === filterDoctor;
    return matchesSearch && matchesStatus && matchesDoctor;
  });

  const updateStatus = (id, newStatus) => {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: newStatus } : a)
    );
  };

  const saveAppointment = () => {
    if (!form.patient || !form.department || !form.doctor || !form.time) return;

    setAppointments([
      ...appointments,
      { ...form, id: Date.now() }
    ]);

    setForm({
      patient: '',
      department: '',
      doctor: '',
      date: new Date().toISOString().slice(0, 10),
      time: '',
      status: 'Scheduled',
      notes: ''
    });

    setOpen(false);
  };

  return (
    <div className="ui container fluid my-4">
      <div className="card p-3 fluid shadow-sm">
        <h3 className="ui header teal">
          <i className="calendar alternate icon"></i> OPD Appointments
        </h3>

        {/* Filters */}
        <div className="ui stackable grid fluid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search patient or department..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="five wide column">
            <select
              className="ui fluid dropdown"
              value={filterDoctor}
              onChange={e => setFilterDoctor(e.target.value)}
            >
              <option value="">All Doctors</option>
              <option>Dr. Smith</option>
              <option>Dr. Adams</option>
              <option>Dr. Lee</option>
            </select>
          </div>

          <div className="five wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option>Scheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
              <option>Rescheduled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <table className="ui celled fluid striped selectable table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Department</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(a => (
              <tr key={a.id}>
                <td>{a.patient}</td>
                <td>{a.department}</td>
                <td>{a.doctor}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>
                  <div className={`ui ${statusColor[a.status]} label`}>
                    {a.status}
                  </div>
                </td>
                <td>{a.notes}</td>
                <td>
                  {a.status === 'Scheduled' && (
                    <div>
                      <button className="ui tiny green button mr-1" onClick={() => updateStatus(a.id, 'Completed')}>
                        <i className="check icon"></i> Complete
                      </button>
                      <button className="ui tiny red button mr-1" onClick={() => updateStatus(a.id, 'Cancelled')}>
                        <i className="close icon"></i> Cancel
                      </button>
                      <button className="ui tiny orange button" onClick={() => updateStatus(a.id, 'Rescheduled')}>
                        <i className="redo icon"></i> Reschedule
                      </button>
                    </div>
                  )}
                  {(a.status === 'Rescheduled' || a.status === 'Cancelled') && (
                    <button className="ui tiny blue button" onClick={() => updateStatus(a.id, 'Scheduled')}>
                      <i className="undo icon"></i> Reset
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredAppointments.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Appointment Button */}
        <div className="mt-3">
          <button className="ui blue button" onClick={() => setOpen(true)}>
            <i className="add icon"></i> Schedule New Appointment
          </button>
        </div>
      </div>

      {/* FULL-SCREEN NEW APPOINTMENT DIALOG */}
      {open && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#fff",
          zIndex: 1000,
          padding: "40px",
          overflowY: "auto"
        }}>
          <h2 className="ui dividing header">New OPD Appointment</h2>

          <div className="ui form">
            <div className="field">
              <label>Patient Name</label>
              <input
                placeholder="Enter patient name"
                value={form.patient}
                onInput={e => setForm({ ...form, patient: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Department</label>
              <select
                className="ui dropdown"
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
              >
                <option value="">Select Department</option>
                <option>Dental</option>
                <option>General Medicine</option>
                <option>ENT</option>
              </select>
            </div>

            <div className="field">
              <label>Doctor</label>
              <select
                className="ui dropdown"
                value={form.doctor}
                onChange={e => setForm({ ...form, doctor: e.target.value })}
              >
                <option value="">Select Doctor</option>
                <option>Dr. Smith</option>
                <option>Dr. Adams</option>
                <option>Dr. Lee</option>
              </select>
            </div>

            <div className="field">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onInput={e => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Time</label>
              <input
                type="time"
                value={form.time}
                onInput={e => setForm({ ...form, time: e.target.value })}
              />
            </div>

            <div className="field">
              <label>Reason / Notes</label>
              <textarea
                placeholder="Enter reason for visit or notes"
                value={form.notes}
                onInput={e => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button className="ui black button" onClick={() => setOpen(false)}>Cancel</button>
            <button className="ui positive button" onClick={saveAppointment} style={{ marginLeft: '10px' }}>Save Appointment</button>
          </div>
        </div>
      )}
    </div>
  );
}