function Docs(){
    return (
        <div>
             <div className="ui four stackable cards p-2">
                <div className="ui input labeled">
                <label className="ui label">Search By Name</label>
                <input type="search" placeholder="search by name"/>
            </div>
            <br></br>
            <br></br>
            <div><label className="ui label">Filter By date</label><select>
                <option>Newest</option>
                <option>Oldest</option>
            
                </select></div>
            </div>
            <br></br>
            <br></br>
            <button class="ui blue button"><i className="add icon"></i> Add Doctor</button>
            
            <br></br>
            <br></br>
            <div className="card p-2 bg-light">
      <h3 class="ui header blue">Doctors</h3>
  
  <table class="ui table">
    <thead><tr><th>Personal No</th><th>Name</th><th>Specialty</th><th>Status</th><th>Manage</th></tr></thead>
    <tbody><tr><td>DC20261</td><td>John Smith</td><td>General</td><td className="ui green label">Available</td><td><button className="ui tiny blue button"><i className="setting icon"></i></button></td></tr></tbody>
  </table>
</div>

        </div>
    )
}
export default Docs