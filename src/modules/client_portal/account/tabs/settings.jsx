function Settings(){
    return (
        <div>
            <div className="card p-2 bg-light">
    <h3 class="ui header blue">System Settings</h3>
  <form class="ui form">
    <div class="field card p-2"><label className="ui label">Hospital Name</label><input value="City Hospital"/></div>
    <div class="field card p-2"><label className="ui label">Hospital Location</label><input value="City Hospital"/></div>
    <div class="field card p-2"><label className="ui label">Work Time</label><input value="Open Time"/><input value="Close Time"/></div>
    <div class="field card p-2"><label className="ui label">Hospital Email</label><input value="City Hospital"/><button className="ui blue button"><i className="add icon"></i>Add</button></div>
    <div class="field card p-2"><label className="ui label">Hospital website</label><input value="City Hospital"/><button className="ui blue button"><i className="add icon"></i>Add</button></div>
    <div class="field card p-2"><label className="ui label">Hospital Branches</label><input value="City Hospital"/><button className="ui blue button"><i className="add icon"></i>Add</button></div>
    <div class="field card p-2"><label className="ui label">Hospital Telephone</label><input value="City Hospital"/><input value="City Hospital"/><input value="City Hospital"/></div>
    <button class="ui green button"><i className="save icon"></i>Save Settings</button>
    
  </form>
  </div>
        </div>
    )
}
export default Settings