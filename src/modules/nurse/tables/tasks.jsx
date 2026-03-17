import { h } from 'preact';
import { useState } from 'preact/hooks';

// Sample Data
const initialTasks = [
  { id: 1, type: 'Vitals', patient: 'John Doe', MRN: 'MRN-001', room: '101', description: 'Check BP, HR, Temp', completed: false },
  { id: 2, type: 'Medication', patient: 'Mary Smith', MRN: 'MRN-002', room: '102', description: 'Administer Paracetamol 500mg', completed: false },
  { id: 3, type: 'Lab', patient: 'Jane Doe', MRN: 'MRN-003', room: '103', description: 'Collect blood sample', completed: false },
];

const initialPatients = [
  { id: 'PT-001', name: 'John Doe', MRN: 'MRN-001', room: '101', condition: 'Stable', alerts: '' },
  { id: 'PT-002', name: 'Mary Smith', MRN: 'MRN-002', room: '102', condition: 'Under observation', alerts: 'Allergy: Penicillin' },
  { id: 'PT-003', name: 'Jane Doe', MRN: 'MRN-003', room: '103', condition: 'Critical', alerts: '' },
];

export default function Nursedashboard({ nurseName }) {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState(initialTasks);
  const [patients, setPatients] = useState(initialPatients);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [newTask, setNewTask] = useState({ type: '', patient: '', MRN: '', room: '', description: '' });

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // Open modal
  const openModal = (data) => { setModalData(data); setShowModal(true); };
  const closeModal = () => { setModalData(null); setShowModal(false); };

  // Add new task
  const addTask = () => {
    if (!newTask.type || !newTask.patient || !newTask.MRN) {
      alert('Please fill task type, patient, and MRN');
      return;
    }
    setTasks([{ ...newTask, id: tasks.length + 1, completed: false }, ...tasks]);
    setNewTask({ type: '', patient: '', MRN: '', room: '', description: '' });
  };

  return (
    <div className="ui fluid container">
      <h3 className="ui blue header">Nurse Dashboard - {nurseName}</h3>
      <div className="ui top attached green menu">
        {['tasks','patients','medications','vitals','notes','schedule'].map(tab => (
          <div
            key={tab}
            className={`item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </div>

      {/* -------------------- TASKS TAB -------------------- */}
      {activeTab === 'tasks' && (
        <div className="ui bottom attached tab segment active">
          <h3 className="ui dividing header">Today's Tasks</h3>

          {/* Add New Task */}
          <div className="ui form">
            <div className="four fields">
              <div className="field"><input placeholder="Task Type" name="type" value={newTask.type} onInput={(e)=>setNewTask({...newTask,type:e.currentTarget.value})} /></div>
              <div className="field"><input placeholder="Patient" name="patient" value={newTask.patient} onInput={(e)=>setNewTask({...newTask,patient:e.currentTarget.value})} /></div>
              <div className="field"><input placeholder="MRN" name="MRN" value={newTask.MRN} onInput={(e)=>setNewTask({...newTask,MRN:e.currentTarget.value})} /></div>
              <div className="field"><input placeholder="Room" name="room" value={newTask.room} onInput={(e)=>setNewTask({...newTask,room:e.currentTarget.value})} /></div>
            </div>
            <div className="field">
              <textarea placeholder="Description" name="description" value={newTask.description} onInput={(e)=>setNewTask({...newTask,description:e.currentTarget.value})}></textarea>
            </div>
            <button className="ui primary button" type="button" onClick={addTask}>+ Add Task</button>
          </div>

          {/* Task List */}
          <div className="ui relaxed divided list" style={{ marginTop:'20px' }}>
            {tasks.map(task => (
              <div key={task.id} className={`item ${task.completed ? 'completed' : ''}`}>
                <div className="content">
                  <div className="header">{task.type}: {task.patient} (Room {task.room})</div>
                  <div className="description">{task.description}</div>
                </div>
                <div className="right floated content">
                  <button className={`ui ${task.completed?'grey':'green'} button`} onClick={()=>toggleComplete(task.id)}>
                    {task.completed?'Undo':'Complete'}
                  </button>
                  <button className="ui blue button" style={{marginLeft:'5px'}} onClick={()=>openModal(task)}>View/Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------- PATIENTS TAB -------------------- */}
      {activeTab === 'patients' && (
        <div className="ui bottom attached tab segment active">
          <h3 className="ui dividing header">Patients Overview</h3>
          <table className="ui celled striped table">
            <thead>
              <tr><th>MRN</th><th>Name</th><th>Room</th><th>Condition</th><th>Alerts</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}>
                  <td>{p.MRN}</td>
                  <td>{p.name}</td>
                  <td>{p.room}</td>
                  <td>{p.condition}</td>
                  <td>{p.alerts}</td>
                  <td>
                    <button className="ui blue mini button" onClick={()=>openModal(p)}>View / Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* -------------------- MEDICATIONS TAB -------------------- */}
      {activeTab === 'medications' && (
        <div className="ui bottom attached tab segment active">
          <h3 className="ui dividing header">Medication Administration</h3>
          <p>Integrate medication table here (Administer, Update status)</p>
        </div>
      )}

      {/* -------------------- VITALS TAB -------------------- */}
      {activeTab === 'vitals' && (
        <div className="ui bottom attached tab segment active">
          <h3 className="ui dividing header">Vitals Monitoring</h3>
          <p>Integrate vitals table here (Add / Update / Highlight abnormal)</p>
        </div>
      )}

      {/* -------------------- NOTES TAB -------------------- */}
      {activeTab === 'notes' && (
        <div className="ui bottom attached tab segment active">
          <h3 className="ui dividing header">Patient Notes</h3>
          <div className="ui form">
            <div className="field">
              <textarea placeholder="Enter observation..." style={{minHeight:'120px'}}></textarea>
            </div>
            <button className="ui primary button">Save Note</button>
          </div>
        </div>
      )}

      {/* -------------------- SCHEDULE TAB -------------------- */}
      {activeTab === 'schedule' && (
        <div className="ui bottom attached tab segment active">
          <h3 className="ui dividing header">Today's Schedule</h3>
          <p>No scheduled events.</p>
        </div>
      )}

      {/* -------------------- FULLSCREEN MODAL -------------------- */}
      {showModal && (
        <div className="ui dimmer modals visible active" onClick={closeModal}>
          <div className="ui fullscreen modal visible active" onClick={e=>e.stopPropagation()}>
            <div className="header">{modalData.patient || modalData.type}</div>
            <div className="content">
              {Object.keys(modalData).map(key => (
                <p key={key}><strong>{key}:</strong> {modalData[key]}</p>
              ))}
              <div className="ui form">
                <label>Edit Description</label>
                <textarea
                  value={modalData.description || ''}
                  onInput={(e)=>setModalData({...modalData, description:e.currentTarget.value})}
                />
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={()=>{
                // Update tasks if editing a task
                if(modalData.id && modalData.type) {
                  setTasks(tasks.map(t => t.id===modalData.id?modalData:t));
                }
                // Could also update patients here
                closeModal();
              }}>Save</button>
              <button className="ui red button" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}