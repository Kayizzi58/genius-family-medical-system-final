function Dash(){
    return (
        <div>
            <h2 class="ui header blue ribbon label">Laboratory Dashboard</h2>
  <br></br>
  <br></br>
  <hr></hr>
 <div className="card p-2 bg-light">
   <div class="ui four stackable cards">
    <div class="card"><div class="content"><div class="header">Pending Orders</div><div class="description">26</div></div></div>
    <div class="card"><div class="content"><div class="header">Samples Collected</div><div class="description">18</div></div></div>
    <div class="card"><div class="content"><div class="header">Processing</div><div class="description">9</div></div></div>
    <div class="card"><div class="content"><div class="header">Ready for Review</div><div class="description">6</div></div></div>
  </div>
 </div>
        </div>
    )
}
export default Dash