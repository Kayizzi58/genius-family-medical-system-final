import NurseRegistrationForm from "../../../../componets/dialogs/nurses"
import { useState } from "preact/hooks";
import Nursess from "./nurseReg";
function Nurses(){
    const [tab, setTab] = useState(0);
    return (
        <div>

            <div className="ui tarbula menu pointed blue">
                <a className={`item `} onClick={()=> setTab(0)}><i className="list icon"></i>Nurses</a>
                <a className={`item `} onClick={()=> setTab(1)}><i className="add icon"></i>Add Nurse</a>
            </div>
            <hr></hr>
            {tab === 1 && <NurseRegistrationForm/>}
            {tab === 0 && <Nursess/>}

        </div>
    )
}
export default Nurses