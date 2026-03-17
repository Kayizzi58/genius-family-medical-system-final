import { h } from 'preact';
import * as XLSX from 'xlsx'; // npm install xlsx
import { useState } from 'preact/hooks';
import { useMemo } from 'preact/hooks';
export default function Report() {
  const [sales] = useState([
    { id: 'SAL001', total: 150, cost: 100, date: '2026-02-25', dept: 'ICU', patient: 'John Doe', meds: ['Paracetamol 500mg'] },
    { id: 'SAL002', total: 80, cost: 50, date: '2026-02-24', dept: 'Ward', patient: 'Ana Smith', meds: ['Amoxicillin'] },
    { id: 'SAL003', total: 200, cost: 140, date: '2026-02-20', dept: 'OPD', patient: 'Mark Lee', meds: ['Cough Syrup'] },
  ]);

  const [inventory] = useState([
    { id: 'MED001', name: 'Paracetamol', qty: 120, purchase: 0.25, selling: 0.50, expiry: '2027-01-01', reorder: 50, controlled: false },
    { id: 'MED002', name: 'Amoxicillin', qty: 8, purchase: 0.40, selling: 0.80, expiry: '2026-03-10', reorder: 20, controlled: false },
    { id: 'MED003', name: 'Morphine', qty: 5, purchase: 2.0, selling: 5.0, expiry: '2026-06-30', reorder: 5, controlled: true },
    { id: 'MED004', name: 'Cough Syrup', qty: 12, purchase: 1.20, selling: 2.00, expiry: '2026-02-28', reorder: 10, controlled: false },
  ]);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filteredSales = useMemo(() => {
    return sales.filter(s => {
      if (!fromDate && !toDate) return true;
      return (!fromDate || s.date >= fromDate) && (!toDate || s.date <= toDate);
    });
  }, [sales, fromDate, toDate]);

  // Core KPIs
  const totalRevenue = filteredSales.reduce((sum, s) => sum + s.total, 0);
  const totalCost = filteredSales.reduce((sum, s) => sum + s.cost, 0);
  const totalProfit = totalRevenue - totalCost;

  const today = new Date();
  const stockValue = inventory.reduce((sum, i) => sum + i.qty * i.purchase, 0);
  const lowStock = inventory.filter(i => i.qty <= i.reorder).length;
  const nearExpiry = inventory.filter(i => (new Date(i.expiry) - today) / (1000*3600*24) <= 30).length;
  const expiredStock = inventory.filter(i => new Date(i.expiry) < today).length;
  const controlledMeds = inventory.filter(i => i.controlled).length;

  // Top Dispensed Medicines
  const topMedsMap = {};
  filteredSales.forEach(s => s.meds.forEach(m => topMedsMap[m] = (topMedsMap[m] || 0) + 1));
  const topMeds = Object.entries(topMedsMap).sort((a,b) => b[1]-a[1]).slice(0,5);

  // Export Excel
  const exportReport = () => {
    // Combine sales & inventory data
    const wsSales = XLSX.utils.json_to_sheet(filteredSales.map(s => ({
      ID: s.id,
      Date: s.date,
      Department: s.dept,
      Patient: s.patient,
      Revenue: s.total,
      Cost: s.cost,
      Profit: s.total - s.cost,
      Medicines: s.meds.join(', ')
    })));

    const wsInventory = XLSX.utils.json_to_sheet(inventory.map(i => ({
      ID: i.id,
      Name: i.name,
      Qty: i.qty,
      Purchase: i.purchase,
      Selling: i.selling,
      Expiry: i.expiry,
      Reorder: i.reorder,
      Controlled: i.controlled ? 'Yes' : 'No'
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsSales, 'Sales');
    XLSX.utils.book_append_sheet(wb, wsInventory, 'Inventory');

    XLSX.writeFile(wb, `Pharmacy_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div className="ui container my-4">
      {/* Filters */}
      <div className="ui segment">
        <h4 className="ui blue header">Report Filters</h4>
        <div className="ui form">
          <div className="fields">
            <div className="field"><label>From</label><input type="date" value={fromDate} onInput={e => setFromDate(e.target.value)} /></div>
            <div className="field"><label>To</label><input type="date" value={toDate} onInput={e => setToDate(e.target.value)} /></div>
            <div className="field"><label>&nbsp;</label>
              <button className="ui blue button" onClick={exportReport}>
                <i className="download icon"></i> Export Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="ui stackable six cards mt-4">
        <div className="ui card green"><div className="content"><div className="header">Revenue</div><div className="description">${totalRevenue.toFixed(2)}</div></div></div>
        <div className="ui card red"><div className="content"><div className="header">Cost</div><div className="description">${totalCost.toFixed(2)}</div></div></div>
        <div className="ui card blue"><div className="content"><div className="header">Profit</div><div className="description">${totalProfit.toFixed(2)}</div></div></div>
        <div className="ui card orange"><div className="content"><div className="header">Low Stock Items</div><div className="description">{lowStock}</div></div></div>
        <div className="ui card yellow"><div className="content"><div className="header">Near Expiry</div><div className="description">{nearExpiry}</div></div></div>
        <div className="ui card purple"><div className="content"><div className="header">Controlled Substances</div><div className="description">{controlledMeds}</div></div></div>
      </div>

      {/* Top Dispensed Medicines */}
      <div className="ui segment raised mt-4">
        <h4 className="ui teal header">Top Dispensed Medicines</h4>
        <ul className="ui list">
          {topMeds.map(([name, count]) => <li key={name}>{name} — {count} times</li>)}
        </ul>
      </div>

      {/* Sales Table */}
      <div className="ui segment raised mt-4">
        <h4 className="ui teal header">Sales Breakdown</h4>
        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>ID</th><th>Date</th><th>Dept</th><th>Patient</th><th>Revenue</th><th>Cost</th><th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.date}</td>
                <td>{s.dept}</td>
                <td>{s.patient}</td>
                <td>${s.total.toFixed(2)}</td>
                <td>${s.cost.toFixed(2)}</td>
                <td><div className={`ui ${s.total-s.cost>=0?'green':'red'} label`}>{(s.total-s.cost).toFixed(2)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inventory Summary */}
      <div className="ui segment raised mt-4">
        <h4 className="ui purple header">Inventory Summary</h4>
        <div className="ui statistics">
          <div className="ui statistic"><div className="value">{inventory.length}</div><div className="label">Total Items</div></div>
          <div className="ui statistic"><div className="value">{expiredStock}</div><div className="label">Expired Items</div></div>
          <div className="ui statistic"><div className="value">{lowStock}</div><div className="label">Low Stock</div></div>
          <div className="ui statistic"><div className="value">{nearExpiry}</div><div className="label">Near Expiry</div></div>
        </div>
      </div>
    </div>
  );
}