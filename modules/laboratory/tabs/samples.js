function Samples(){
    return (
        <div>
            <br></br>
            <button className="ui tiny blue button"><i className="add icon"></i>Add</button>
            <br></br>
            <br></br>
            <div className="card p-2 bg-light">
   <h3 class="ui header blue">Sample Collection</h3>
  <table class="ui table">
    <thead><tr><th>Order</th><th>Sample Type</th><th>Collected By</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>ORD-101</td><td>Blood</td><td>Nurse Anna</td><td><button class="ui tiny green button"><i className="check icon"></i>Collected</button></td></tr>
      <tr><td>ORD-101</td><td>Blood</td><td>Nurse Anna</td><td><button class="ui tiny green button"><i className="check icon"></i>Collected</button></td></tr>
      <tr><td>ORD-101</td><td>Blood</td><td>Nurse Anna</td><td><button class="ui tiny green button"><i className="check icon"></i>Collected</button></td></tr>
      <tr><td>ORD-101</td><td>Blood</td><td>Nurse Anna</td><td><button class="ui tiny green button"><i className="check icon"></i>Collected</button></td></tr>
    </tbody>
  </table>
 </div>
        </div>
    )
}
export default Samples