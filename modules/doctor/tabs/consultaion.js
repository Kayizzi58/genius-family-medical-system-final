function Consultation(){
    return (
        <div>
            <div className="card p-2 bg-light">
     <h3 class="ui header blue">Consultation Notes</h3>
  <form class="ui form">
    <div class="field"><label>Diagnosis</label><input placeholder="Enter diagnosis"/></div>
    <div class="field"><label>Clinical Notes</label><textarea></textarea></div>
    <button class="ui primary button">Save Consultation</button>
  </form>
</div>
        </div>
    )
}
export default Consultation