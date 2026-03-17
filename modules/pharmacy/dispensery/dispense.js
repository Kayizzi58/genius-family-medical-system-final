function Dispense(){
    return (
        <div>
        

<div class="p-2">
  <h2 class="ui header blue">
    <i class="pills icon"></i>
    Pharmacy Dispense System
  </h2>

  <div class="ui segment">
    <h4 class="ui header">Patient Information</h4>
    <div class="ui form">
      <div class="three fields">
        <div class="field">
          <label>Patient ID</label>
          <input type="text" placeholder="Enter Patient ID"/>
        </div>
        
      </div>
      <button class="ui primary button" style="margin-top:10px;">
        <i class="search icon"></i> Search
      </button>
    </div>
    <div class="ui divider"></div>

    <div class="ui info message ">
      <p><strong>Patient Name:</strong> Mary K | <strong>Age:</strong> 32 | <strong>Gender:</strong> Female | <strong>Ward/OPD:</strong> OPD</p>
    </div>
  </div>

 <div className="card p-2 bg-light">
     <div class="ui segment">
    <h4 class="ui header">Prescription</h4>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Batch</th>
          <th>Medicine</th>
          <th>Dosage</th>
          <th>Quantity Prescribed</th>
          <th>Quantity to Dispense</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>B-2026</td>
          <td>Paracetamol</td>
          <td>500mg, 1 tablet x 3/day</td>
          <td>10</td>
          <td><input type="number" value="10" min="0"/></td>
          <td><div class="ui green label">Available</div></td>
        </tr>
        <tr>
          <td>B-2026</td>
          <td>Amoxicillin</td>
          <td>250mg, 1 capsule x 2/day</td>
          <td>14</td>
          <td><input type="number" value="0" min="0"/></td>
          <td><div class="ui red label">Out of Stock</div></td>
        </tr>
        <tr>
          <td>B-2026</td>
          <td>Vitamin C</td>
          <td>500mg, 1 tablet x 1/day</td>
          <td>5</td>
          <td><input type="number" value="5" min="0"/></td>
          <td><div class="ui yellow label">Low Stock</div></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="ui segment">
    <button class="ui green button"><i class="check icon"></i> Dispense</button>
    <button class="ui orange button"><i class="redo icon"></i> Reset</button>
    
        </div>
 </div>
        </div>
        </div>
    )
}
export default Dispense