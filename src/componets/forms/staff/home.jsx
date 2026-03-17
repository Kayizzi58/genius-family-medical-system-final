import { useLocation } from "preact-iso"
import { useState } from "preact/hooks";
const Home = ({ setRole, setIsAuthenticated }) => {
  const [localRole, setLocalRole] = useState("");
  const [localPwd, setLocalPwd] = useState("");

  const handleSubmit = (e) => {
    

    // Simple demo credentials
    const users = {
      admin: "root",
      nurse: "root",
      dentist: "root",
      labtech: "root",
      doctor: "root",
      accountant: "root",
      pharmacist: "root",
      receptionist: "root",
      partner: "root",
      client: "root",
      radiologist: "root"
    };

    if (users[localRole] && users[localRole] === localPwd) {
      setRole(localRole);
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

    var {url} = useLocation();
    return (
        <div id="bg">
        <div className="container p-2 bg-light" id="bordered">
            <div>
                <h1 className="header ui blue larger">Genius Family Medical Services</h1>
            
            <p className="ui label large">"Your Health, Our Priority"</p>
            <br></br>
            <br></br>
            <hr></hr>
            <h3 className="header ui blue tag label">Log into your account</h3>
            <p className="ui red label pointing below">users and passwords// development mod</p>
            <p className="ui green tag label">admin: "root",
      nurse: "root",
      dentist: "root",
      labtech: "root",
      doctor: "root",
      accountant: "root",
      pharmacist: "root",
      receptionist: "root",
      partner: "root",
      client: "root",
      radiologist: "root"</p>
            
            <div className="card p-2 bg-light ui fluid raised">
           
                <form className="ui form" onSubmit={handleSubmit}>
                    
                    <hr></hr>
                    <input type="text" placeholder="Role" value={localRole} onInput={(e) => setLocalRole(e.currentTarget.value)}/>
                    <br></br>
                    <br></br>
                    
                    <input  type="password" placeholder="Password" value={localPwd} onInput={(e) => setLocalPwd(e.currentTarget.value)}/>
                    <br></br>
                    <br></br>
                    <button type="submit" className="ui blue button">Log In</button>
                </form>
            </div>
            
            </div>
            <div id="rt" className="p-2">
                <div className="header ui label fluid large green">OUR SERVICES</div>
                <ul className="list-group card p-2">
                    {hospitalServices.map((service, index) => (
                        <li key={index} className="list-group-item">
                            {service}
                        </li>
                    ))}
                </ul>
                
            </div>
            
        </div>
        <br></br>
        <p className="ui label blue large p-3">P.O.Box 333 Kampala-Uganda, Kyambogo. || Tell: 256000000000 || genius@email.com || www.geniusmedicalcenter.com</p>
        </div>
    )
}

const hospitalServices = [
                    "General Consultation",
                    "Pediatrics",
                    "Maternity Services",
                    "Surgical Procedures",
                    "Laboratory Testing",
                    "Radiology and Imaging",
                    "Pharmacy Services",
                    "Emergency Care",
                    "Inpatient Services",
                    "Outpatient Services"
                ];

export default Home