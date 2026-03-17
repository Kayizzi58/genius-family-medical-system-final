import Meds from "./biilling/medicine";
import Supplies from "./biilling/supplies";
import Bills from "./biilling/bills";
import Sales from "./biilling/sales";
import { useState } from "preact/hooks";
const tabs = ["Medicine","Supplies","Billing","Sales","report"];

function Billing(){
  const [activeTab, setActiveTab] =useState(0);
  const tabHandler = (index)=>{
    setActiveTab(index);
  }
  const [active, setActive] = useState("Medicine")
    return (
        <div>
            <div class="">

  <h2 class="ui orange header">
    <i class="pills icon"></i>
    Pharmacy Billing & Sales
  </h2>

    
  <div className="ui top attached blue pointing tabular menu">
    <a className={`item ${activeTab === 0 ? "active" : ''}`} onClick={()=> setActiveTab(0)}>Medicine</a>
    <a className={`item ${activeTab === 1 ? "active" : ''}`} onClick={()=> setActiveTab(1)}>Supplies</a>
    <a className={`item ${activeTab === 2 ? "active" : ''}`} onClick={()=> setActiveTab(2)}>Billing</a>
    <a className={`item ${activeTab === 3 ? "active" : ''}`} onClick={()=> setActiveTab(3)}>Sales</a>
  </div>

<br></br>
{activeTab === 0 && <Meds/>}
{activeTab === 1 && <Supplies/>}
{activeTab === 2 && <Bills/>}
{activeTab === 3 && <Sales/>}
  
<br></br>
<hr></hr>
 
  </div>
  <br></br>
  <hr></hr>
  
        </div>
    )
}
export default Billing