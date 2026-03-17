function Accounts(){
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item"><strong>Accounting & Billing</strong></div>
  <div class="right menu">
    <div class="item">Accountant</div>
    <div class="item"><i class="bell icon"></i></div>
    <div class="item"><i class="sign out icon"></i></div>
  </div>
</div>
 <h2 class="ui header">Accounting Dashboard</h2>
  <div class="ui four stackable cards">
    <div class="card"><div class="content"><div class="header">Total Billed</div><div class="description">$45,000</div></div></div>
    <div class="card"><div class="content"><div class="header">Pending Payments</div><div class="description">$7,500</div></div></div>
    <div class="card"><div class="content"><div class="header">Total Patients</div><div class="description">120</div></div></div>
    <div class="card"><div class="content"><div class="header">Last Payment Received</div><div class="description">$1,200</div></div></div>
  </div>

  <div class="ui divider"></div>
  <h3 class="ui header">Billing</h3>
  <table class="ui celled table">
    <thead><tr><th>Invoice #</th><th>Patient</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>INV-001</td><td>Jane Doe</td><td>05-Feb-2026</td><td>$250</td><td>Paid</td><td><button class="ui tiny button">View</button></td></tr>
    </tbody>
  </table>

  <div class="ui divider"></div>
  <h3 class="ui header">Patient Ledger</h3>
  <table class="ui table">
    <thead><tr><th>Patient</th><th>Total Billed</th><th>Paid</th><th>Balance</th></tr></thead>
    <tbody>
      <tr><td>Jane Doe</td><td>$500</td><td>$250</td><td>$250</td></tr>
    </tbody>
  </table>

  <div class="ui divider"></div>
  <h3 class="ui header">Payments</h3>
  <form class="ui form">
    <div class="field"><label>Patient</label><input placeholder="Patient name"/></div>
    <div class="field"><label>Amount</label><input type="number" placeholder="Amount"/></div>
    <div class="field"><label>Payment Method</label><select class="ui dropdown"><option value="">Select</option><option value="cash">Cash</option><option value="card">Card</option><option value="mobile">Mobile Money</option></select></div>
    <button class="ui primary button">Record Payment</button>
  </form>

  <div class="ui divider"></div>

  <h3 class="ui header">Accounting Reports</h3>
  <button class="ui button">Generate Daily Report</button>
  <button class="ui button">Generate Monthly Report</button>

  <div class="ui divider"></div>
    <h3 class="ui header">Settings</h3>
  <form class="ui form">
    <div class="field"><label>Default Currency</label><input value="USD"/></div>
    <div class="field"><label>Invoice Prefix</label><input value="INV-"/></div>
    <button class="ui primary button">Save Settings</button>
  </form>
        </div>
    )
    
}
export default Accounts