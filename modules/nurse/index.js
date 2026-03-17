import { useState } from "preact/hooks"
import Main from "./main";
import Mertanitymain from "../../componets/views/mertanity";
function Nurse(){
  const [module, setModule] = useState(0)
    return(
        <div>
            <div class="ui top fixed menu">
  <div class="item ui blue label"><strong>Nurse || Portal</strong></div>
  <div class="right menu">
    <div class="item ui green label large">Nurse Anna</div>
    <div class="item" onClick={()=> setModule(0)}><i class="home icon"></i></div>
    <div class="item" onClick={()=> setModule(1)}><i class="user baby blue icon"></i>Mertanity</div>
    <div class="item"><i class="sign out icon"></i></div>
  </div>
</div>
<br></br>
<br></br>
{module == 0 && <Main/>}
{module == 1 && <Mertanitymain/>}
   
        </div>
    )
}
export default Nurse