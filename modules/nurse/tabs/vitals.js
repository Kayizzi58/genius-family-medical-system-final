function Vitals(){
    return (
        <div>
<div className="card bg-light p-2">
    <h3 class="ui header blue">Record Vitals</h3>
  <form class="ui form">
    <div class="three fields">
      <div class="field card p-2"><label className="ui label">BP</label><input placeholder="120/80"/></div>
      <div class="field card p-2"><label className="ui label">Pulse</label><input/></div>
      <div class="field card p-2"><label className="ui label">Temp (°C)</label><input/></div>
    </div>
    <button class="ui primary button"><i className="save icon"></i>Save Vitals</button>
  </form>
  </div>
        </div>
    )
}
export default Vitals