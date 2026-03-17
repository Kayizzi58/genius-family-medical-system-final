import { useState } from "preact/hooks"
import Billing from "./billings"
import Dispense from "./dispensery/dispense"
import Home from "../../componets/forms/staff/home"
import Hometab from "./main/tabs/homeTab"
import Report from "./report"
import Settings from "./settings"
import { LocationProvider, Route, Router, useLocation } from "preact-iso"
import Stock from "./stock"

function Pharmacy(){
  const {url} = useLocation()
  const [active ,setActive] = useState("Home")
    return (
        <div>
            
           <div className="ui top fixed menu shadow-sm" style={{ padding: '0.5rem 1rem', backgroundColor: '#f9f9f9', zIndex: 1000 }}>
  {/* Brand */}
  <div className="item">
    <div className="ui yellow label" style={{ fontSize: '1.1rem', padding: '0.5rem 0.8rem' }}>
      💊 <strong>Pharmacy</strong>
    </div>
  </div>

  {/* Right Menu */}
  <div className="right menu">
    {/* User Info */}
    <div className="item">
      <div className="ui red label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
        <i className="bi bi-person"></i> Ana ANA
      </div>
    </div>

    {/* Navigation Items */}
    {[
      { key: 'Home', icon: 'building', label: 'Home' },
      { key: 'Billing', icon: 'credit card', label: 'Billing & Sales' },
      { key: 'Dispense', icon: 'user patient', label: 'Dispensery' },
      { key: 'stock', icon: 'box', label: 'Stock' },
      { key: 'setting', icon: 'setting', label: 'Settings' },
      { key: 'report', icon: 'file', label: 'Report' },
    ].map(item => (
      <div
        key={item.key}
        className={`item ${active === item.key ? 'active' : ''}`}
        onClick={() => setActive(item.key)}
        style={{ cursor: 'pointer', fontWeight: active === item.key ? '600' : '400' }}
      >
        <i className={`${item.icon} icon blue`}></i> {item.label}
      </div>
    ))}

    {/* Logout */}
    <a href="/" style={{ textDecoration: 'none' }}>
      <div className={`item ${url === '/' ? 'active' : ''}`} style={{ color: 'red', fontWeight: '500', cursor: 'pointer' }}>
        <i className="sign out icon"></i> Log Out
      </div>
    </a>
  </div>
</div>


            <br></br>
            <br></br>
            <hr></hr>
    {active == "Home" && <Hometab/>}
    {active == "Billing" && <Billing/>}
    {active == "Dispense" && <Dispense/>}
    {active == "stock" && <Stock/>}
    {active == "report" && <Report/>}
    {active == "setting" && <Settings/>}
    
        </div>
    )
}
export default Pharmacy