function Inventory(){
    return (
     <div className="card p-2">
        <br></br>
        <div>
        <div className="ui header blue">Stock Levels</div>
    <table className="ui celed table">
        
        <tbody>
            <tr><td><div className="ui labeled input">
                <label className="ui label">Low Stock Threshold</label>
                <input type="number" placeholder="0"/>
                </div></td>
                <td><div className="ui labeled input">
                <label className="ui label">Re-Order Level</label>
                <input type="number" placeholder="0"/>
                </div></td>
                <td><div className="ui labeled input">
                <label className="ui label">Stock Levels Frequecy</label>
                <input type="number" placeholder="0"/>
                </div></td>
                <td><div className="ui toggle checkbox">
                    <input type="checkbox" checked placeholder="0"/>
                <label className="ui label">Allow Negative Stock</label>
                
                </div></td>
                </tr>
        </tbody>
    </table>
    
    </div>
    <hr></hr>
    <div className="card p-2">
        <div className="ui header blue">Low Stock Alerts</div>
        <table className="ui celed table">
            <tbody>
                <tr>
                    <td><div className="ui toggle checkbox">
                    <input type="checkbox" checked placeholder="0"/>
                <label className="ui label">Enable Alerts</label>
                
                </div></td>
               <td> <div className="ui labeled input">
                <label className="ui label">Threshold Level</label>
                <input type="number" placeholder="0"/>
                </div></td>
                <td>
                
                <label className="ui label">Alert Type</label>
                <div className="ui toggle checkbox">
                    <input type="checkbox" checked placeholder="0"/>
                <label className="ui label">In-App</label>
                </div>
                <div className="ui toggle checkbox">
                    <input type="checkbox" checked placeholder="0"/>
                <label className="ui label">Email</label>
                </div>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className="card p-2">
        <div className="ui header blue">
            Date Settings
        </div>
        <table className="ui celed table">
            <tbody>
                <tr><td>
                <label className="ui red label">Date Format</label>
                <br></br><br></br>
                    <div className="ui slider red checkbox"><input type="checkbox" name=""/><label>YYY/MMM/DDD</label></div><br></br><br></br>
                    <div className="ui slider checkbox"><input type="checkbox" name=""/><label>MMM/YYY/DDD</label></div><br></br><br></br>
                    <div className="ui slider checkbox"><input type="checkbox" name=""/><label>DDD/MMM/YYY</label></div><br></br><br></br>
                    
                
                </td></tr>
            </tbody>
        </table>
    </div>
    </div>
    )
}
export default Inventory