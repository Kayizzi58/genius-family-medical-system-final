
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialLabOrders = [
  { id: 1, patient: 'John Doe', type: 'Blood Test', doctor: 'Dr. Smith', date: '2026-02-24', status: 'pending', priority: 'normal', results: '' },
  { id: 2, patient: 'Jane Smith', type: 'X-ray', doctor: 'Dr. Lee', date: '2026-02-23', status: 'in-progress', priority: 'urgent', results: '' },
  { id: 3, patient: 'Mary Johnson', type: 'Urine Test', doctor: 'Dr. Smith', date: '2026-02-22', status: 'completed', priority: 'normal', results: 'Normal' },
];

const statusColors = {
  pending: 'yellow',
  'in-progress': 'blue',
  completed: 'green',
  cancelled: 'red',
};

const priorityColors = {
  normal: 'grey',
  urgent: 'red',
};

const statusCycle = ['pending', 'in-progress', 'completed'];

export default function Laborders() {
  const [orders, setOrders] = useState(initialLabOrders);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const filtered = orders.filter(o => {
    const matchesSearch =
      o.patient.toLowerCase().includes(search.toLowerCase()) ||
      o.type.toLowerCase().includes(search.toLowerCase()) ||
      o.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || o.status === filterStatus;
    const matchesPriority = !filterPriority || o.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const cycleStatus = (id) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === id && o.status !== 'cancelled') {
          const index = statusCycle.indexOf(o.status);
          const next = statusCycle[(index + 1) % statusCycle.length];
          return { ...o, status: next };
        }
        return o;
      })
    );
  };

  const cancelOrder = (id) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: 'cancelled' } : o)));
  };

  const revertOrder = (id, prevStatus = 'pending') => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: prevStatus } : o)));
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal"><i className="flask icon"></i> Lab Orders</h3>

        {/* Filters */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <input
              type="text"
              className="ui fluid input"
              placeholder="Search by patient, doctor, or type..."
              value={search}
              onInput={e => setSearch(e.target.value)}
            />
          </div>
          <div className="three wide column">
            <select className="ui fluid dropdown" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              {statusCycle.concat(['cancelled']).map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="three wide column">
            <select className="ui fluid dropdown" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
              <option value="">All Priorities</option>
              {Object.keys(priorityColors).map(p => (
                <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="four wide column">
            <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); setFilterPriority(''); }}>
              Clear
            </button>
          </div>
        </div>

        {/* Lab Orders Table */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Order Type</th>
                <th>Doctor</th>
                <th>Date Ordered</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Results</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(o => (
                <tr key={o.id}>
                  <td>{o.patient}</td>
                  <td>{o.type}</td>
                  <td>{o.doctor}</td>
                  <td>{o.date}</td>
                  <td><div className={`ui ${priorityColors[o.priority]} label`} style={{ textTransform: 'capitalize' }}>{o.priority}</div></td>
                  <td><div className={`ui ${statusColors[o.status]} label`} style={{ textTransform: 'capitalize' }}>{o.status}</div></td>
                  <td>{o.results || '-'}</td>
                  <td>
                    {o.status !== 'cancelled' && (
                      <div>
                        <button className="ui mini blue button mr-1" onClick={() => cycleStatus(o.id)}>Next Status</button>
                        <button className="ui mini red button" onClick={() => cancelOrder(o.id)}>Cancel</button>
                      </div>
                    )}
                    {o.status === 'cancelled' && (
                      <button className="ui mini grey button" onClick={() => revertOrder(o.id)}>Revert</button>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center">No lab orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}