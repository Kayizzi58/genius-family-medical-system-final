function Reports(){
    return (
        <div>
            
            <div className="card p-2 bg-light">
                
     <h3 class="ui header blue">Reports <span className="ui label">33</span></h3>
     <div className="card p-2">
        <label className="ui red label">
            Filter By Role<select>
                <option>Newest</option>
                <option>Doctor</option>
                <option>Nurse</option>
                <option>Dentist</option>
                <option>Lab Technician</option>
                <option>Pharmacist</option>
                <option>Receptionist</option>
            </select>
        </label>
     <table className="ui celed table">
        <thead><tr><th>By</th><th>Role</th><th>Date</th><th>File</th></tr></thead>
        <tbody>
            <tr>
                <td>Ian Walya</td>
                <td>Doctor</td>
                <td>02 Jan 2026</td>
                <td><button className="ui blue button"><i className="download icon"></i>Download</button></td>
            </tr>
            <tr>
                <td>Ana ana</td>
                <td>Nurse</td>
                <td>02 Jan 2026</td>
                <td><button className="ui blue button"><i className="download icon"></i>Download</button></td>
            </tr>
            <tr>
                <td>Ian Walya</td>
                <td>Dentist</td>
                <td>02 Jan 2026</td>
                <td><button className="ui blue button"><i className="download icon"></i>Download</button></td>
            </tr>
            <tr>
                <td>Ian Walya</td>
                <td>Lab Technician</td>
                <td>02 Jan 2026</td>
                <td><button className="ui blue button"><i className="download icon"></i>Download</button></td>
            </tr>
            <tr>
                <td>Ian Walya</td>
                <td>Pharmacist</td>
                <td>02 Jan 2026</td>
                <td><button className="ui blue button"><i className="download icon"></i>Download</button></td>
            </tr>
            <tr>
                <td>Ian Walya</td>
                <td>Receptionist</td>
                <td>02 Jan 2026</td>
                <td><button className="ui blue button"><i className="download icon"></i>Download</button></td>
            </tr>
        </tbody>
     </table>
     </div>

  </div>
        </div>
    )
}
export default Reports