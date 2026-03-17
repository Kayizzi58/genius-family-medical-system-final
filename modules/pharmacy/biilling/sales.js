function Sales(){
    return (
        <div>
            <div className="card p-2 bg-light">
    <h4 className="ui blue header large">Daily Sales</h4>
    <div class="ui segment">
    <button className="ui blue button"><i className="add icon"></i>Add</button>
    <table className="ui celled table">
        <thead>
            <tr><th>Patient Id</th><th>Medication</th><th>Quantity</th><th>Unite Price</th><th>Total Price</th><th>Payment Method</th><th>Staff Id</th></tr>
        </thead>
        <tbody>
            <tr><td>P20261</td><td><span className="ui red label">View</span></td><td><div className="ui label">5pcs<span className="ui red label">View</span></div></td><td>1000</td><td>1000</td><td><div className="ui label">MTN MOBILE MONEY<span className="ui yellow label">+256760824588</span><button className="ui tiny blue button">View</button></div></td><td>PH20261</td></tr>
        </tbody>
    </table>
  </div>
  </div>
        </div>
    )
}
export default Sales