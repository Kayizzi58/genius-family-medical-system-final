import { useState } from "preact/hooks"
import Care from "./tabs/care";
import Meds from "./tabs/meds";
import Patient from "./tabs/patient";
import Report from "./tabs/reports";
import Shift from "./tabs/shift";
import Tasks from "./tabs/tasks";
import Vitals from "./tabs/vitals";
import Dash from "./tabs/dash";
import Wards from "./tabs/wards";
import Mertanitymain from "../../componets/views/mertanity";
function Main(){
    const [active, setActive] = useState(0)
    return (
        <div>
            <div className="ui top blue pointing attached tabular menu">
  <a className={`item ${active === 0 ? 'active':''}`} onClick={()=>setActive(0)}>Dashboard</a>
  <a className={`item ${active === 1 ? 'active':''}`} onClick={()=>setActive(1)}>Patients</a>
  <a className={`item ${active === 2 ? 'active':''}`} onClick={()=>setActive(2)}>Wards</a>
  <a className={`item ${active === 3 ? 'active':''}`} onClick={()=>setActive(3)}>Vitals</a>
  <a className={`item ${active === 4 ? 'active':''}`} onClick={()=>setActive(4)}>Medications</a>
  <a className={`item ${active === 5 ? 'active':''}`} onClick={()=>setActive(5)}>Tasks</a>
  <a className={`item ${active === 6 ? 'active':''}`} onClick={()=>setActive(6)}>Shifts</a>
  <a className={`item ${active === 7 ? 'active':''}`} onClick={()=>setActive(7)}>Reports</a>

</div>
{active == 0 && <Dash/>}
{active == 1 && <Patient/>}
{active == 2 && <Wards/>}
{active == 3 && <Vitals/>}
{active == 4 && <Meds/>}
{active == 5 && <Tasks/>}
{active == 6 && <Shift/>}
{active == 7 && <Report/>}
        </div>
    )
}
export default Main