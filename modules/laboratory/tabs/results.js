
function Results(){
    return (
        <div>
            <br></br>
             <br></br>
            <button className="ui tiny blue button"><i className="add icon"></i>Add Entry</button>
            <br></br>
             <br></br>
            <div className="card p-2 bg-light">
                
             <div className="card p-2 bg-light">
    <h3 class="ui header blue">Results Entry</h3>
  <form class="ui form">
    <div class="three fields">
      <div class="field card p-2"><label className="ui label">Hemoglobin</label><input/></div>
      <div class="field card p-2"><label className="ui label">WBC</label><input/></div>
      <div class="field card p-2"><label className="ui label">Platelets</label><input/></div>
    </div>
    <button class="ui primary button"><i className="save icon"></i>Save Results</button>
  </form>
   </div>
   <br>
   </br>
   <hr></hr>
            </div>
          <div className="p-2 card">
            <div className="card p-2 bg-light">
    <h3 class="ui header blue">Result Verification</h3>
  <div class="ui message">Results awaiting pathologist approval</div>
  <button class="ui green button"><i className="check icon"></i>Approve Results</button>

  </div>
          </div>
  <div class="ui divider"></div>
 <div className="card p-2 bg-light">
   <h3 class="ui header blue">Publish Results</h3>
  <button class="ui blue button"><i className="share icon"></i>Send to Doctor & Patient</button>

 </div>
        </div>
    )
}
export default Results