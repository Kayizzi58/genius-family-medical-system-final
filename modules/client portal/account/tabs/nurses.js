function Nurses(){
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
                <button class="ui blue button"><i className="add icon"></i> Add Nurse</button>
<br></br>
<br></br>
            <div className="card p-2 bg-light">
      <h3 class="ui header blue">Nurses</h3>
      
  <table class="ui table"><tr><td>N20261</td><td>Nurse Anna</td><td>Ward A</td><td><button className="ui blue button">View info</button></td><td><button className="ui tiny green button">Action</button></td></tr></table>

</div>

        </div>
    )
}
export default Nurses