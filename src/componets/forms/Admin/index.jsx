import Admin from "../../../modules/client portal/account/admin"

function Adminlogin(){
    return (
        <div id="centered-p">
         <div className="card p-2 bg-light " style="width: 50%">
            <div className="header">
                <h2 className="ui blue ribbon label large fluid">Admin LogIn</h2>
                <p>Genius Medical Services</p>
                <hr></hr>
                <form className="ui form">
                    <input type="text" placeholder="user name"/>
                    <br></br>
                    <br></br>
                    <input type="text" placeholder="password"/>
                    <br></br>
                    <br></br>
                    <button className="ui blue button">LogIn</button>
                </form>
            </div>
         </div>
        </div>
    )
}
export default Adminlogin