function Billing(){
    return (
        <div>
            <br></br>
            <div className="card p-2">
                <div className="ui header blue">
                    Invoices
                </div>
                <label className="ui red large label">Company Iformation</label>
                <table className="ui celed table">
                    
                    <thead>
                        <tr><th>Company Name</th><th>Adress</th><th>City</th><th>Telephone</th></tr>
                    </thead>
                    <tbody>
                        <tr><div className="ui labled input"><label className="ui label">Name</label><input type="text" placeholder="Genius Medical Services"/> </div></tr></tbody>
                </table>
            </div>
        </div>
    )
}
export default Billing