function Payroll(){
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Payroll || Management</strong></div>
  <div class="right menu">
    <div class="item ui green large label">Admin</div>
    <div class="item"><i class="home blue icon"></i></div>
    <div class="item"><i class="bell blue icon"></i></div>
    <div class="item"><i class="sign red out icon"></i></div>
  </div>
</div>
<div class="pusher" style="margin-top:70px;padding:20px">
    <h2 class="ui header blue ribbon label">Payroll Dashboard</h2>
  <br></br>
  <br></br>
  <hr></hr>
  <div className="card p-2 bg-light">
    <div class="ui four stackable cards">
    <div class="card"><div class="content"><div class="header">Total Employees</div><div class="description">56</div></div></div>
    <div class="card"><div class="content"><div class="header">This Month Payroll</div><div class="description">$34,560</div></div></div>
    <div class="card"><div class="content"><div class="header">Pending Salaries</div><div class="description">2</div></div></div>
    <div class="card"><div class="content"><div class="header">Last Processed</div><div class="description">01-Feb-2026</div></div></div>
  </div>
  </div>

  <div class="ui divider"></div>
</div>
<div className="card p-2 bg-light">
  <h3 class="ui header blue">Employee List <span className="ui label">12</span></h3>
  <table class="ui celled table">
    <thead><tr><th>Employee ID</th><th>Name</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>EMP-001</td><td>John Smith</td><td>Doctor</td><td>Active</td><td><button class="ui tiny button">View</button></td></tr>
    </tbody>
  </table>
  <button className="ui blue button">View More</button>
</div>

  <div class="ui divider"></div>
 <div className="card p-2">
   <h3 class="ui header blue">Salary Management <span className="ui label">12</span></h3>
  <table class="ui table">
    <thead><tr><th>Employee</th><th>Base Salary</th><th>Allowances</th><th>Deductions</th><th>Net Pay</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>John Smith</td><td>$3,000</td><td>$500</td><td>$200</td><td>$3,300</td><td><button class="ui tiny blue button">Edit</button></td></tr>
    </tbody>
  </table>
  <button className="ui blue button">View More</button>
 </div>

  <div class="ui divider"></div>
  <div className="card p-2 bg-light">
    <h3 class="ui header blue">Attendance <span className="ui label">12</span></h3>
  <table class="ui table">
    <thead><tr><th>Employee</th><th>Date</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>John Smith</td><td>05-Feb-2026</td><td>Present</td></tr>
    </tbody>
  </table>
  <button className="ui blue button">View More</button>
  </div>

  <div class="ui divider"></div>
 <div className="card p-2 bg-light">
   <h3 class="ui header blue">Payslips <span className="ui label">12</span></h3>
  <table class="ui table">
    <thead><tr><th>Employee</th><th>Month</th><th>Net Pay</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>John Smith</td><td>Feb 2026</td><td>$3,300</td><td><button class="ui tiny blue button"><i className="download icon"></i>Download</button></td></tr>
    </tbody>
  </table>
  <button className="ui blue button">View More</button>
 </div>

  <div class="ui divider"></div>
<div className="card p-2 bg-light">
    <h3 class="ui header blue">Payroll Settings</h3>
  <form class="ui form">
    <div class="field card p-2"><label className="ui label">Default Currency</label><input value="USD"/></div>
    <div class="field card p-2"><label className="ui label">Tax Rate (%)</label><input value="10"/></div>
    <div class="field card p-2"><label className="ui label">Payment Schedule</label><input value="Monthly"/></div>
    <button class="ui primary button"><i className="save icon"></i>Save Settings</button>
  </form>
</div>
        </div>
    )
}
export default Payroll