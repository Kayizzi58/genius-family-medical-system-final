const Patdia =({back})=>{
    return (
        <div>
            <div className="modal fade show" style="display: block">
             <div className="modal-dialog modal-fullscreen" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="ui label black fluid row">
                            <h5 className="modal-title blue">PATIENT: P20261</h5>
                        <button className="ui circular red button" onClick={back}>Back</button>
                        </div>
                    </div>
                    <div className="modal-body" id="r">
                        
                        <div className="list-group card p-2">
                            <label className="ui blue label">Bio data</label>
                            <i className="list-group-item">MRN: 20261</i>
                            <i className="list-group-item">Name: Ian Walya</i>
                            <i className="list-group-item">Gender: Male</i>
                            <i className="list-group-item">Nationality: Uganda</i>
                            
                        </div>
                        <div className="list-group card p-2">
                            <label className="ui blue label">Care</label>
                            <i className="list-group-item"></i>
                            <i className="list-group-item">Vist Type: IPD</i>
                            <i className="list-group-item">Date Started: 02 08 2026</i>
                            <i className="list-group-item">Ward: WD1</i>
                            <i className="list-group-item">Attendant: NS20261</i>
                            <i className="list-group-item">Attendant Notes: <span className="ui label"><i className="file icon"></i></span></i>
                        </div>
                        <div className="list-group card p-2">
                            <label className="ui blue label">Diagnosis</label>
                            <i className="list-group-item">Name: Malaria</i>
                            <i className="list-group-item">ICD: 10</i>
                            <i className="list-group-item">Symptom: <span className="ui label"><i className="file icon"></i></span></i>
                            <i className="list-group-item">Status: Active</i>
                            <i className="list-group-item">Treatement Plan: <span className="ui label"><i className="file icon"></i></span></i>
                            <i className="list-group-item">Treatement Start: 01 04 2026</i>
                            <i className="list-group-item">Treatement End: 01 04 2026</i>
                            <i className="list-group-item">Prescriptions: <span className="ui label"><i className="file icon"></i></span></i>
                        </div>
                        <div className="list-group card p-2">
                            <label className="ui blue label">Test Results</label>
                            
                            <i className="list-group-item">Lab Results<span className="ui label"><i className="file icon"></i></span></i>
                            <i className="list-group-item">Status: Active</i>
                            <i className="list-group-item">Test Date: 01 04 2026</i>
                            <i className="list-group-item">Results: Positive</i>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
           </div>
        </div>
    )
}
export default Patdia