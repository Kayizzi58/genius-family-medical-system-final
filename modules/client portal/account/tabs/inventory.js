function Inv(){
    return (
        <div>
            <div className="card p-2 bg-light">
   <h3 class="ui header blue">Inventory</h3>
  <div class="ui warning message red label"><i className="bi bi-list"></i>Low stock alert: Antibiotics</div>
  <div className="card p-2">
    <div className="ui header">Batch 2026</div>
  <table className="ui celed table">
   <thead>
    <tr><th>Batch No</th><th>Name</th><th>Expiry Date</th><th>Pieces Left</th></tr>
    <tr><td>B2026</td><td>Antibiotics</td><td>04 Jan 2026</td><td>12</td></tr>
   </thead>
  </table>
  </div>
  <hr></hr>
  <div className="card p-2">
    <div className="ui header">Batch 2027</div>
  <table className="ui celed table">
   <thead>
    <tr><th>Batch No</th><th>Name</th><th>Expiry Date</th><th>Pieces Left</th></tr>
    <tr><td>B2026</td><td>Antibiotics</td><td>04 Jan 2026</td><td>12</td></tr>
   </thead>
  </table>
  </div>
 </div>
        </div>
    )
}
export default Inv