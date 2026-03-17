function Shift(){
    return (
        <div>
 <div className="card p-2 bg-light">
    <h3 class="ui header blue">Shift Handover</h3>
  <div class="ui message blue">Patient Jane Doe requires vitals monitoring every 4 hours.</div>

  </div>
  <hr></hr>
  <div className="ui header blue">My Shift <span className="ui red label">From 08:00am to 04:00pm</span></div>
  <div className="ui four celed cards p-2">
    <div>
        <form className="ui form">
        <div className="field">
            <div className="ui lebeled input">
            <label className="ui blue label"><i className="clock icon"></i> Start Time</label>
            <input type="time" placeholder="start time"/>
        </div>
        </div>
    </form>
    </div>
    <div>
        <form className="ui form">
        <div className="field">
            <div className="ui lebeled input">
            <label className="ui green label"><i className="clock icon"></i> End Time</label>
            <input type="time" placeholder="start time"/>
        </div>
        </div>
    </form>
    </div>
    <button className="ui tiny green button">Change</button>
  </div>
        </div>
    )
}
export default Shift