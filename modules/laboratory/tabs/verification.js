function Verify(){
    return (
        <div>
      
  <div class="ui divider"></div>
<div className="card p-2 bg-light">
    <h3 class="ui header blue">Laboratory Reports</h3>
  <button class="ui blue button"><i className="list icon"></i>Generate Lab Report</button>

</div>
  <div class="ui divider"></div>

 <div className="card p-2 bg-light">
   <h3 class="ui header blue">Lab Settings</h3>
  <form class="ui form">
    <div class="field card p-2"><label className="ui label">Reference Ranges</label><input placeholder="Configure normal ranges"/></div>
    <button class="ui primary button"><i className="save icon"></i>Save Settings</button>
  </form>
 </div>
        </div>
    )
}