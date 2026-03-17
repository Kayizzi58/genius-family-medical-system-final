import { useState } from "preact/hooks";
import Inventory from "./settingsTabs/invetory";
import Billing from "./settingsTabs/billing";

function Settings(){
    const [active, setActive] = useState(0);
    const handleItem = (index1) =>{
        setActive(index1);
    }
    return (
        <div>
            <h2 class="ui header green"><i class="cogs icon"></i> Pharmacy Settings</h2>

  <div class="ui top green attached tabular menu">
    <a class={`item ${active === 0 ? 'active' : ''}`} onClick={()=> handleItem(0)} data-tab="inventory"><i class="boxes icon"></i> Inventory</a>
    <a class={`item ${active === 1 ? "active" : ''}`} onClick={()=> handleItem(1)} data-tab="billing"><i class="file invoice dollar icon"></i> Billing</a>
    <a class={`item ${active === 2 ? 'active' : ''}`} data-tab="alerts" onClick={()=> handleItem(2)}><i class="bell icon" ></i> Alerts</a>
    <a class={`item ${active === 3 ? 'active' : ''}`} data-tab="user" onClick={()=> handleItem(3)}><i class="user icon" ></i> User Access</a>
    <a class={`item ${active === 4 ? 'active' : ''}`} data-tab="reports" onClick={()=> handleItem(4)}><i class="chart bar icon" ></i> Reports</a>
  </div>
  {0 == active && <Inventory/>}
  {1 == active && <Billing/>}
        </div>
    )
}
export default Settings