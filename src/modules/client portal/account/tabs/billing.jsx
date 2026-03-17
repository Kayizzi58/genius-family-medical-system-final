function Bills(){
    return (
        <div>
            <div className="card p-2 bg-light">
    <h3 class="ui header blue">Billing & Accounts</h3>
  <table class="ui table"><tr><td>Total Outstanding</td><td className="">$3,200</td></tr>
  <tr><td>Total Invoices</td><td>9087</td></tr>
  <tr><td>Total Reciepts</td><td>9087</td></tr></table>
 <div className="ui blue header">
    Expenses <span className="ui label">445</span>
 </div>
 <div className="card p-2">
    <div className="ui red label">15 Jan 2026</div>
 <table className="ui celed table">
    <thead><tr><th>Date</th><th>Batch No</th><th>Item</th><th>Cost Price</th><th>Buy Price</th></tr>
    </thead>
    <tbody><tr><td>02 Jan 2026</td><td>B202601</td><td>Antibiotics</td><td>10000</td><td>10000</td></tr></tbody>
 </table>
 </div>
  </div>
        </div>
    )
}
export default Bills