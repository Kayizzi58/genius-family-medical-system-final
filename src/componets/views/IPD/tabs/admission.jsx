function Admission(){
    return (
        <div>
            <div className="card p-2 bg-light">
    <h3 class="ui header blue">Patient Admission</h3>
  <form class="ui form">
    <div class="field card p-2"><label className="ui label">Patient Name</label><input placeholder="Enter patient name"/></div>
    <div class="field card p-2"><label className="ui label">MRN</label><input placeholder="Medical Record Number"/></div>
    <div class="field card p-2"><label className="ui label">Ward</label><input placeholder="Assign ward"/></div>
    <div class="field card p-2"><label className="ui label">Bed</label><input placeholder="Assign bed number"/></div>
    <button class="ui primary button"><i className="share icon"></i>Admit Patient</button>
  </form>
   </div>
        </div>
    )
}
export default Admission