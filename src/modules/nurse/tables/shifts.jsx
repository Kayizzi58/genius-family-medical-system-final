import { h } from 'preact';
import { useState } from 'preact/hooks';

// Sample nurse directory for suggestions
const nurseDirectory = [
  "Alice Johnson",
  "Bob Smith",
  "Carol Lee",
  "David Brown",
  "Emily Davis",
  "Frank Miller",
  "Grace Wilson",
];

const departmentOptions = ["IPD", "Maternity", "OPD", "Dental", "Emergency"];

const initialShifts = [
  {
    id: "SH-001",
    nurseName: "Alice Johnson",
    department: "IPD",
    role: "RN",
    shiftType: "Day",
    start: "2026-02-25 07:00",
    end: "2026-02-25 15:00",
    status: "Assigned",
  },
];

export default function Shifts() {
  const [shifts, setShifts] = useState(initialShifts);
  const [showDialog, setShowDialog] = useState(false);
  const [newShift, setNewShift] = useState({
    nurseNames: [], // batch
    department: "",
    role: "RN",
    shiftType: "",
    start: "",
    end: "",
    status: "Assigned",
  });
  const [nurseInput, setNurseInput] = useState(""); // temporary input for suggestions

  // Handle suggestion input
  const handleNurseInput = (e) => setNurseInput(e.currentTarget.value);

  const addNurse = (name) => {
    if (!newShift.nurseNames.includes(name)) {
      setNewShift({ ...newShift, nurseNames: [...newShift.nurseNames, name] });
    }
    setNurseInput("");
  };

  const removeNurse = (name) => {
    setNewShift({ ...newShift, nurseNames: newShift.nurseNames.filter(n => n !== name) });
  };

  const handleShiftInput = (e) => {
    const { name, value } = e.currentTarget;
    setNewShift({ ...newShift, [name]: value });
  };

  const handleAddShift = (e) => {
    e.preventDefault();
    if (newShift.nurseNames.length === 0 || !newShift.department || !newShift.start || !newShift.end) {
      alert("Please fill all mandatory fields.");
      return;
    }

    const newShifts = newShift.nurseNames.map((n, idx) => ({
      id: `SH-${shifts.length + idx + 1}`.padStart(6, "0"),
      nurseName: n,
      department: newShift.department,
      role: newShift.role,
      shiftType: newShift.shiftType,
      start: newShift.start,
      end: newShift.end,
      status: "Assigned",
    }));

    setShifts([...newShifts, ...shifts]);
    setShowDialog(false);
    setNewShift({
      nurseNames: [],
      department: "",
      role: "RN",
      shiftType: "",
      start: "",
      end: "",
      status: "Assigned",
    });
    setNurseInput("");
  };

  const toggleStatus = (id) => {
    setShifts(shifts.map(s => s.id === id ? { ...s, status: s.status === "Assigned" ? "Completed" : "Assigned" } : s));
  };

  // Filter suggestions based on input
  const filteredSuggestions = nurseDirectory.filter(n => n.toLowerCase().includes(nurseInput.toLowerCase()) && !newShift.nurseNames.includes(n));

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Nurse Shift Management - Batch Assignment</h3>

      <button className="ui primary button" onClick={() => setShowDialog(true)}>+ Add Shift</button>

      {showDialog && (
        <div className="ui dimmer modals visible active">
          <div className="ui standard modal visible active">
            <i className="close icon" onClick={() => setShowDialog(false)}></i>
            <div className="header">Assign New Shift (Batch)</div>
            <div className="content">
              <form className="ui form" onSubmit={handleAddShift}>
                {/* 🔹 Nurse Names Batch Input */}
                <div className="field">
                  <label>Nurse Names</label>
                  <input 
                    type="text"
                    placeholder="Type nurse name and press enter"
                    value={nurseInput}
                    onInput={handleNurseInput}
                    onKeyDown={(e) => e.key === "Enter" && (addNurse(nurseInput), e.preventDefault())}
                  />
                  <div className="ui labels">
                    {newShift.nurseNames.map(n => (
                      <div className="ui label" key={n}>
                        {n} <i className="delete icon" onClick={() => removeNurse(n)}></i>
                      </div>
                    ))}
                  </div>
                  {filteredSuggestions.length > 0 && (
                    <div className="ui list" style={{ maxHeight: "100px", overflowY: "auto" }}>
                      {filteredSuggestions.map(s => (
                        <div className="item" key={s} onClick={() => addNurse(s)} style={{ cursor: "pointer" }}>
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 🔹 Department, Role, Shift Type, Start/End */}
                <div className="three fields">
                  <div className="field">
                    <label>Department</label>
                    <select name="department" value={newShift.department} onChange={handleShiftInput}>
                      <option value="">Select Department</option>
                      {departmentOptions.map(d => <option value={d} key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Role</label>
                    <select name="role" value={newShift.role} onChange={handleShiftInput}>
                      <option value="RN">RN</option>
                      <option value="LPN">LPN</option>
                      <option value="Nurse Assistant">Nurse Assistant</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Shift Type</label>
                    <select name="shiftType" value={newShift.shiftType} onChange={handleShiftInput}>
                      <option value="">Select Shift</option>
                      <option value="Day">Day</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>
                </div>

                <div className="two fields">
                  <div className="field">
                    <label>Start Time</label>
                    <input type="datetime-local" name="start" value={newShift.start} onInput={handleShiftInput} />
                  </div>
                  <div className="field">
                    <label>End Time</label>
                    <input type="datetime-local" name="end" value={newShift.end} onInput={handleShiftInput} />
                  </div>
                </div>

                <button className="ui green button" type="submit">Assign Shift</button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="ui divider"></div>

      {/* 🔹 Shifts Table */}
      <table className="ui celled striped selectable table">
        <thead>
          <tr>
            <th>Nurse Name</th>
            <th>Department</th>
            <th>Role</th>
            <th>Shift Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.length > 0 ? shifts.map(s => (
            <tr key={s.id}>
              <td>{s.nurseName}</td>
              <td>{s.department}</td>
              <td>{s.role}</td>
              <td>{s.shiftType}</td>
              <td>{s.start}</td>
              <td>{s.end}</td>
              <td>{s.status}</td>
              <td>
                <div className="ui buttons">
                  <button className="ui mini green button" onClick={() => toggleStatus(s.id)}>
                    {s.status === "Assigned" ? "Mark Completed" : "Reassign"}
                  </button>
                  <button className="ui mini orange button">Swap</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td className="center aligned" colSpan="8">No shifts assigned</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}