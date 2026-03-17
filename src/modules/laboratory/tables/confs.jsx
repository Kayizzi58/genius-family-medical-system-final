
import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Settings() {
  const [settings, setSettings] = useState({
    workingHours: '08:00 AM - 05:00 PM',
    appointmentDuration: 30,
    notifications: { email: true, sms: false },
    labWorkflow: { autoVerify: false, allowRevert: true },
    maxAppointmentsPerDay: 20,
    enablePatientPortal: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const keys = name.split('.');
      if (keys.length === 2) {
        setSettings(prev => ({ 
          ...prev, 
          [keys[0]]: { ...prev[keys[0]], [keys[1]]: checked } 
        }));
      } else {
        setSettings(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings Saved:', settings);
    alert('Settings have been updated!');
    // Send settings to backend if required
  };

  return (
    <div className="ui container my-4">
      <div className="card p-3 shadow-sm">
        <h3 className="ui header teal"><i className="cogs icon"></i> Enterprise Settings</h3>

        <form className="ui form" onSubmit={handleSubmit}>
          {/* Clinic Operations */}
          <h4 className="ui dividing header">Clinic Operations</h4>
          <div className="field">
            <label className="ui label"><i className="clock icon"></i> Working Hours</label>
            <input type="text" name="workingHours" value={settings.workingHours} onInput={handleChange}/>
          </div>
          <div className="field">
            <label className="ui label"><i className="calendar icon"></i> Appointment Duration (mins)</label>
            <input type="number" name="appointmentDuration" value={settings.appointmentDuration} onInput={handleChange}/>
          </div>
          <div className="field">
            <label className="ui label"><i className="calendar check icon"></i> Max Appointments per Day</label>
            <input type="number" name="maxAppointmentsPerDay" value={settings.maxAppointmentsPerDay} onInput={handleChange}/>
          </div>

          {/* Notifications */}
          <h4 className="ui dividing header">Notifications</h4>
          <div className="field">
            <div className="ui toggle checkbox">
              <input type="checkbox" name="notifications.email" checked={settings.notifications.email} onChange={handleChange}/>
              <label>Email Notifications</label>
            </div>
          </div>
          <div className="field">
            <div className="ui toggle checkbox">
              <input type="checkbox" name="notifications.sms" checked={settings.notifications.sms} onChange={handleChange}/>
              <label>SMS Notifications</label>
            </div>
          </div>

          {/* Lab Workflow */}
          <h4 className="ui dividing header">Lab Workflow</h4>
          <div className="field">
            <div className="ui toggle checkbox">
              <input type="checkbox" name="labWorkflow.autoVerify" checked={settings.labWorkflow.autoVerify} onChange={handleChange}/>
              <label>Auto-Verify Lab Results</label>
            </div>
          </div>
          <div className="field">
            <div className="ui toggle checkbox">
              <input type="checkbox" name="labWorkflow.allowRevert" checked={settings.labWorkflow.allowRevert} onChange={handleChange}/>
              <label>Allow Revert Verified Results</label>
            </div>
          </div>

          {/* Patient Portal */}
          <h4 className="ui dividing header">Patient Portal</h4>
          <div className="field">
            <div className="ui toggle checkbox">
              <input type="checkbox" name="enablePatientPortal" checked={settings.enablePatientPortal} onChange={handleChange}/>
              <label>Enable Patient Portal Access</label>
            </div>
          </div>

          <button className="ui teal button"><i className="save icon"></i> Save Settings</button>
        </form>
      </div>
    </div>
  );
}