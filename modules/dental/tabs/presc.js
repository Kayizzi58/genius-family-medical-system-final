function Presc(){
    return (
        <div>
            <div className="card p-2 bg-light">
     <h3 class="ui header blue">Prescriptions</h3>
  <table class="ui table">
    <thead><tr><th>Patient</th><th>Dentist</th><th>Medication</th><th>Dosage</th><th>Total Cost</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>John Doe</td><td>Dr. Smith</td><td><ul><li>Ibuprofen</li><li>Ibuprofen</li><li>Ibuprofen</li><li>Ibuprofen</li></ul></td><td><ul><li>400mg 3/Day</li><li>400mg 3/Day</li><li>400mg 3/Day</li><li>400mg 3/Day</li></ul></td><td>20000</td><td>Pending</td></tr>
      <tr><td>John Doe</td><td>Dr. Smith</td><td><ul><li>Ibuprofen</li><li>Ibuprofen</li><li>Ibuprofen</li><li>Ibuprofen</li></ul></td><td><ul><li>400mg 3/Day</li><li>400mg 3/Day</li><li>400mg 3/Day</li><li>400mg 3/Day</li></ul></td><td>20000</td><td>Pending</td></tr>
      <tr><td>John Doe</td><td>Dr. Smith</td><td><ul><li>Ibuprofen</li><li>Ibuprofen</li><li>Ibuprofen</li><li>Ibuprofen</li></ul></td><td><ul><li>400mg 3/Day</li><li>400mg 3/Day</li><li>400mg 3/Day</li><li>400mg 3/Day</li></ul></td><td>20000</td><td><i className="check icon"></i>Given</td></tr>
    </tbody>
  </table>
</div>
        </div>
    )
}
export default Presc