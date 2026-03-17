function Patients(){
    return (
        <div>
            <button class="ui primary button"><i className="add icon"></i>Add Patient</button>
            <br></br>
            <br></br>
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
            <div className="card p-2">
     <h3 class="ui header blue">Patients Management <span className="ui label">200</span></h3>
  
  <table class="ui celled table">
    <thead><tr><th>MRN</th><th>Name</th><th>Age</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>MRN-001</td><td>Jane Doe</td><td>34</td><td>OPD</td><td><button class="ui tiny blue button">View</button></td></tr>
    </tbody>
  </table>

   </div>
        </div>
    )
}
export default Patients