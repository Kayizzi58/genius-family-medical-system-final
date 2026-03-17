import { useState } from "preact/hooks"
import Dash from "./tabs/dash"
import Ward from "./tabs/ward"
import Admission from "./tabs/admission"
import Bed from "./tabs/beds"
import Rounds from "./tabs/rounds"
import Status from "./tabs/status"
import Report from "./tabs/report"
import Wardmanagement from "./tabs/ward2"
import Ipdadmissions from "./tabs/admission2"
import Bedassignment from "./tabs/beds2"
import Dailyrounds from "./tabs/rounds2"
import Patientstatus from "./tabs/status2"
import Employeereports from "./tabs/report2"

function Ipd(){
  const [active, setActive] =useState(0)
    return (
        <div>
         
<br></br>
<div className="ui top attached green tabular menu">
  <a className={`item ${active === 0 ? "active":''}`} onClick={()=> setActive(0)}>DashBoard</a>
  <a className={`item ${active === 1 ? "active":''}`} onClick={()=> setActive(1)}>Ward Management</a>
  <a className={`item ${active === 2 ? "active":''}`} onClick={()=> setActive(2)}>Admission</a>
  <a className={`item ${active === 3 ? "active":''}`} onClick={()=> setActive(3)}>Bed assignment</a>
  <a className={`item ${active === 4 ? "active":''}`} onClick={()=> setActive(4)}>Daily rounds</a>
  <a className={`item ${active === 5 ? "active":''}`} onClick={()=> setActive(5)}>Status</a>
  <a className={`item ${active === 6 ? "active":''}`} onClick={()=> setActive(6)}>Reports</a>
</div>

{active == 0 && <Dash/>}
{active == 1 && <Wardmanagement/>}
{active == 2 && <Ipdadmissions/>}
{active == 3 && <Bedassignment/>}
{active == 4 && <Dailyrounds/>}
{active == 5 && <Patientstatus/>}
{active == 6 && <Employeereports/>}

  
 
        </div>
    )
}
export default Ipd