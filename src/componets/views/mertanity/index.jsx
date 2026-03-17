import { useState } from "preact/hooks";
import Patient from "./tabs/patient";
import Antenatal from "./tabs/antenantal";
import Labor from "./tabs/labor";
import Care from "./tabs/care";
import Report from "./tabs/report";
import Dash from "./tabs/dash";
import Postnatal from "./tabs/post";

function Mertanitymain(){
  const [active, setActive] = useState(0)
    return (
        <div>
      
<br></br>
<br></br>
<hr></hr>
<div className="ui blue top atached tabular menu">
  <a className={`item ${active ===0 ? "active":''}`} onClick={()=> setActive(0)}>Dashboard</a>
  <a className={`item ${active ===1 ? "active":''}`}onClick={()=> setActive(1)}>Patient Regestration</a>
  <a className={`item ${active ===2 ? "active":''}`} onClick={()=> setActive(2)}>Antenatal</a>
  <a className={`item ${active ===3 ? "active":''}`} onClick={()=> setActive(3)}>Postnatal</a>
  <a className={`item ${active ===4 ? "active":''}`} onClick={()=> setActive(4)}>Labor & Delivery</a>
  <a className={`item ${active ===6 ? "active":''}`} onClick={()=> setActive(6)}>Reports</a>
</div>

 
 {active == 0 && <Dash/>}
 {active == 1 && <Patient/>}
 {active == 2 && <Antenatal/>}
 {active == 3 && <Postnatal/>}
 {active == 4 && <Labor/>}
 {active == 5 && <Care/>}
 {active == 6 && <Report/>}
  


  
        </div>
    )
}
export default Mertanitymain