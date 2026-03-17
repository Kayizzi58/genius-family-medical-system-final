function Reg(){
    return (
        <div>
           <div className="card p-2 bg-light">
  <h3 class="ui header blue">Patient Registration</h3>
 <div className="card p-2">
   <form class="ui form">
    <div class="field card p-2 bg-light"><label className="ui green label">Patient Name</label><input placeholder="Enter patient name"/></div>
    <div class="field card p-2 bg-light"><label className="ui green label">Contact</label><input placeholder="Phone or email"/></div>
    <div class="field card p-2 bg-light"><label className="ui green label"> Gender</label><select class="ui dropdown"><option value="">Select</option><option value="male">Male</option><option value="female">Female</option></select></div>
    <div class="field card p-2 bg-light"><label className="ui green label">Date of Birth</label><input type="date"/></div>
    <button class="ui primary button"><i  className="add icon"></i>Register Patient</button>
  </form>
 </div>
</div>
        </div>
    )
}
export default Reg