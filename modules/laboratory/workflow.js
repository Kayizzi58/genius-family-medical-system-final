import { useState } from "preact/hooks"
import Tests from "./tabs/orders";
import Samples from "./tabs/samples";
import Process from "./tabs/processing";
import Results from "./tabs/results";
import Dash from "./tabs/dash";
function Labworkflow(){
  const [active, setActive] = useState(0);
    return (
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label large"><strong>Laboratory Module</strong></div>
  <div class="right menu">
    <div class="item ui green large label">Lab Tech</div>
    <div class="item"><i class="home blue icon"></i></div>
    <div class="item"><i class="bell blue icon"></i></div>
    <div class="item"><i class="sign red out icon"></i></div>
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
</div>

    {active == 0 && <Dash/>}
    {active == 1 && <Tests/>}
    {active == 2 && <Samples/>}
    {active == 3 && <Process/>}
    {active == 4 && <Results/>}

  
 
        </div>
    )
}
export default Labworkflow