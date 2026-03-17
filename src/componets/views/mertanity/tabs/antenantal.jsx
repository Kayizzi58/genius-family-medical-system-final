import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Antenatal() {

  const [patients, setPatients] = useState([
    {
      id: 'ANC001',
      name: 'Mary Johnson',
      age: 28,
      gravida: 2,
      parity: 1,
      lmp: '2025-08-01',
      edd: '2026-05-08',
      bloodGroup: 'O+',
      risk: 'Low',
      lastVisit: '2026-02-20'
    },
    {
      id: 'ANC002',
      name: 'Sarah Lee',
      age: 35,
      gravida: 3,
      parity: 2,
      lmp: '2025-07-15',
      edd: '2026-04-22',
      bloodGroup: 'A-',
      risk: 'High',
      lastVisit: '2026-02-22'
    }
  ]);

  const riskColors = {
    Low: 'green',
    Moderate: 'yellow',
    High: 'red'
  };

  const addPatient = () => {
    alert("Open modal for ANC registration form");
  };

  return (
    <div className="ui container fluid my-4">

      {/* Dashboard Summary */}
      <div className="ui stackable four cards mb-4">
        <div className="ui card blue">
          <div className="content">
            <div className="header">Total ANC Patients</div>
            <div className="description">{patients.length}</div>
          </div>
        </div>

        <div className="ui card red">
          <div className="content">
            <div className="header">High Risk</div>
            <div className="description">
              {patients.filter(p => p.risk === 'High').length}
            </div>
          </div>
        </div>

        <div className="ui card green">
          <div className="content">
            <div className="header">Due This Month</div>
            <div className="description">3</div>
          </div>
        </div>

        <div className="ui card orange">
          <div className="content">
            <div className="header">Missed Visits</div>
            <div className="description">1</div>
          </div>
        </div>
      </div>

      {/* Registration Button */}
      <button className="ui green button mb-3" onClick={addPatient}>
        <i className="add icon"></i> Register New ANC Patient
      </button>

      {/* Patient Table */}
      <div className="ui segment raised">
        <h4 className="ui blue header">Antenatal Patients</h4>
        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>ANC No</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gravida/Parity</th>
              <th>LMP</th>
              <th>EDD</th>
              <th>Blood Group</th>
              <th>Risk</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gravida}/{p.parity}</td>
                <td>{p.lmp}</td>
                <td>{p.edd}</td>
                <td>{p.bloodGroup}</td>
                <td>
                  <div className={`ui ${riskColors[p.risk]} label`}>
                    {p.risk}
                  </div>
                </td>
                <td>{p.lastVisit}</td>
                <td>
                  <div className="ui buttons tiny">
                    <button className="ui blue button">
                      <i className="eye icon"></i> View
                    </button>
                    <button className="ui teal button">
                      <i className="calendar icon"></i> New Visit
                    </button>
                    <button className="ui purple button">
                      <i className="file alternate icon"></i> Report
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}