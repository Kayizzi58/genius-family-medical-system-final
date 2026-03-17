import { useState } from "preact/hooks"
import Dash from "./tabs/dash";
import Consultation from "./tabs/consultaion";
import Laborders from "./tabs/laborder";
import Patients from "./tabs/patients";
import Presc from "./tabs/presc";
import Referral from "./tabs/refferals";
import Report from "../pharmacy/report";
import Rounds from "./tabs/rounds";
import Settings from "../pharmacy/settings";
import Appoint from "./tabs/appoint";
import Consult from "./tables/consultation";
import Lab from "./tables/lab";
import Presct from "./tables/presc";
import Sets from "./tables/sets";
import Reports from "./tables/report";
import Referrals from "./tables/refferals";
import Appointt from "./tables/appoints";
import Patientss from "./tables/patients";
import { LocationProvider, Route, Router, useLocation } from "preact-iso";
import Mertanitymain from "../../componets/views/mertanity";
import OPD from "../../componets/views/OPD/idex";
import Ipd from "../../componets/views/IPD/ipd";
function Doctor(){
  const {url} = useLocation();
  const [active, setActive] = useState(0);
  const handler = (ind) => {setActive(ind)}
  const [mod, setModule] = useState(0)
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Doctor || Portal</strong></div>
  <div class="right menu">
    <div class="item ui label green large">John Smith</div>
    <div class="item"><button className="ui basic blue button" onClick={()=> setModule(0)}>Home</button></div>
    <div class="item"><button className="ui basic blue button" onClick={()=> setModule(1)}>OPD</button></div>
    <div class="item"><button className="ui basic blue button" onClick={()=> setModule(2)}>IPD</button></div>
    
    
    <div class="item"><i class="red sign out icon"></i></div>
  </div>
</div>
<br></br>
<br></br>
<hr></hr>
     {mod == 0 && <div>
      <br></br><br></br>
<div className="ui top blue pointing attached tabular menu">
  <a className={`item ${active === 0 ? 'active':''}`} onClick={()=>setActive(0)}>Dashboard</a>
  <a className={`item ${active === 1 ? 'active':''}`} onClick={()=>setActive(1)}>Patients</a>
  <a className={`item ${active === 2 ? 'active':''}`} onClick={()=>setActive(2)}>Appointments</a>
  <a className={`item ${active === 3 ? 'active':''}`} onClick={()=>setActive(3)}>Consultation</a>
  <a className={`item ${active === 4 ? 'active':''}`} onClick={()=>setActive(4)}>Lab Orders</a>
  <a className={`item ${active === 5 ? 'active':''}`} onClick={()=>setActive(5)}>Prescription</a>
  <a className={`item ${active === 6 ? 'active':''}`} onClick={()=>setActive(6)}>Referrals</a>
  <a className={`item ${active === 8 ? 'active':''}`} onClick={()=>setActive(8)}>Reports</a>
  <a className={`item ${active === 7 ? 'active':''}`} onClick={()=>setActive(7)}>Settings</a>
</div>
      {active == 0 && <Dash/>}
     {active == 1 && <Patientss/>}
     {active == 2 && <Appointt doctorName="Dr. Smith"/>}
     {active == 3 && <Consult/>}
     {active == 4 && <Lab doctorName="Dr. Smith"/>}
     {active == 5 && <Presct doctorName="Dr. Smith"/>}
     {active == 6 && <Referrals doctorName="Dr. Smith"/>}
     {active ==8 && <Reports doctorName="Dr. Smith"/>}
     {active == 7 && <Sets doctorName="Dr. Smith" email="john.smith@hospital.com"/>}
     </div>}
 {mod == 1 && <OPD/>}
 {mod == 2 && <Ipd/>}
        </div>
    )
}
export default Doctor