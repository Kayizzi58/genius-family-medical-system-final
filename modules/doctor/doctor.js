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
function Doctor(){
  const [active, setActive] = useState(0);
  const handler = (ind) => {setActive(ind)}
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Doctor || Portal</strong></div>
  <div class="right menu">
    <div class="item ui label green large">John Smith</div>
    <div class="item"><i class="blue bell icon"></i>Notifications</div>
    <div class="item"><i class="red sign out icon"></i></div>
  </div>
</div>
<br></br><br></br>
<div className="ui top blue pointing attached tabular menu">
  <a className={`item ${active === 0 ? 'active':''}`} onClick={()=>setActive(0)}>Dashboard</a>
  <a className={`item ${active === 1 ? 'active':''}`} onClick={()=>setActive(1)}>Patients</a>
  <a className={`item ${active === 2 ? 'active':''}`} onClick={()=>setActive(2)}>Appointments</a>
  <a className={`item ${active === 3 ? 'active':''}`} onClick={()=>setActive(3)}>Consultation</a>
  <a className={`item ${active === 4 ? 'active':''}`} onClick={()=>setActive(4)}>Lab Orders</a>
  <a className={`item ${active === 5 ? 'active':''}`} onClick={()=>setActive(5)}>Prescription</a>
  <a className={`item ${active === 6 ? 'active':''}`} onClick={()=>setActive(6)}>Referrals</a>
  <a className={`item ${active === 7 ? 'active':''}`} onClick={()=>setActive(7)}>Settings</a>
</div>
     {active == 0 && <Dash/>}
     {active == 1 && <Patients/>}
     {active == 2 && <Appoint/>}
     {active == 3 && <Consultation/>}
     {active == 4 && <Laborders/>}
     {active == 5 && <Presc/>}
     {active == 6 && <Referral/>}
     {active == 7 && <div>settings</div>}

        </div>
    )
}
export default Doctor