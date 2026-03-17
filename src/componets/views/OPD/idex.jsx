import { useState } from "preact/hooks"
import Reg from "./tabs/reg"
import Appoint from "./tabs/appoints"
import Consultation from "./tabs/consultation"
import Lab from "./tabs/labReq"
import Presc from "./tabs/prescs"
import Report from "./tabs/reports"
import Dash from "./tabs/dash"
import Opdpatients from "./tabs/reg2"
import Opdappointments from "./tabs/appoints2"
import Opdconsultations from "./tabs/consult2"
import Labrequests from "./tabs/labreq2"
import Allprescriptions from "./tabs/presc2"
import Employeereports from "./tabs/reports2"
function OPD(){
  const [active, setActive] =useState(0)
    return(
        <div>
         
<br></br>
<div className="ui top attached blue pointing tabular menu">
  <a className={`item ${active === 0 ? "active":''}`} onClick={()=>setActive(0)}>DashBoard</a>
  <a className={`item ${active === 1 ? "active":''}`} onClick={()=>setActive(1)}>Regestration</a>
  <a className={`item ${active === 2 ? "active":''}`} onClick={()=>setActive(2)}>Appointments</a>
  <a className={`item ${active === 3 ? "active":''}`} onClick={()=>setActive(3)}>Consultation</a>
  <a className={`item ${active === 4 ? "active":''}`} onClick={()=>setActive(4)}>Lab Request</a>
  <a className={`item ${active === 5 ? "active":''}`} onClick={()=>setActive(5)}>Prescription</a>
  <a className={`item ${active === 6 ? "active":''}`} onClick={()=>setActive(6)}>Report</a>
</div>
   {active == 0 && <Dash/>}
   {active == 1 && <Opdpatients/>}
   {active == 2 && <Opdappointments/>}
   {active == 3 && <Opdconsultations/>}
   {active == 4 && <Labrequests/>}
   {active == 5 && <Allprescriptions/>}
   {active == 6 && <Employeereports/>}
        </div>
    )
}
export default OPD