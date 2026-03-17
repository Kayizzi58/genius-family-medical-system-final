import Inventory from "../../settingsTabs/invetory"
import Dashboard from "./dash2"
import Pharmacyinventory from "./inventory"

function Hometab(){
    return (
        <div>
            <div class="twelve wide column">

    
    </div>
    <div className="divider"></div>
     <div class="ui segment bg-light">
<Dashboard/>
      <Pharmacyinventory/>
    </div>
    
        </div>
    )
}
export default Hometab