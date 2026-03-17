import { useState } from "preact/hooks"
import Tests from "./tabs/orders";
import Samples from "./tables/samples";
import Processing from "./tables/process";
import Results from "./tabs/results";
import Dash from "./tabs/dash";
import Laborders from "./tables/order";
import Labresults from "./tables/results";
import Reports from "./tables/settings";
import Settings from "./tables/confs";
function Labworkflow(){
  const [active, setActive] = useState(0);
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label large"><strong>Laboratory Module</strong></div>
  <div class="right menu">
    <div class="item ui green large label">Lab Tech</div>
    <div class="item"><button className="ui basic blue button"><i class="building icon"></i>Home</button></div>
    <div class="item"><button className="ui basic blue button"><i class=""></i>IPD</button></div>
    <div class="item"><button className="ui basic blue button"><i class=""></i>OPD</button></div>
    <div class="item"><i class="sign red out icon"></i>Exit</div>
  </div>
</div>
<br></br>
<br></br>
<div className="ui top attached blue tabular menu">
  <a className={`item ${active === 0 ? "active":''}`} onClick={()=> setActive(0)}>DashBoard</a>
  <a className={`item ${active === 1 ? "active":''}`} onClick={()=> setActive(1)}>Test Orders</a>
  <a className={`item ${active === 2 ? "active":''}`} onClick={()=> setActive(2)}>Samples</a>
  <a className={`item ${active === 3 ? "active":''}`} onClick={()=> setActive(3)}>Processing</a>
<a className={`item ${active === 4 ? "active":''}`} onClick={()=> setActive(4)}>Results</a>
<a className={`item ${active === 5 ? "active":''}`} onClick={()=> setActive(5)}>Reports</a>
<a className={`item ${active === 6 ? "active":''}`} onClick={()=> setActive(6)}>Settings</a>
</div>

    {active == 0 && <Dash/>}
    {active == 1 && <Laborders/>}
    {active == 2 && <Samples/>}
    {active == 3 && <Processing/>}
    {active == 4 && <Labresults/>}
      {active == 5 && <Reports/>}
      {active == 6 && <Settings/>}

  
 
        </div>
    )
}
export default Labworkflow