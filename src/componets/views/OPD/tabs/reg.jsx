function Reg(){
    return (
        <div>
            <div className="card p-2  green-bkg">
    <h3 class="ui header blue">Patient Registration</h3>
  <form class="ui form">
    <div class="field"><label>Patient Name</label><input placeholder="Enter patient name"/></div>
    <div class="field"><label>MRN</label><input placeholder="Medical Record Number is auto-generated" className=" ui disable"/></div>
    <div class="field"><label>Contact</label><input placeholder="Phone or email"/></div>
    <div class="field"><label>Gender</label><select class="ui dropdown"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option></select></div>
    <div class="field"><label>Date of Birth</label><input type="date"/></div>
    <button class="ui primary button">Register Patient</button>
  </form>
</div>
        </div>
    )
}
export default Reg