import Reg from "./tabs/reg"
import Appoint from "./tabs/appoint"
import Treat from "./tabs/treat"
import Presc from "./tabs/presc"
import Lab from "./tabs/lab"
import Report from "./tabs/reports"
import Set from "./tabs/sett"
import { useState } from "preact/hooks"

function Dental(){
  const [active, setActive] = useState(0)
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Dentist || Portal</strong></div>
  <div class="right menu">
    <div class="item ui green label large">Dentist</div>
    <div class="item"><i class="home  blue icon"></i></div>
    <div class="item"><i class="sign red out icon"></i></div>
  </div>
</div>

<hr></hr>
<br></br>
<br></br>
<div className="ui top blue pointing attached tabular menu">
  <a className={`item ${active === 0 ? 'active':''}`} onClick={()=>setActive(0)}>Dashboard</a>
  <a className={`item ${active === 1 ? 'active':''}`} onClick={()=>setActive(1)}>Register</a>
  <a className={`item ${active === 2 ? 'active':''}`} onClick={()=>setActive(2)}>Appointments</a>
  <a className={`item ${active === 3 ? 'active':''}`} onClick={()=>setActive(3)}>Treatments</a>
  <a className={`item ${active === 4 ? 'active':''}`} onClick={()=>setActive(4)}>Prescriptions</a>
  <a className={`item ${active === 5 ? 'active':''}`} onClick={()=>setActive(5)}>Lab Orders</a>
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
{active == 1 && <Reg/>}
{active == 2 && <Appoint/>}
{active == 3 && <Treat/>}
{active == 4 && <Presc/>}
{active == 5 && <Lab/>}
{active == 6 && <Report/>}
{active == 7 && <Set/>}
        </div>
    )
}
export default Dental