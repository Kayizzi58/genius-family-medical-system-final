
import { h } from 'preact';
import { useState } from 'preact/hooks';

const initialInvoices = [
  {
    id: 1,
    invoiceNo: "INV-1001",
    patient: "Jane Doe",
    department: "Dental",
    total: 250,
    paid: 250,
    status: "Paid",
    date: "2026-02-24"
  },
  {
    id: 2,
    invoiceNo: "INV-1002",
    patient: "John Smith",
    department: "IPD",
    total: 1200,
    paid: 600,
    status: "Partial",
    date: "2026-02-23"
  },
  {
    id: 3,
    invoiceNo: "INV-1003",
    patient: "Mary Johnson",
    department: "Lab",
    total: 300,
    paid: 0,
    status: "Unpaid",
    date: "2026-02-22"
  }
];

const statusColors = {
  Paid: "green",
  Partial: "yellow",
  Unpaid: "red",
  Voided: "grey"
};

export default function Billing() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.patient.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || inv.status === filterStatus;
    const matchesDept = !filterDepartment || inv.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const updatePayment = (id) => {
    const amount = prompt("Enter payment amount:");
    if (!amount) return;

    setInvoices(prev =>
      prev.map(inv => {
        if (inv.id === id) {
          const newPaid = inv.paid + parseFloat(amount);
          let newStatus = "Unpaid";
          if (newPaid >= inv.total) newStatus = "Paid";
          else if (newPaid > 0) newStatus = "Partial";

          return { ...inv, paid: newPaid, status: newStatus };
        }
        return inv;
      })
    );
  };

  const voidInvoice = (id) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === id ? { ...inv, status: "Voided" } : inv
      )
    );
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0);

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal">
          <i className="file invoice dollar icon"></i> Billing Management
        </h3>

        {/* SUMMARY DASHBOARD */}
        <div className="ui four stackable cards mb-3">
          <div className="ui card">
            <div className="content">
              <div className="header">Total Invoices</div>
              <div className="description">{invoices.length}</div>
            </div>
          </div>
          <div className="ui card">
            <div className="content">
              <div className="header">Paid</div>
              <div className="description">
                {invoices.filter(i => i.status === "Paid").length}
              </div>
            </div>
          </div>
          <div className="ui card">
            <div className="content">
              <div className="header">Unpaid</div>
              <div className="description">
                {invoices.filter(i => i.status === "Unpaid").length}
              </div>
            </div>
          </div>
          <div className="ui card">
            <div className="content">
              <div className="header">Total Revenue</div>
              <div className="description">${totalRevenue}</div>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="ui stackable grid mb-3">
          <div className="four wide column">
            <div className="ui fluid input">
              <input
                type="text"
                placeholder="Search by patient or invoice..."
                value={search}
                onInput={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterDepartment}
              onChange={e => setFilterDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              <option value="OPD">OPD</option>
              <option value="IPD">IPD</option>
              <option value="Dental">Dental</option>
              <option value="Lab">Lab</option>
            </select>
          </div>

          <div className="four wide column">
            <select
              className="ui fluid dropdown"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Voided">Voided</option>
            </select>
          </div>

          <div className="four wide column">
            <button
              className="ui grey fluid button"
              onClick={() => {
                setSearch('');
                setFilterDepartment('');
                setFilterStatus('');
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* BILLING TABLE */}
        <div className="ui fluid table">
          <table className="ui celled striped selectable table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Patient</th>
                <th>Department</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id}>
                  <td>{inv.invoiceNo}</td>
                  <td>{inv.patient}</td>
                  <td>{inv.department}</td>
                  <td>${inv.total}</td>
                  <td>${inv.paid}</td>
                  <td>${inv.total - inv.paid}</td>
                  <td>{inv.date}</td>
                  <td>
                    <div className={`ui ${statusColors[inv.status]} label`}>
                      {inv.status}
                    </div>
                  </td>
                  <td>
                    {inv.status !== "Voided" && (
                      <div>
                        <button
                          className="ui tiny green button mr-1"
                          onClick={() => updatePayment(inv.id)}
                        >
                          <i className="dollar sign icon"></i> Pay
                        </button>

                        <button
                          className="ui tiny red button"
                          onClick={() => voidInvoice(inv.id)}
                        >
                          <i className="ban icon"></i> Void
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ADD INVOICE BUTTON */}
        <div className="mt-3">
          <button
            className="ui blue button"
            onClick={() => alert("Open Create Invoice Modal")}
          >
            <i className="add icon"></i> Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
}