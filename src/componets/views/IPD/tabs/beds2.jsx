
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialBeds = [
  {
    id: 1,
    ward: "General Ward A",
    bedNo: "Bed 01",
    patient: "Jane Doe",
    admissionNo: "ADM-1001",
    date: "2026-02-24",
    status: "Occupied"
  },
  {
    id: 2,
    ward: "General Ward A",
    bedNo: "Bed 02",
    patient: "",
    admissionNo: "",
    date: "",
    status: "Available"
  },
  {
    id: 3,
    ward: "ICU 1",
    bedNo: "Bed 01",
    patient: "John Smith",
    admissionNo: "ADM-1002",
    date: "2026-02-22",
    status: "Occupied"
  },
  {
    id: 4,
    ward: "Maternity Ward",
    bedNo: "Bed 03",
    patient: "",
    admissionNo: "",
    date: "",
    status: "Maintenance"
  }
];

const statusColor = {
  Available: "green",
  Occupied: "red",
  Reserved: "yellow",
  Maintenance: "grey"
};

export default function Bedassignment() {
  const [beds, setBeds] = useState(initialBeds);
  const [search, setSearch] = useState('');
  const [filterWard, setFilterWard] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredBeds = beds.filter(b => {
    const matchesSearch =
      b.bedNo.toLowerCase().includes(search.toLowerCase()) ||
      (b.patient && b.patient.toLowerCase().includes(search.toLowerCase()));
    const matchesWard = !filterWard || b.ward === filterWard;
    const matchesStatus = !filterStatus || b.status === filterStatus;
    return matchesSearch && matchesWard && matchesStatus;
  });

  const assignBed = (id) => {
    const patient = prompt("Enter Patient Name:");
    const admissionNo = prompt("Enter Admission No:");

    if (!patient || !admissionNo) return;

    setBeds(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              patient,
              admissionNo,
              date: new Date().toISOString().split("T")[0],
              status: "Occupied"
            }
          : b
      )
    );
  };

  const releaseBed = (id) => {
    setBeds(prev =>
      prev.map(b =>
        b.id === id
          ? {
              ...b,
              patient: "",
              admissionNo: "",
              date: "",
              status: "Available"
            }
          : b
      )
    );
  };

  const reserveBed = (id) => {
    setBeds(prev =>
      prev.map(b =>
        b.id === id ? { ...b, status: "Reserved" } : b
      )
    );
  };

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter(b => b.status === "Occupied").length;
  const availableBeds = beds.filter(b => b.status === "Available").length;
  const maintenanceBeds = beds.filter(b => b.status === "Maintenance").length;

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="bed icon"></i> Bed Assignment Management
        </h3>

        {/* SUMMARY DASHBOARD */}
        <div className="ui four stackable cards mb-3">
          <div className="ui card"><div className="content">
            <div className="header">Total Beds</div>
            <div className="description">{totalBeds}</div>
          </div></div>

          <div className="ui card"><div className="content">
            <div className="header">Occupied</div>
            <div className="description">{occupiedBeds}</div>
          </div></div>

          <div className="ui card"><div className="content">
            <div className="header">Available</div>
            <div className="description">{availableBeds}</div>
          </div></div>

          <div className="ui card"><div className="content">
            <div className="header">Maintenance</div>
            <div className="description">{maintenanceBeds}</div>
          </div></div>
        </div>

        {/* FILTERS */}
        <div className="ui stackable grid mb-3">
          <div className="four wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search bed or patient..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterWard}
              onChange={e => setFilterWard(e.target.value)}
            >
              <option value="">All Wards</option>
              <option>General Ward A</option>
              <option>ICU 1</option>
              <option>Maternity Ward</option>
            </select>
          </div>

          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option>Available</option>
              <option>Occupied</option>
              <option>Reserved</option>
              <option>Maintenance</option>
            </select>
          </div>

          <div className="four wide column">
            <button
              className="ui grey fluid button"
              onClick={() => {
                setSearch('');
                setFilterWard('');
                setFilterStatus('');
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* BED TABLE */}
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Ward</th>
              <th>Bed No</th>
              <th>Patient</th>
              <th>Admission No</th>
              <th>Assigned Date</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeds.map(b => (
              <tr key={b.id}>
                <td>{b.ward}</td>
                <td><strong>{b.bedNo}</strong></td>
                <td>{b.patient || "-"}</td>
                <td>{b.admissionNo || "-"}</td>
                <td>{b.date || "-"}</td>
                <td>
                  <div className={`ui ${statusColor[b.status]} label`}>
                    {b.status}
                  </div>
                </td>
                <td>
                  {b.status === "Available" && (
                    <div>
                      <button
                        className="ui tiny green button mr-1"
                        onClick={() => assignBed(b.id)}
                      >
                        <i className="plus icon"></i> Assign
                      </button>

                      <button
                        className="ui tiny yellow button"
                        onClick={() => reserveBed(b.id)}
                      >
                        <i className="bookmark icon"></i> Reserve
                      </button>
                    </div>
                  )}

                  {b.status === "Occupied" && (
                    <button
                      className="ui tiny red button"
                      onClick={() => releaseBed(b.id)}
                    >
                      <i className="sign-out icon"></i> Release
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredBeds.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No beds found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}