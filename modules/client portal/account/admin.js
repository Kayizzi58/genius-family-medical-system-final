import { useLocation } from "preact-iso";
import { useState } from "preact/hooks";
import Patients from "./tabs/patients";
import Docs from "./tabs/docs";
import Nurses from "./tabs/nurses";
import Appoint from "./tabs/appoints";
import Admission from "./tabs/admissions";
import Lab from "./tabs/lab";
import Inv from "./tabs/inventory";
import Bills from "./tabs/billing";
import Reports from "./tabs/reports";
import Roles from "./tabs/roles";
function Admin(){
  var {url} = useLocation()
  const [active, setActive] = useState(0)
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Admin || Portal</strong></div>
  <div class="right menu">
    <div class="item"><i class="home blue icon"></i>Home</div>
    <div class="item"><i class="bed blue icon"></i>IPD</div>
    <a href="/patients" className={url == "/patients" && 'active'}>
    <div class="item"><i class="stethoscope blue icon"></i> OPD</div>
    </a>
    <div class="item"><i class="bell blue icon"></i> Notifications</div>
    <div class="item"><i class="setting blue icon"></i>Settings</div>
    <div class="item"><i class="sign out red icon"></i>LogOut</div>
  </div>
</div>
<hr></hr>
<br></br>
<br></br>
<div className="ui top blue pointing attached tabular menu">
  <a className={`item ${active === 0 ? 'active':''}`} onClick={()=>setActive(0)}>Dashboard</a>
  <a className={`item ${active === 1 ? 'active':''}`} onClick={()=>setActive(1)}>Patients</a>
  <a className={`item ${active === 2 ? 'active':''}`} onClick={()=>setActive(2)}>Doctors</a>
  <a className={`item ${active === 3 ? 'active':''}`} onClick={()=>setActive(3)}>Nurses</a>
  <a className={`item ${active === 4 ? 'active':''}`} onClick={()=>setActive(4)}>Appointments</a>
  <a className={`item ${active === 5 ? 'active':''}`} onClick={()=>setActive(5)}>Admissions</a>
  <a className={`item ${active === 6 ? 'active':''}`} onClick={()=>setActive(6)}>Laboratory</a>
  <a className={`item ${active === 7 ? 'active':''}`} onClick={()=>setActive(7)}>Inventory</a>
  <a className={`item ${active === 8 ? 'active':''}`} onClick={()=>setActive(8)}>Billings</a>
  <a className={`item ${active === 9 ? 'active':''}`} onClick={()=>setActive(9)}>Reports</a>
  <a className={`item ${active === 10 ? 'active':''}`} onClick={()=>setActive(10)}>Roles</a>

</div>
<div class="pusher" style="margin-top:70px;padding:20px">
   
 {active == 0 && <div className="card p-2 bg-light ui raised fluid">
      <h2 class="ui header blue ribbon label">Admin Dashboard</h2>
      <br></br>
      <hr></hr>
      
  <div class="ui four stackable cards">
    <div class="card"><div class="content"><div class="header">Total Patients</div><div class="description">1,245</div></div></div>
    <div class="card"><div class="content"><div class="header">Active Admissions</div><div class="description">78</div></div></div>
    <div class="card"><div class="content"><div class="header">Staff On Duty</div><div class="description">56</div></div></div>
    <div class="card"><div class="content"><div class="header">Revenue Today</div><div class="description">$4,560</div></div></div>
  </div>
   </div>}
 {active == 1 && <Patients/>}
 {active == 2 && <Docs/>}
 {active == 3 && <Nurses/>}
 {active == 4 && <Appoint/>}
 {active == 5 && <Admission/>}
 {active == 6 && <Lab/>}
 {active == 7 && <Inv/>}
 {active == 8 && <Bills/>}
 {active == 9 && <Reports/>}
 {active == 10 && <Roles/>}
 
</div>
        </div>
    );
}
export default Admin