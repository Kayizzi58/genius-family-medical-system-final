function Status(){
    return (
        <div>
            <div className="card p-2 bg-light">
     <h3 class="ui header">Patient Status</h3>
  <table class="ui table">
    <thead><tr><th>Patient</th><th>Ward</th><th>Bed</th><th>Condition</th><th>Doctor</th></tr></thead>
    <tbody>
      <tr><td>Jane Doe</td><td>Ward B</td><td>5</td><td>Stable</td><td>Dr. John Smith</td></tr>
    </tbody>
  </table>
  </div>
        </div>
    )
}
export default Status