import { h } from 'preact';
import { useState } from 'preact/hooks';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

export default function Sales() {
  const [sales, setSales] = useState([
    { id: 'SAL202611', patient: 'John Doe', items: 3, total: 15.50, date: '2026-02-25', status: 'paid', branch: 'Main', controlled: false },
    { id: 'SAL202612', patient: 'Ana Smith', items: 2, total: 7.80, date: '2026-02-24', status: 'pending', branch: 'West', controlled: true },
    { id: 'SAL202613', patient: 'Mark Lee', items: 5, total: 22.00, date: '2026-02-20', status: 'refunded', branch: 'Main', controlled: false },
    { id: 'SAL202614', patient: 'Lucy Brown', items: 1, total: 3.50, date: '2026-02-25', status: 'paid', branch: 'East', controlled: false },
  ]);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [modalSale, setModalSale] = useState(null); // Fullscreen modal
  const [modalType, setModalType] = useState(''); // 'view' or 'refund'

  const statusColors = { paid: 'green', pending: 'yellow', refunded: 'red' };

  const filteredSales = sales.filter(s => {
    const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase()) || s.patient.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || s.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const today = new Date().toISOString().slice(0, 10);
  const todaySales = sales.filter(s => s.date === today).reduce((sum, s) => sum + s.total, 0);
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);

  // Actions
  const viewReceipt = (sale) => {
    setModalSale(sale);
    setModalType('view');
  };

  const refundSale = (sale) => {
    setModalSale(sale);
    setModalType('refund');
  };

  const confirmRefund = () => {
    setSales(prev => prev.map(s => s.id === modalSale.id ? { ...s, status: 'refunded' } : s));
    setModalSale(null);
  };

  // Export
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Sales Report', 10, 10);
    let y = 20;
    filteredSales.forEach(s => {
      doc.text(`${s.id} | ${s.patient} | $${s.total.toFixed(2)} | ${s.status}`, 10, y);
      y += 10;
    });
    doc.save('sales_report.pdf');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredSales);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales');
    XLSX.writeFile(wb, 'sales_report.xlsx');
  };

  return (
    <div className="ui container my-4">

      {/* Summary */}
      <div className="ui stackable four cards mb-4">
        <div className="ui card blue"><div className="content"><div className="header">Today's Sales</div><div className="description">${todaySales.toFixed(2)}</div></div></div>
        <div className="ui card teal"><div className="content"><div className="header">Total Transactions</div><div className="description">{sales.length}</div></div></div>
        <div className="ui card green"><div className="content"><div className="header">Paid Sales</div><div className="description">{sales.filter(s => s.status === 'paid').length}</div></div></div>
        <div className="ui card orange"><div className="content"><div className="header">Total Revenue</div><div className="description">${totalRevenue.toFixed(2)}</div></div></div>
      </div>

      {/* Filters */}
      <div className="ui stackable grid mb-3">
        <div className="eight wide column">
          <input className="ui fluid input" placeholder="Search by ID or patient..." value={search} onInput={e => setSearch(e.target.value)} />
        </div>
        <div className="four wide column">
          <select className="ui fluid dropdown" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>
        <div className="four wide column">
          <button className="ui grey button fluid" onClick={() => { setSearch(''); setFilterStatus(''); }}>Clear Filters</button>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-3">
        <button className="ui blue button" onClick={exportPDF}><i className="file pdf icon"></i> Export PDF</button>
        <button className="ui green button ml-2" onClick={exportExcel}><i className="file excel icon"></i> Export Excel</button>
      </div>

      {/* Sales Table */}
      <div className="card p-3 shadow-sm bg-light">
        <div className="ui segment raised">
          <h4 className="ui blue header large">Sales Transactions</h4>
          <div className="ui fluid table">
            <table className="ui celled striped selectable table">
              <thead>
                <tr>
                  <th>Sale ID</th><th>Patient</th><th>Items</th><th>Total ($)</th><th>Date</th><th>Status</th><th>Branch</th><th>Controlled</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map(s => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.patient}</td>
                    <td>{s.items}</td>
                    <td>{s.total.toFixed(2)}</td>
                    <td>{s.date}</td>
                    <td><div className={`ui ${statusColors[s.status]} label`}>{s.status}</div></td>
                    <td>{s.branch}</td>
                    <td>{s.controlled ? 'Yes' : 'No'}</td>
                    <td>
                      <div className="ui buttons tiny">
                        <button className="ui blue button" onClick={() => viewReceipt(s)}><i className="file alternate icon"></i></button>
                        {s.status === 'paid' && <button className="ui red button" onClick={() => refundSale(s)}><i className="undo icon"></i></button>}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSales.length === 0 && <tr><td colSpan="9" className="text-center">No sales found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {modalSale && (
        <div className="ui fullscreen modal active" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2em', backgroundColor: '#fff', zIndex: 1000, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
          <h2 className="ui header">{modalType === 'view' ? 'Sale Receipt' : 'Refund Sale'}</h2>
          <pre>{JSON.stringify(modalSale, null, 2)}</pre>
          {modalType === 'refund' && <button className="ui red button" onClick={confirmRefund}><i className="check icon"></i> Confirm Refund</button>}
          <button className="ui grey button mt-2" onClick={() => setModalSale(null)}>Close</button>
        </div>
      )}

    </div>
  );
}