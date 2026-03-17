function Appoint(){
    return (
        <div>
             <div className="card p-2 bg-light">
     <h3 class="ui header blue">Appointments</h3>
  <table class="ui striped table">
    <thead><tr><th>Date</th><th>Patient</th><th>Doctor</th><th>Status</th></tr></thead>
    <tbody><tr><td>04 jan 2026</td><td><label className="ui label">Jane Doe<button className="ui blue tiny button">View</button></label></td><td><label className="ui label">Smith<button className="ui blue tiny button">View</button></label></td><td>Confirmed</td></tr></tbody>
  </table>
  </div>

        </div>
    )
}
export default Appoint