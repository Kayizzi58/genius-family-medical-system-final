import Docform from "../../../../componets/dialogs/doctor/dia"
import DoctorForm from "../../../../componets/dialogs/docs"
import Docsmain from "./docs3"
import { useState } from "preact/hooks"
function Docs(){
    const [tab, setTab] = useState(0)   
    return (
        <div>
            <div className="ui tarbula menu pointed blue">
                <a className={`item ${tab === 0 ? "active" : ''}`} onClick={()=> setTab(0)}><i className="list icon"></i>Doctors</a>
                <a className={`item ${tab === 1 ? "active" : ''}`} onClick={()=> setTab(1)}><i className="add icon"></i>Add Doctor</a>
            </div>
            <hr></hr>
  {tab === 1 && <DoctorForm/>}

            {tab === 0 && <Docsmain/>}
        </div>
    )
}
export default Docs