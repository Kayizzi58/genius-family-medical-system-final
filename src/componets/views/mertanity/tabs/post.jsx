import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Postnatal() {

  const [records, setRecords] = useState([
    {
      id: 'PNC001',
      mother: 'Mary Johnson',
      baby: 'Baby Johnson',
      deliveryDate: '2026-02-20',
      mode: 'SVD',
      birthWeight: 3.2,
      apgar: '8/9',
      motherBP: '120/80',
      babyTemp: '36.7',
      risk: 'Low'
    },
    {
      id: 'PNC002',
      mother: 'Sarah Lee',
      baby: 'Baby Lee',
      deliveryDate: '2026-02-18',
      mode: 'C-Section',
      birthWeight: 2.1,
      apgar: '6/8',
      motherBP: '150/95',
      babyTemp: '37.9',
      risk: 'High'
    }
  ]);

  const riskColors = {
    Low: 'green',
    Moderate: 'yellow',
    High: 'red'
  };

  const addPostnatalRecord = () => {
    alert("Open PNC Registration Modal");
  };

  return (
    <div className="ui container fluid my-4">

      {/* Dashboard Cards */}
      <div className="ui stackable five cards mb-4">
        <div className="ui card blue">
          <div className="content">
            <div className="header">Total PNC Records</div>
            <div className="description">{records.length}</div>
          </div>
        </div>

        <div className="ui card green">
          <div className="content">
            <div className="header">Normal Deliveries</div>
            <div className="description">
              {records.filter(r => r.mode === 'SVD').length}
            </div>
          </div>
        </div>

        <div className="ui card purple">
          <div className="content">
            <div className="header">C-Sections</div>
            <div className="description">
              {records.filter(r => r.mode === 'C-Section').length}
            </div>
          </div>
        </div>

        <div className="ui card red">
          <div className="content">
            <div className="header">High Risk</div>
            <div className="description">
              {records.filter(r => r.risk === 'High').length}
            </div>
          </div>
        </div>

        <div className="ui card orange">
          <div className="content">
            <div className="header">Low Birth Weight (&lt;2.5kg)</div>
            <div className="description">
              {records.filter(r => r.birthWeight < 2.5).length}
            </div>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <button className="ui green button mb-3" onClick={addPostnatalRecord}>
        <i className="add icon"></i> New Postnatal Record
      </button>

      {/* PNC Table */}
      <div className="ui segment fluid raised">
        <h4 className="ui blue header">Postnatal Records</h4>
        <table className="ui celled fluid striped selectable table">
          <thead>
            <tr>
              <th>PNC No</th>
              <th>Mother</th>
              <th>Baby</th>
              <th>Delivery Date</th>
              <th>Mode</th>
              <th>Birth Weight (kg)</th>
              <th>APGAR</th>
              <th>Mother BP</th>
              <th>Baby Temp</th>
              <th>Risk</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.mother}</td>
                <td>{r.baby}</td>
                <td>{r.deliveryDate}</td>
                <td>{r.mode}</td>
                <td>{r.birthWeight}</td>
                <td>{r.apgar}</td>
                <td>{r.motherBP}</td>
                <td>{r.babyTemp}</td>
                <td>
                  <div className={`ui ${riskColors[r.risk]} label`}>
                    {r.risk}
                  </div>
                </td>
                <td>
                  <div className="ui buttons tiny">
                    <button className="ui blue button">
                      <i className="eye icon"></i> View
                    </button>
                    <button className="ui teal button">
                      <i className="heartbeat icon"></i> Follow-up
                    </button>
                    <button className="ui purple button">
                      <i className="syringe icon"></i> Immunize
                    </button>
                    <button className="ui orange button">
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