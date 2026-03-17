function Patient(){
    return (
        <div>
<div className="card p-2 bg-light">
  <h3 class="ui header blue">Ward Overview</h3>
  <table class="ui celled table">
    <thead><tr><th>Ward</th><th>Bed</th><th>Patient</th><th>Diagnosis</th><th>Medication</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>WD12</td><td>Bed 5</td><td>Jane Doe</td><td>Malaria</td><td><button className="ui tiny blue button">Give</button></td><td>Stable</td><td><button class="ui tiny button">View</button></td></tr>
      <tr><td>WD12</td><td>Bed 5</td><td>Jane Doe</td><td>Malaria</td><td><button className="ui tiny green button">Given</button></td><td>Stable</td><td><button class="ui tiny button">View</button></td></tr>
      
      <tr><td>WD12</td><td>Bed 5</td><td>Jane Doe</td><td>Malaria</td><td><button className="ui tiny blue button">Give</button></td><td>Stable</td><td><button class="ui tiny button">View</button></td></tr>
      <tr><td>WD12</td><td>Bed 5</td><td>Jane Doe</td><td>Malaria</td><td><button className="ui tiny green button">Given</button></td><td>Stable</td><td><button class="ui tiny button">View</button></td></tr>
      
      <tr><td>WD12</td><td>Bed 5</td><td>Jane Doe</td><td>Malaria</td><td><button className="ui tiny blue button">Give</button></td><td>Stable</td><td><button class="ui tiny button">View</button></td></tr>
      <tr><td>WD12</td><td>Bed 5</td><td>Jane Doe</td><td>Malaria</td><td><button className="ui tiny green button">Given</button></td><td>Stable</td><td><button class="ui tiny button">View</button></td></tr>
    </tbody>
  </table>
</div>
        </div>
    )
}
export default Patient