
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialAppointments = [
  { id: 1, staff: 'Dr. John Smith', type: 'Doctor', patient: 'Jane Doe', date: '2026-02-25', time: '10:00 AM', status: 'Scheduled' },
  { id: 2, staff: 'Nurse Anna', type: 'Nurse', patient: 'John Smith', date: '2026-02-25', time: '11:00 AM', status: 'Completed' },
  { id: 3, staff: 'Dr. Mary Lee', type: 'Dentist', patient: 'Paul Johnson', date: '2026-02-26', time: '02:00 PM', status: 'Scheduled' },
  { id: 4, staff: 'Nurse Brian', type: 'Nurse', patient: 'Mary Johnson', date: '2026-02-26', time: '03:00 PM', status: 'Cancelled' },
];

const statusColors = {
  Scheduled: 'blue',
  Completed: 'green',
  Cancelled: 'red',
  Rescheduled: 'orange',
};

export default function Staffappointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredAppointments = appointments.filter(a => {
    const matchesSearch = a.staff.toLowerCase().includes(search.toLowerCase()) || a.patient.toLowerCase().includes(search.toLowerCase());
    const matchesType = !filterType || a.type === filterType;
    const matchesStatus = !filterStatus || a.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const updateStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal"><i className="calendar check icon"></i> Staff Appointments</h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="four wide column">
            <div className="ui input fluid">
              <input
                type="text"
                placeholder="Search staff or patient..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="">All Staff Types</option>
              <option value="Doctor">Doctor</option>
              <option value="Dentist">Dentist</option>
              <option value="Nurse">Nurse</option>
            </select>
          </div>
          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>
          <div className="four wide column">
            <button className="ui grey fluid button" onClick={() => { setSearch(''); setFilterType(''); setFilterStatus(''); }}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Type</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? filteredAppointments.map(a => (
                <tr key={a.id}>
                  <td>{a.staff}</td>
                  <td>{a.type}</td>
                  <td>{a.patient}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <div className={`ui ${statusColors[a.status]} label`} style={{ textTransform: 'capitalize' }}>
                      {a.status}
                    </div>
                  </td>
                  
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}