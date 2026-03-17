function Settings(){
    return (
        <div>
             <div className="card p-2 bg-light">
    <h3 class="ui header">IPD Settings</h3>
  <form class="ui form">
    <div class="field"><label>Bed Capacity per Ward</label><input value="30"/></div>
    <div class="field"><label>Admission Rules</label><input placeholder="Specify rules"/></div>
    <button class="ui primary button"><i className="save icon"></i>Save Settings</button>
  </form>
  </div>
        </div>
    )
}
export default Settings