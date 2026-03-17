function Priveledges(){
    return (
        <div>
          <br></br>
          <br></br>
         
<div class="pusher" style="padding:20px">
    <div className="card p-2 bg-light">
        <h2 class="ui header blue label"><i className="setting icon"></i> Role & Permission Management</h2>
    <h3 class="ui header blue">Roles</h3>
    </div>
    <br></br>
    <hr></hr>
 <div className="card p-2 bg-light">
     <table class="ui celled table">
    <thead><tr><th>Rate</th><th>Description</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>Admin</td><td className="">Full system access</td><td><button class="ui tiny green button">Edit</button></td></tr>
      <tr><td>Doctor</td><td>Manage consultations, orders, results</td><td><button class="ui tiny green button">Edit</button></td></tr>
      <tr><td>Nurse</td><td>Manage patient care and vitals</td><td><button class="ui tiny green button">Edit</button></td></tr>
      <tr><td>Lab Tech</td><td>Manage lab workflow & results</td><td><button class="ui tiny green button">Edit</button></td></tr>
      <tr><td>Pharmacist</td><td>Manage inventory and prescriptions</td><td><button class="ui tiny green button">Edit</button></td></tr>
    </tbody>
  </table>
 </div>

  <div class="ui divider"></div>
</div>
<div className="card p-2 bg-light">
    <h3 class="ui header blue">Permissions</h3>
  <table class="ui celled table">
    <thead><tr><th className="">Permission</th><th>Description</th><th>Assigned To</th></tr></thead>
    <tbody>
      <tr><td>View Patient</td><td>Access patient information</td><td>Doctor, Nurse, Admin</td></tr>
      <tr><td>Edit Patient</td><td>Modify patient records</td><td>Doctor, Nurse, Admin</td></tr>
      <tr><td>Create Lab Order</td><td>Initiate lab tests</td><td>Doctor, Admin</td></tr>
      <tr><td>Process Lab</td><td>Enter lab results</td><td>Lab Tech</td></tr>
      <tr><td>Approve Lab</td><td>Verify results</td><td>Doctor, Admin</td></tr>
      <tr><td>Dispense Medication</td><td>Provide drugs to patients</td><td>Pharmacist</td></tr>
    </tbody>
  </table>
</div>
<br></br>
<hr></hr>
  
   <div className="card p-2 bg-light">
    <div class="ui divider"></div>
  <h3 class="ui header blue">Assign Roles to Users</h3>
     <form class="ui form">
    <div class="field card p-2">
      <label className="ui label">User</label>
      <select class="ui dropdown">
        <option value="">Select User</option>
        <option value="u1">John Smith</option>
        <option value="u2">Anna Nurse</option>
        <option value="u3">Dr. Kate</option>
      </select>
    </div>
    <div class="field card p-2">
      <label className="ui label">Role</label>
      <select class="ui dropdown">
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="doctor">Doctor</option>
        <option value="nurse">Nurse</option>
        <option value="lab">Lab Tech</option>
        <option value="pharma">Pharmacist</option>
      </select>
    </div>
    <button class="ui blue button"><i className="setting icon"></i>Assign Role</button>
  </form>
   </div>
        </div>
    )
}
export default Priveledges