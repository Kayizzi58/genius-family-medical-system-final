function Patients(){
    return (
        <div>
            <br></br>
            <div className="card p-2">
                <div className="ui input card p-2">
                <input type="search" placeholder="search patient"/>
                <button className="ui button">Search</button>
            </div>
            <div className="card p-2 bg-light">
                
    <h3 class="ui header blue">My Patients</h3>
  <table class="ui table">
    <thead><tr><th>Id</th><th>Name</th><th>Visit Type</th><th>Action</th></tr></thead>
    <tbody><tr><td>P2026011</td><td>Jane Doe</td><td>OPD</td><td><button class="ui tiny blue button">Open</button></td></tr>
    <tr><td>P2026011</td><td>Jane Doe</td><td>OPD</td><td><button class="ui tiny blue button">Open</button></td></tr>
    <tr><td>P2026011</td><td>Jane Doe</td><td>OPD</td><td><button class="ui tiny blue button">Open</button></td></tr>
    <tr><td>P2026011</td><td>Jane Doe</td><td>OPD</td><td><button class="ui tiny blue button">Open</button></td></tr></tbody>
  </table>
</div>
            </div>
        </div>
    )
}
export default Patients