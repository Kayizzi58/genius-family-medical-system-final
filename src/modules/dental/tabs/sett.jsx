function Set(){
    return (
        <div>
<div className="card p-2 bg-light">
  <h3 class="ui header blue">Settings</h3>
  <form class="ui form">
    <div class="field card p-2"><label className="ui label"><i className="clock blue icon"></i>Working Hours</label><input value="08:00 AM - 05:00 PM"/></div>
    <div class="field"><label className="ui label"><i className="clock blue icon"></i>Appointment Duration (mins)</label><input value="30"/></div>
    <button class="ui blue button"><i className="add icon"></i>Save Settings</button>
  </form>
</div>
        </div>
    )
}
export default Set