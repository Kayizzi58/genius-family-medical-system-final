import { useState } from "preact/hooks"
import Main from "./main";
import Mertanitymain from "../../componets/views/mertanity";
import Ipd from "../../componets/views/IPD/ipd";
import OPD from "../../componets/views/OPD/idex";
function Nurse(){
  const [module, setModule] = useState(0)
    return(
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Nurse || Portal</strong></div>
  <div class="right menu">
    <div class="item ui green label large">Nurse Anna</div>
    <div class="item" onClick={()=> setModule(0)}><button className="ui basic blue button"><i class="home icon"></i>Home</button></div>
    <div class="item" onClick={()=> setModule(1)}><button className="ui basic blue button"><i class="user baby icon"></i>IPD</button></div>
    <div class="item" onClick={()=> setModule(2)}><button className="ui basic blue button"><i class="user baby icon"></i>OPD</button></div>
    <div class="item" onClick={()=> setModule(3)}><button className="ui basic blue button"><i class="user baby icon"></i>Maternity</button></div>


    <div class="item"><i class="sign out red icon"></i>Exit</div>
  </div>
</div>
<br></br>
<br></br>
<hr></hr>
{module == 0 && <Main/>}
{module ==1 && <Ipd/>}
{module == 2 && <OPD/>}
{module == 3 && <Mertanitymain/>}
   
        </div>
    )
}
export default Nurse