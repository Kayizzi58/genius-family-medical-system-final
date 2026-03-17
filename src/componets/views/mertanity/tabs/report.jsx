import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Report() {

  const [data] = useState([
    { id: 1, mode: 'SVD', bloodLoss: 300, birthWeight: 3.2, apgar: 8, risk: 'Low' },
    { id: 2, mode: 'C-Section', bloodLoss: 700, birthWeight: 2.1, apgar: 6, risk: 'High' },
    { id: 3, mode: 'SVD', bloodLoss: 400, birthWeight: 2.8, apgar: 9, risk: 'Low' },
  ]);

  const totalDeliveries = data.length;
  const cSections = data.filter(d => d.mode === 'C-Section').length;
  const cSectionRate = ((cSections / totalDeliveries) * 100).toFixed(1);

  const pphCases = data.filter(d => d.bloodLoss > 500).length;
  const lowBirthWeight = data.filter(d => d.birthWeight < 2.5).length;
  const lowApgar = data.filter(d => d.apgar < 7).length;

  const avgBirthWeight = (
    data.reduce((sum, d) => sum + d.birthWeight, 0) / totalDeliveries
  ).toFixed(2);

  return (
    <div className="ui container fluid my-4">

      {/* FILTER SECTION */}
      <div className="ui segment">
        <div className="ui form">
          <div className="fields">
            <div className="field">
              <label>From Date</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>To Date</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>Delivery Mode</label>
              <select className="ui dropdown">
                <option value="">All</option>
                <option>SVD</option>
                <option>C-Section</option>
              </select>
            </div>
            <div className="field">
              <button className="ui blue button mt-4">
                <i className="filter icon"></i> Apply Filter
              </button>
            </div>
            <div className="field">
              <button className="ui green button mt-4">
                <i className="download icon"></i> Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="ui stackable six cards">

        <div className="ui blue card">
          <div className="content">
            <div className="header">Total Deliveries</div>
            <div className="description">{totalDeliveries}</div>
          </div>
        </div>

        <div className="ui purple card">
          <div className="content">
            <div className="header">C-Section Rate</div>
            <div className="description">{cSectionRate}%</div>
          </div>
        </div>

        <div className="ui red card">
          <div className="content">
            <div className="header">PPH Cases</div>
            <div className="description">{pphCases}</div>
          </div>
        </div>

        <div className="ui orange card">
          <div className="content">
            <div className="header">Low Birth Weight</div>
            <div className="description">{lowBirthWeight}</div>
          </div>
        </div>

        <div className="ui yellow card">
          <div className="content">
            <div className="header">Low APGAR</div>
            <div className="description">{lowApgar}</div>
          </div>
        </div>

        <div className="ui green card">
          <div className="content">
            <div className="header">Avg Birth Weight</div>
            <div className="description">{avgBirthWeight} kg</div>
          </div>
        </div>

      </div>

      {/* DETAILED TABLE */}
      <div className="ui segment raised mt-4">
        <h4 className="ui blue header">Detailed Delivery Report</h4>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mode</th>
              <th>Blood Loss</th>
              <th>Birth Weight</th>
              <th>APGAR</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.mode}</td>
                <td>{d.bloodLoss}</td>
                <td>{d.birthWeight}</td>
                <td>{d.apgar}</td>
                <td>
                  <div className={`ui ${d.risk === 'High' ? 'red' : 'green'} label`}>
                    {d.risk}
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