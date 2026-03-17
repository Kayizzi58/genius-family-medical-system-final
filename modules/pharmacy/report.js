function Report(){
    return (
        <div>
<div class="bg-light p-2 card">

  <h2 class="ui tag label large green">
    <i class="report icon"></i>
    Pharmacy Reports <button className="ui black button"><i className="file icon"></i>Genetate Report</button>
  </h2>
  <hr></hr>
  <div className="card p-2 bg-light">
    <div class="ui four stackable cards">
    <div class="card">
      <div class="content">
        <div class="header">Total Sales</div>
        <div class="meta">245</div>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <div class="header">Revenue</div>
        <div class="meta">$12,450</div>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <div class="header">Low Stock Items</div>
        <div class="meta">5</div>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <div class="header">Expired Medicines</div>
        <div class="meta">2</div>
      </div>
    </div>
  </div>
  </div>
<hr></hr>
  <div className="card p-2 bg-light">
    <div class="ui segment">
    <h4 class="ui header blue">Filters</h4>
    <div class="ui form">
      <div class="three fields">
        <div class="field">
          <label>Date From</label>
          <input type="date" placeholder="Start Date"/>
        </div>
        <div class="field">
          <label>Date To</label>
          <input type="date" placeholder="End Date"/>
        </div>
        <div class="field">
          <label>Category</label>
          <select class="ui dropdown">
            <option value="">All Categories</option>
            <option value="antibiotics">Antibiotics</option>
            <option value="painkillers">Painkillers</option>
            <option value="vitamins">Vitamins</option>
          </select>
        </div>
      </div>
      <button class="ui primary button" style="margin-top:10px;">
        <i class="filter icon"></i> Apply Filters
      </button>
    </div>
  </div>
  </div>

  

  <div class="ui segment">
    <h4 class="ui header blue">Recent Transactions<span className="ui label">5</span></h4>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Invoice #</th>
          <th>Medicine</th>
          <th>Qty</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>INV-2026011</td>
          <td>Paracetamol</td>
          <td>10</td>
          <td>$50</td>
          <td>2026-02-10</td>
        </tr>
        <tr>
          <td>INV-2026011</td>
          <td>Amoxicillin</td>
          <td>5</td>
          <td>$80</td>
          <td>2026-02-10</td>
        </tr>
      </tbody>
    </table>
    <button className="ui blue button">Vew More</button>
  </div>

  <div class="ui segment">
    <h4 class="ui header blue">Expiring / Expired Medicines <span className="ui label">5</span></h4>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Medicine</th>
          <th>Batch</th>
          <th>Expire</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Paracentamol</td>
            <td>B-202601</td>
            <td>09/07/2027</td>
        </tr>
    </tbody>
            </table>
            <button className="ui blue button">View More</button>
        </div>
        </div>
        </div>
    )
}
export default Report