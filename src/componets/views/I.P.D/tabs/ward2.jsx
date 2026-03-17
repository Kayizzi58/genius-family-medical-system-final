
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialWards = [
  {
    id: 1,
    wardName: "General Ward A",
    type: "General",
    totalBeds: 20,
    occupiedBeds: 15,
    nurseInCharge: "Nurse Anna",
    doctorAssigned: "Dr. Smith",
    status: "Active"
  },
  {
    id: 2,
    wardName: "ICU 1",
    type: "ICU",
    totalBeds: 10,
    occupiedBeds: 10,
    nurseInCharge: "Nurse Clara",
    doctorAssigned: "Dr. Adams",
    status: "Full"
  },
  {
    id: 3,
    wardName: "Maternity Ward",
    type: "Maternity",
    totalBeds: 12,
    occupiedBeds: 6,
    nurseInCharge: "Nurse Mercy",
    doctorAssigned: "Dr. Lee",
    status: "Active"
  }
];

const statusColor = {
  Active: "green",
  Full: "red",
  Maintenance: "yellow"
};

export default function Wardmanagement() {
  const [wards, setWards] = useState(initialWards);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredWards = wards.filter(ward => {
    const matchesSearch =
      ward.wardName.toLowerCase().includes(search.toLowerCase());
    const matchesType = !filterType || ward.type === filterType;
    return matchesSearch && matchesType;
  });

  const admitPatient = (id) => {
    setWards(prev =>
      prev.map(w => {
        if (w.id === id && w.occupiedBeds < w.totalBeds) {
          const newOccupied = w.occupiedBeds + 1;
          return {
            ...w,
            occupiedBeds: newOccupied,
            status: newOccupied === w.totalBeds ? "Full" : "Active"
          };
        }
        return w;
      })
    );
  };

  const dischargePatient = (id) => {
    setWards(prev =>
      prev.map(w => {
        if (w.id === id && w.occupiedBeds > 0) {
          return {
            ...w,
            occupiedBeds: w.occupiedBeds - 1,
            status: "Active"
          };
        }
        return w;
      })
    );
  };

  const totalBeds = wards.reduce((sum, w) => sum + w.totalBeds, 0);
  const totalOccupied = wards.reduce((sum, w) => sum + w.occupiedBeds, 0);
  const occupancyRate = ((totalOccupied / totalBeds) * 100).toFixed(1);

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="hospital icon"></i> IPD Ward Management
        </h3>

        {/* SUMMARY DASHBOARD */}
        <div className="ui four stackable cards mb-3">
          <div className="ui card">
            <div className="content">
              <div className="header">Total Wards</div>
              <div className="description">{wards.length}</div>
            </div>
          </div>

          <div className="ui card">
            <div className="content">
              <div className="header">Total Beds</div>
              <div className="description">{totalBeds}</div>
            </div>
          </div>

          <div className="ui card">
            <div className="content">
              <div className="header">Occupied Beds</div>
              <div className="description">{totalOccupied}</div>
            </div>
          </div>

          <div className="ui card">
            <div className="content">
              <div className="header">Occupancy Rate</div>
              <div className="description">{occupancyRate}%</div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="ui stackable grid mb-3">
          <div className="six wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search ward..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="six wide column">
            <select
              className="ui fluid dropdown"
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="General">General</option>
              <option value="ICU">ICU</option>
              <option value="Maternity">Maternity</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div className="four wide column">
            <button
              className="ui grey fluid button"
              onClick={() => {
                setSearch('');
                setFilterType('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* WARD TABLE */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Ward Name</th>
                <th>Type</th>
                <th>Total Beds</th>
                <th>Occupied</th>
                <th>Available</th>
                <th>Nurse In-Charge</th>
                <th>Assigned Doctor</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {filteredWards.map(w => (
                <tr key={w.id}>
                  <td><strong>{w.wardName}</strong></td>
                  <td>{w.type}</td>
                  <td>{w.totalBeds}</td>
                  <td>{w.occupiedBeds}</td>
                  <td>{w.totalBeds - w.occupiedBeds}</td>
                  <td>{w.nurseInCharge}</td>
                  <td>{w.doctorAssigned}</td>
                  <td>
                    <div className={`ui ${statusColor[w.status]} label`}>
                      {w.status}
                    </div>
                  </td>
                  <td>
                    <button
                      className="ui tiny green button mr-1"
                      onClick={() => admitPatient(w.id)}
                    >
                      <i className="plus icon"></i> Admit
                    </button>

                    <button
                      className="ui tiny orange button"
                      onClick={() => dischargePatient(w.id)}
                    >
                      <i className="minus icon"></i> Discharge
                    </button>
                  </td>
                </tr>
              ))}

              {filteredWards.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No wards found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ADD WARD BUTTON */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open Add Ward Modal")}
          >
            <i className="add icon"></i> Add New Ward
          </button>
        </div>
      </div>
    </div>
  );
}