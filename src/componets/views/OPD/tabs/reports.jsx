function Report(){
    return (
        <div>
            <div className="card p-2 ui raised fluid bg-light">
    <h3 class="ui header blue">OPD Reports</h3>
  <button class="ui green button"><i className="list icon"></i>Generate Daily Report</button>

  <div class="ui divider"></div>
  <h3 class="ui header blue">OPD Settings</h3>
  <form class="ui form">
    <div class="field"><label>Working Hours</label><input value="08:00 AM - 05:00 PM"/></div>
    <div class="field"><label>Consultation Duration (mins)</label><input value="30"/></div>
    <button class="ui primary button"><i className="save icon"></i>Save Settings</button>
  </form>
  </div>
        </div>
    )
}
export default Report