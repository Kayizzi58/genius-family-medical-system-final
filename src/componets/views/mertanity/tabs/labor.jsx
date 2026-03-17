import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Labor() {

  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL001',
      mother: 'Mary Johnson',
      ancNo: 'ANC001',
      admission: '2026-02-25 08:30',
      mode: 'SVD',
      dilation: 10,
      fhr: 140,
      bp: '120/80',
      bloodLoss: 300,
      birthWeight: 3.2,
      apgar: '8/9',
      risk: 'Low'
    },
    {
      id: 'DEL002',
      mother: 'Sarah Lee',
      ancNo: 'ANC002',
      admission: '2026-02-24 19:10',
      mode: 'C-Section',
      dilation: 6,
      fhr: 95,
      bp: '160/100',
      bloodLoss: 700,
      birthWeight: 2.1,
      apgar: '6/8',
      risk: 'High'
    }
  ]);

  const riskColors = {
    Low: 'green',
    Moderate: 'yellow',
    High: 'red'
  };

  const totalDeliveries = deliveries.length;
  const cSectionRate = ((deliveries.filter(d => d.mode === 'C-Section').length / totalDeliveries) * 100).toFixed(1);

  return (
    <div className="ui container fluid my-4">

      {/* Dashboard Cards */}
      <div className="ui stackable five cards mb-4">

        <div className="ui card blue">
          <div className="content">
            <div className="header">Total Deliveries</div>
            <div className="description">{totalDeliveries}</div>
          </div>
        </div>

        <div className="ui card purple">
          <div className="content">
            <div className="header">C-Section Rate</div>
            <div className="description">{cSectionRate}%</div>
          </div>
        </div>

        <div className="ui card red">
          <div className="content">
            <div className="header">High Risk Cases</div>
            <div className="description">
              {deliveries.filter(d => d.risk === 'High').length}
            </div>
          </div>
        </div>

        <div className="ui card orange">
          <div className="content">
            <div className="header">PPH Cases (&gt;500ml)</div>
            <div className="description">
              {deliveries.filter(d => d.bloodLoss > 500).length}
            </div>
          </div>
        </div>

        <div className="ui card green">
          <div className="content">
            <div className="header">Low Birth Weight</div>
            <div className="description">
              {deliveries.filter(d => d.birthWeight < 2.5).length}
            </div>
          </div>
        </div>

      </div>

      {/* Add New Delivery */}
      <button className="ui green button mb-3">
        <i className="plus icon"></i> Admit New Labor Case
      </button>

      {/* Delivery Table */}
      <div className="ui segment raised">
        <h4 className="ui blue header">Labor & Delivery Records</h4>

        <table className="ui celled striped selectable table">
          <thead>
            <tr>
              <th>Delivery No</th>
              <th>Mother</th>
              <th>ANC No</th>
              <th>Admission</th>
              <th>Mode</th>
              <th>FHR</th>
              <th>BP</th>
              <th>Blood Loss (ml)</th>
              <th>Birth Weight</th>
              <th>APGAR</th>
              <th>Risk</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.mother}</td>
                <td>{d.ancNo}</td>
                <td>{d.admission}</td>
                <td>{d.mode}</td>
                <td>
                  {d.fhr}
                  {d.fhr < 110 && <div className="ui red mini label ml-1">Distress</div>}
                </td>
                <td>{d.bp}</td>
                <td>
                  {d.bloodLoss}
                  {d.bloodLoss > 500 && <div className="ui red mini label ml-1">PPH</div>}
                </td>
                <td>{d.birthWeight}</td>
                <td>{d.apgar}</td>
                <td>
                  <div className={`ui ${riskColors[d.risk]} label`}>
                    {d.risk}
                  </div>
                </td>
                <td>
                  <div className="ui buttons tiny">
                    <button className="ui blue button">
                      <i className="eye icon"></i>
                    </button>
                    <button className="ui teal button">
                      <i className="heartbeat icon"></i>
                    </button>
                    <button className="ui orange button">
                      <i className="file alternate icon"></i>
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