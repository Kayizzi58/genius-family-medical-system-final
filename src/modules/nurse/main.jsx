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
import Wardd from "./tables/wards";
import Patientsss from "./tables/pat";
import Nursetab from "./tables/tasks";
import Shiftstab from "./tables/shifts";
import Vitalss from "./tables/vitals";
import Nursereports from "./tables/reports";
import Mertanitymain from "../../componets/views/mertanity";
import Medss from "./tables/meds";
import Nursedashboard from "./tables/tasks";
import Shifts from "./tables/shifts";
import Reports from "./tables/reports";
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
  <a className={`item ${active === 6 ? 'active':''}`} onClick={()=>setActive(6)}>Shifts</a>
  <a className={`item ${active === 7 ? 'active':''}`} onClick={()=>setActive(7)}>Reports</a>

</div>
{active == 0 && <Dash/>}
{active == 1 && <Patientsss/>}
{active == 2 && <Wardd nurseName="Nurse Smith"/>}
{active == 3 && <Vitalss nurseName="Nurse Smith"/>}
{active == 4 && <Medss nurseName="Nurse Smith"/>}
{active == 6 && <Shifts/>}
{active == 7 && <Reports nurseName="Nurse Smith"/>}
        </div>
    )
}
export default Main