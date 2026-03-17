function Treat(){
    return (
        <div>
          <button className="ui blue button"><i className="add icon"></i>Add</button>
          <br></br>
          <br></br>
            <div className="card p-2 bg-light">
    <h3 class="ui header blue">Treatments</h3>
  <table class="ui table">
    <thead><tr><th>Patient</th><th>Treatment</th><th>Medications</th><th>Cost</th><th>Dentist</th><th>Date</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td><label className="ui red label">John Doe <button className="ui black button">View</button></label></td><td>Cleaning</td><td>Ipofren</td><td>200000</td><td>Dr. Smith</td><td>05-Feb-2026</td><td>Routine</td></tr>
    </tbody>
  </table>
  </div>
        </div>
    )
}
export default Treat