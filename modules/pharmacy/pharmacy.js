import { useState } from "preact/hooks"
import Billing from "./billings"
import Dispense from "./dispensery/dispense"
import Home from "../../componets/forms/staff/home"
import Hometab from "./main/tabs/homeTab"
import Report from "./report"
import Settings from "./settings"
import { LocationProvider, Route, Router, useLocation } from "preact-iso"

function Pharmacy(){
  const {url} = useLocation()
  const [active ,setActive] = useState("Home")
    return (
        <div>
            
            <div class="ui top fixed menu">
  <div class="item ui yellow label"><strong>💊 Pharmacy</strong></div>
  <div class="right menu">
    <div class="item ui red label"><i className="bi bi-person"></i>Ana ANA</div>
    <div class="item" onClick={()=> setActive("Home")} key="Home"><i class="building icon blue"></i>Home</div>
    <div class="item" onClick={()=>setActive("Billing")} key="Billing"><i class="credit card icon blue"></i>Billing & Sales</div>
    <div class="item" onClick={()=>setActive("Dispense")} key="Dispense"><i class="user patient icon blue"></i>Dispensery</div>
    <div class="item" onClick={()=>setActive("stock")} key="stock"><i class="box icon blue"></i>Stock</div>
    <div class="item" onClick={()=>setActive("setting")} key="setting"><i class="setting icon blue"></i>Settings</div>
    <div class="item" onClick={()=>setActive("report")} key="report"><i class="file icon blue"></i>Report</div>
    <a href="/" className={url == '/' && 'active'} style="text-decoration: none;"><div class="item"><i class="sign out icon red"></i>LogOut</div></a>
  </div>
</div>


            <br></br>
            <br></br>
            <hr></hr>
    {active == "Home" && <Hometab/>}
    {active == "Billing" && <Billing/>}
    {active == "Dispense" && <Dispense/>}
    {active == "report" && <Report/>}
    {active == "setting" && <Settings/>}
    
        </div>
    )
}
export default Pharmacy