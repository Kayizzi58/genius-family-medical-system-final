function Meds(){
    return(
        <div>
            <div className="card p-2 bg-light">
    <div class="ui segment">
    <h4>Add Medicine (Inventory)</h4>
    <div class="ui form">
      <div class="fields">
        <div class="field">
          <input id="mName" placeholder="Medicine name"/>
        </div>
        
        <div class="field">
          
        </div>
        
        
        <div class="field">
          <input id="mQty" type="number" placeholder="Qty"/>
        </div>
        <div className="ui label">
            <div class="field">
          <label>Expiry Date</label><input id="mExpiry" type="date"/>
        </div>
        </div>
        <div class="field">
          <input id="mPrice" type="number" placeholder="Purchase Price"/>
        </div>
        <div class="field">
          <input id="mBatch" type="text" placeholder="Selling Price"className="ui disabled"/>
        </div>
        <div class="field">
          <input id="mBatch" placeholder="Tax/VAT"className="ui disabled"/>
        </div>
        <div class="field">
          <button class="ui green button">Add</button>
        </div>
      </div>
    </div>
  </div>
   <div class="ui segment">
    <h4 className="ui blue header large">Medicine Inventory</h4>
    <table class="ui celled table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Batch</th>
            <th>Qty</th>
            <th>Expiry</th>
            <th>Purchase Price</th>
            <th>Selling Price</th>
            <th>Tax/VAT %</th>
            <th>Re-order level</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            
          <tr>
            <td>MDC202611</td>
            <td>Paracetamol 500mg</td>
            <td>Cate</td>
            <td>B-2026</td>
            <td>120</td>
            <td>2027-01-01</td>
            <td>$0.25</td>
            <td><div class="ui green label">Available</div></td>
          </tr>

          <tr class="low-stock">
            <td>MDC202611</td>
            <td>Amoxicillin</td>
            <td>Cate</td>
            <td>B-2025</td>
            <td>8</td>
            <td>2026-04-10</td>
            <td>$0.40</td>
            <td><div class="ui orange label">Low Stock</div></td>
          </tr>

          <tr class="near-expiry">
            <td>MDC202611</td>
            <td>Ibuprofen</td>
            <td>Cate</td>
            <td>B-2024</td>
            <td>30</td>
            <td>2026-03-01</td>
            <td>$0.30</td>
            <td><div class="ui yellow label">Near Expiry</div></td>
          </tr>

          <tr class="expired">
            <td>MDC202611</td>
            <td>Cough Syrup</td>
            <td>Cate</td>
            <td>B-2023</td>
            <td>12</td>
            <td>2025-12-01</td>
            <td>$1.20</td>
            <td><div class="ui red label">Expired</div></td>
          </tr>
        </tbody>
      </table>
  </div>
  
  </div>
<br></br>
<hr></hr>

        </div>
    )
}
export default Meds