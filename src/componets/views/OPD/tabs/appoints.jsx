

function Appoint(){
    return (
        <div>
            <div className="card p-2 bg-light">
              <h3 class="ui header blue">Appointments</h3>
  <table class="ui celled blue table">
    <thead><tr><th>Patient</th><th>Date</th><th>Time</th><th>Doctor</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td><label className="ui  red label">John Doe <button className="ui black button">View</button></label></td><td>05-Feb-2026<button className="ui tiny blue button">Change</button></td><td>10:00 AM <button className="ui tiny blue button">Change</button></td><td>Dr. Smith</td><td><i className="time icon"></i> Pending</td><td><label className="ui red label">Confirm <input type="checkbox"/></label></td></tr>
      <tr><td><label className="ui  red label">John Doe <button className="ui black button">View</button></label></td><td>05-Feb-2026<button className="ui tiny blue button">Change</button></td><td>10:00 AM <button className="ui tiny blue button">Change</button></td><td>Dr. Smith</td><td><i className="time icon"></i> Pending</td><td><label className="ui red label">Confirm <input type="checkbox"/></label></td></tr>
      <tr><td><label className="ui  red label">John Doe <button className="ui black button">View</button></label></td><td>05-Feb-2026<button className="ui tiny blue button">Change</button></td><td>10:00 AM <button className="ui tiny blue button">Change</button></td><td>Dr. Smith</td><td><i className="time icon"></i> Pending </td><td><label className="ui red label">Confirm <input type="checkbox"/></label></td></tr>
      <tr><td><label className="ui  red label">John Doe <button className="ui black button">View</button></label></td><td>05-Feb-2026<button className="ui tiny blue button">Change</button></td><td>10:00 AM <button className="ui tiny blue button">Change</button></td><td>Dr. Smith</td><td><i className="time icon"></i>Pending</td><td><label className="ui red label">Confirm <input type="checkbox"/></label></td></tr>
      <tr><td><label className="ui  red label">John Doe <button className="ui black button">View</button></label></td><td>05-Feb-2026<button className="ui tiny blue button">Change</button></td><td>10:00 AM <button className="ui tiny blue button">Change</button></td><td>Dr. Smith</td><td><i className="check icon"></i>Scheduled</td><td><label className="ui label">Confirm <input type="checkbox"/></label></td></tr>
    </tbody>
  </table>
 
 </div>
        </div>
    )
}
export default Appoint