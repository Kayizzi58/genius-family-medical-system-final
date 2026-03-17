function Client(){
    return (
         <div>
                    <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Genius Medical Services</strong></div>
  <div class="right menu">
    <div class="item ui green label">Ian Walya</div>
    <div class="item"><i class="bell icon"></i></div>
    <div class="item"><i class="sign out icon"></i></div>
  </div>
</div>
<hr></hr>
<div className="card p-2 bg-light ui fluid raised">
    <div style="display: flex; flex-direction: column; align-items:center; justify-content:center;">
    <i className="bi bi-person blue" style="font-size: xx-large; color: blue"></i>
    <h3 className="ui blue large pointing below label">Ian Walya</h3>
</div>
</div>
    <div className="card">
        <div class="pusher" style=" margin-top:70px; padding:20px">
        <h2 class="ui header ui green ribbon label"><i className="dashboard icon"></i>Patient Portal</h2>
        <hr></hr>
  <div class="ui four stackable cards">
    <div class="card"><div class="content"><div class="header ui green">Status</div><div class="description">OPD - Active</div></div></div>
    <div class="card"><div class="content"><div class="header ui blue">Next Appointment</div><div class="description">12 Feb 2026</div></div></div>
    <div class="card"><div class="content"><div class="header ui orange">Outstanding Balance</div><div class="description">$120</div></div></div>
    <div class="card"><div class="content"><div class="header ui blue">Assigned Doctor</div><div class="description">Dr. John Smith</div></div></div>
  </div>
    </div>
    </div>
    <div class="ui divider"></div>
    <div className="card p-2 bg-light">
      <h3 class="ui header ui blue">Appointments <span className="ui label">1</span></h3>
  <table class="ui celled table">
    <thead><tr><th>Date</th><th>Doctor</th><th>Department</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td className="ui blue"> <i className="calendar icon"></i> 12 Feb 2026</td><td>Dr. Smith</td><td>OPD</td><td>Confirmed</td></tr>
    </tbody>
  </table>
  <button class="ui blue button"><i className="book icon"></i>Book Appointment</button>
    </div>
  
  <div class="ui divider"></div>
  <div className="card p-2 pusher bg-light">
    <h3 class="ui header blue">Medical Records <span className="ui label">1</span></h3>
  <div class="ui relaxed list card p-2 fluid">
    <div class="item"><span className="ui label">OPD Visit - Jan 2026</span> </div>
    <div class="item ui"><span className="ui">Diagnosis - Malaria</span></div>
  </div>
  </div>
  <div class="ui divider"></div>
  <div className="card p-2 bg-light">
    <h3 class="ui header blue">Lab & Imaging</h3>
  <table class="ui striped table">
    <thead><tr><th className="bi bi-eye"> Test</th><th className="bi bi-calendar"> Date</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>Blood Test</td><td>10 Feb</td><td>Ready</td><td><button class="ui tiny blue button"><i className="download icon"></i>Download</button></td></tr>
    </tbody>
  </table>
  <button className="ui blue button">View More</button>
  </div>
  <div class="ui divider"></div>
  <div className="card p-2 fluid">
    <h3 class="ui header blue">Prescriptions <span className="ui label">1</span></h3>
  <div class="ui cards">
    <div class="card"><div class="content"><div class="header ui blue pointing below label">Paracetamol</div><div class="description ui label">2x Daily - 5 Days</div></div></div>
  </div>
  <br></br>
  <button className="ui blue button">View More</button>
  </div>

  <div class="ui divider "></div>
  <div className="card p-2">
    <h3 class="ui header blue">Billing & Payments <span className="ui label">Total Bill: 1000 (UGX) || Total payments: 2 (items)</span></h3>
  <table class="ui table">
    <thead><tr><th>Item</th><th>Amount</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>Consultation</td><td>$50</td><td>Paid</td></tr>
      <tr><td>Lab</td><td>$70</td><td>Pending</td></tr>
    </tbody>
  </table>
  <button class="ui green button"><i className="money icon"></i>Pay Now</button>
  </div>

  <div class="ui divider"></div>
  <div className="card p-2">
    <div className="bg-light p-2">
    <h3 class="ui header blue">Referrals <span className="ui label">1</span></h3>
  <div class="ui message green"><i className="bi bi-chat"></i> Referred to Radiology Department</div>
</div>
  </div>
  <div class="ui divider"></div>
<div className=" bg-light p-2">
    <div className="card p-2">
      <h3 class="ui header ui blue">Admissions <span className="ui label">1</span></h3>
  <p>No current admission</p>
    </div>
</div>
    

  <div class="ui divider"></div>
  <div className="bg-light p-2">
    <h3 class="ui header ui blue">Documents <span className="ui label">1</span></h3>
  <div class="ui list card p-2 fluid">
    <div class="item"> Discharge Summary<span className="ui label"><i className="download blue icon"></i></span></div>
  </div>
  </div>

  <div class="ui divider"></div>
  <div className="bg-light card p-2 ">
    <h3 class="ui header blue"><i className="bi bi-chat"></i> Messages <span className="ui label">1</span></h3>
  <div class="ui comments ui green left pointing label">
    <div class="comment"><div class="content card p-2"><span class="author">Doctor: Ian Walya</span><div class="text">"Take meds regularly"</div></div></div>
  </div>
  </div>
         </div>
    );
}
export default Client