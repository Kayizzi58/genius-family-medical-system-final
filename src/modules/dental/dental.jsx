import Reg from "./tabs/reg"
import Appoint from "./tabs/appoint"
import Treat from "./tabs/treat"
import Presc from "./dental/presc3"
import Laborders from "./dental/lab"
import Report from "./tabs/reports"
import Set from "./dental/settings"
import { useState } from "preact/hooks"
import Dpatient from "./dental/patient"
import Treatmentss from "./dental/treatements"
import Appo from "./dental/appo"
import Reports from "./dental/reports3"
import OPD from "../../componets/views/OPD/idex"
import Ipd from "../../componets/views/IPD/ipd"
import RadioOrder from "./dental/radio"
import Radioorder from "./dental/radio"


function Dental(){
  const [mod, setMod] = useState(0)
  const [active, setActive] = useState(0)
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Dentist || Portal</strong></div>
  <div class="right menu">
    <div class="item ui green label large">Dentist</div>
    <div class="item"><i class=" icon"></i><button className="ui basic blue button" onClick={()=> setMod(0)}> Home</button></div>
    <div class="item"><i class=" icon"></i><button className="ui basic blue button" onClick={()=> setMod(1)}>OPD</button></div>
    <div class="item"><i class=" icon"></i><button className="ui basic blue button" onClick={()=> setMod(2)}>IPD</button></div>
    <div class="item"><i class="sign red out icon"></i></div>
  </div>
</div>

<hr></hr>
<br></br>
{mod == 0 && <div><br></br>
<div className="ui top blue pointing attached tabular menu">
  <a className={`item ${active === 0 ? 'active':''}`} onClick={()=>setActive(0)}>Dashboard</a>
  <a className={`item ${active === 2 ? 'active':''}`} onClick={()=>setActive(2)}>Appointments</a>
  <a className={`item ${active === 3 ? 'active':''}`} onClick={()=>setActive(3)}>Treatments</a>
  <a className={`item ${active === 4 ? 'active':''}`} onClick={()=>setActive(4)}>Prescriptions</a>
  <a className={`item ${active === 5 ? 'active':''}`} onClick={()=>setActive(5)}>Lab Orders</a>
  <a className={`item ${active === 8 ? 'active':''}`} onClick={()=>setActive(8)}>Radiology Order</a>
  <a className={`item ${active === 6 ? 'active':''}`} onClick={()=>setActive(6)}>Reports</a>
  <a className={`item ${active === 7 ? 'active':''}`} onClick={()=>setActive(7)}>Settings</a>
</div>
<br></br>
<hr></hr>
 {active == 0 && <div class="pusher" style="margin-top:70px;padding:20px">
   <div className="card p-2 bg-light">
     <h2 class="ui header blue ribbon label"><i className="bi bi-doctor"></i>Dental Dashboard</h2>
  <br></br>
  <br></br>
  <hr></hr>
  <div class="ui four stackable cards">
    <div class="card"><div class="content"><div class="header">Today's Appointments</div><div class="description">12</div></div></div>
    <div class="card"><div class="content"><div class="header">Registered Patients</div><div class="description">80</div></div></div>
    <div class="card"><div class="content"><div class="header">Pending Treatments</div><div class="description">5</div></div></div>
    <div class="card"><div class="content"><div class="header">Pending Lab Tests</div><div class="description">3</div></div></div>
  </div>
   </div>
    
</div>}
{active == 2 && <Appo/>}
{active == 3 && <Treat/>}
{active == 4 && <Presc/>}
{active == 5 && <Laborders/>}
{active == 6 && <Reports/>}
{active == 8 && <Radioorder/>}
{active == 7 && <Set/>}</div>}
{mod == 1 && <OPD/>}
{mod == 2 && <Ipd/>}

        </div>
    )
}
export default Dental