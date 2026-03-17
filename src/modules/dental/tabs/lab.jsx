function Lab(){
    return (
        <div>
            <div className="card p-2 bg-light">
  <h3 class="ui header blue">Lab Orders</h3>
  <table class="ui table">
    <thead><tr><th>Patient</th><th>Test</th><th>Dentist</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td><label className="ui red label">John Doe <button className="ui black button">View</button></label></td><td>X-Ray</td><td><label className="ui red label">Smith <button className="ui black button">View</button></label></td><td>Pending</td></tr>
      <tr><td><label className="ui red label">John Doe <button className="ui black button">View</button></label></td><td>X-Ray</td><td><label className="ui red label">Smith <button className="ui black button">View</button></label></td><td><button className="ui green button"><i className="check icon"></i>Ready</button></td></tr>
    </tbody>
  </table>
</div>
        </div>
    )
}
export default Lab