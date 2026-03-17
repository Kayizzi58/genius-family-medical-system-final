function Hometab(){
    return (
        <div>
            <div class="twelve wide column">

    <div class="ui segment">
      <h2 class="ui header yellow ribbon label">Dashboard</h2>
       <br></br>
       <br></br>
      <div class="ui four stackable cards statistics bg-light p-2 raised">
        <div class="statistic card p-2" style="background-color: aliceblue;">
          <div class="value"><i className="pills blue icon"></i>126</div>
          <div class="label">Medicines</div>
        </div>
        <div class="statistic card p-2 text-white" style="background-color: red; color: white;">
          <div class="value"><i className="box icon"></i>14</div>
          <div class="label" >Low Stock</div>
        </div>
        <div class="statistic card p-2" style="background-color: orange;">
          <div class="value"  style="color: white"><i className="calendar icon"></i> 6</div>
          <div class="label">Expiring Soon</div>
        </div>
        <div class="statistic card p-2 white" style="background-color: royalblue; color: white">
          <div class="value"  style="color: white">4,230(UGX)</div>
          <div class="label"  style="color: white">Today Sales</div>
        </div>
      </div>
    </div>
    </div>
    <div className="divider"></div>
     <div class="ui segment bg-light">
      <h3 class="ui header blue">Medicine Inventory</h3>

      <div className="card p-2 bg-light">
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
      <button className="ui yellow button">View More</button>
      </div>
    </div>
    
        </div>
    )
}
export default Hometab