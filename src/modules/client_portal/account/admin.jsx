import { useLocation } from "preact-iso";
import { useState } from "preact/hooks";
import Patientss from "../../doctor/tables/patients";
import Docs from "./tabs/docs";
import Nurses from "./tabs/nurses";
import Appoint from "./tabs/appoints";
import Admission from "./tabs/admissions";
import Lab from "./tabs/lab";
import Inv from "./tabs/inventory";
import Bills from "./tabs/billing";
import Reports from "./tabs/reports";
import Roles from "./tabs/roles";
import Ipd from "../../../componets/views/IPD/ipd";
import OPD from "../../../componets/views/OPD/idex";
import Docsmain from "./tabs/docs3";
import Nursess from "./tabs/nurse3";
import Staffappointments from "./tabs/appoints2";
import Admissions from "./tabs/admissions2";
import Labactivities from "./tabs/lab3";
import Inventory from "./tabs/inventory3";
import Billing from "./tabs/billing3";
import Employeereports from "./tabs/reports3";
import Rolespermissions from "./tabs/roles3";




function Admin(){
  const [name, setName] = useState("")
  fetch("https://database-ndx2.onrender.com/roles").then(res=> res.json()).then(data=> {
  setName(data.name);
})
  const [view, setView] = useState(0)
  var {url} = useLocation()
  const [active, setActive] = useState(0)
    return (
        <div>
                     <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Admin || Portal</strong></div>
  <div class="right menu">
    <div className="ui label green large">{name}</div>
    <div class="item"><button onClick={()=> setView(0)} className="ui basic button"><i class="home blue icon" ></i>Home</button></div>
    <div class="item"><button onClick={()=> setView(1)} className="ui basic button"><i class="bed blue icon"></i>IPD</button></div>
    
    
    <div class="item"><button className="ui basic button" onClick={()=> setView(2)}><i class="stethoscope blue icon" ></i>OPD</button></div>
    
    <div class="item"><i class="sign out red icon"></i>LogOut</div>
  </div>
</div>
<hr></hr>
<br></br>
<br></br>
           {view == 0 && <div>
  
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
    <div class="card"><div class="content"><div class="header">Total Patients</div><div class="description center">1,245</div></div></div>
    <div class="card"><div class="content"><div class="header">Active Admissions</div><div class="description">78</div></div></div>
    <div class="card"><div class="content"><div class="header">Staff On Duty</div><div class="description">56</div></div></div>
    <div class="card"><div class="content"><div class="header">Revenue Today</div><div class="description">$4,560</div></div></div>
  </div>
   </div>}
 {active == 1 && <Patientss/>}
 {active == 2 && <Docsmain />}
 {active == 3 && <Nursess/>}
 {active == 4 && <Staffappointments/>}
 {active == 5 && <Admissions/>}
 {active == 6 && <Labactivities/>}
 {active == 7 && <Inventory/>}
 {active == 8 && <Billing/>}
 {active == 9 && <Employeereports/>}
 {active == 10 && <Rolespermissions/>}
 
</div></div>}
{view == 1 && <Ipd/>}
{view == 2 && <OPD/>}
        </div>
    );
}
export default Admin