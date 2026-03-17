function Bills(){
    return (
        <div className="card p-2 bg-light">
     <div class="ui segment">
    <h4 className="ui blue header large">Billing</h4>

    <div class="ui form">
      <div class="fields">
        
        
        <div class="field">
          <button class="ui orange button">Bill Patient</button>
        </div>
      </div>
    </div>
    </div>
  <table class="ui table">
      <thead>
        <tr>
            <th>Patient Id</th>
            <th>Name</th>
            <th>From</th>
            
          <th>Medicine</th>
          <th>Dosage</th>
          <th>Quantity</th>
          <th>Instruction</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody id="billTable">
        <tr><td>P20261</td><td>Ian Walya</td><td className="ui"><div className="ui white label">IPD<span className="ui red label">View</span></div></td><td><div className="ui label">X3<span className="ui red label">View</span></div></td><td><span className="ui red label">View</span></td><td><span className="ui red label">View</span></td><td><span className="ui red label">View</span></td><td>10000(UGX)</td><td>10000(UGX)</td><td className="ui green label"><i className="share icon"></i>Action</td></tr>
      </tbody>
    </table>
 </div>
    )
}
export default Bills