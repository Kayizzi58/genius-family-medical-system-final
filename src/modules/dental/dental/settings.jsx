
import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function DentistSettings() {
  const [account, setAccount] = useState({
    fullName: 'Dr. John Smith',
    email: 'john.smith@clinic.com',
    phone: '+1234567890',
    workingHours: '08:00 AM - 05:00 PM',
    appointmentDuration: 30,
    maxPatientsPerDay: 20,
    notifications: { email: true, sms: false, labUpdates: true },
    billingPreferences: { defaultInsurance: 'ABC Health', autoInvoice: true },
    labIntegration: { autoUpload: true, defaultLab: 'CityLab' },
    security: { twoFA: false, currentPassword: '', newPassword: '', confirmPassword: '' },
    theme: { darkMode: false, compactUI: false },
  });

  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    if (dataset.group) {
      setAccount({
        ...account,
        [dataset.group]: { ...account[dataset.group], [name]: type === 'checkbox' ? checked : value },
      });
    } else {
      setAccount({ ...account, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation for passwords
    if (account.security.newPassword && account.security.newPassword !== account.security.confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }
    alert('Settings saved successfully!');
    console.log('Saved Settings:', account);
  };

  return (
    <div className="ui container my-4">
      <div className="card p-4 shadow-sm">
        <h2 className="ui header teal"><i className="settings icon"></i> Dentist Account Settings</h2>
        <form className="ui form" onSubmit={handleSubmit}>

          {/* Account Details */}
          <h4 className="ui dividing header">Account Details</h4>
          <div className="fields">
            <div className="eight wide field">
              <label>Full Name</label>
              <input type="text" name="fullName" value={account.fullName} onInput={handleChange} required />
            </div>
            <div className="four wide field">
              <label>Email</label>
              <input type="email" name="email" value={account.email} onInput={handleChange} required />
            </div>
            <div className="four wide field">
              <label>Phone</label>
              <input type="tel" name="phone" value={account.phone} onInput={handleChange} />
            </div>
          </div>

          {/* Clinic Settings */}
          <h4 className="ui dividing header">Clinic Settings</h4>
          <div className="fields">
            <div className="eight wide field">
              <label><i className="clock blue icon"></i> Working Hours</label>
              <input type="text" name="workingHours" value={account.workingHours} onInput={handleChange} />
            </div>
            <div className="four wide field">
              <label>Appointment Duration (mins)</label>
              <input type="number" name="appointmentDuration" value={account.appointmentDuration} onInput={handleChange} min="5" />
            </div>
            <div className="four wide field">
              <label>Max Patients/Day</label>
              <input type="number" name="maxPatientsPerDay" value={account.maxPatientsPerDay} onInput={handleChange} min="1" />
            </div>
          </div>

          {/* Notifications */}
          <h4 className="ui dividing header">Notifications</h4>
          <div className="inline fields">
            <div className="field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="email" checked={account.notifications.email} data-group="notifications" onChange={handleChange} />
                <label>Email Notifications</label>
              </div>
            </div>
            <div className="field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="sms" checked={account.notifications.sms} data-group="notifications" onChange={handleChange} />
                <label>SMS Notifications</label>
              </div>
            </div>
            <div className="field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="labUpdates" checked={account.notifications.labUpdates} data-group="notifications" onChange={handleChange} />
                <label>Lab Updates</label>
              </div>
            </div>
          </div>

          {/* Billing & Insurance */}
          <h4 className="ui dividing header">Billing & Insurance</h4>
          <div className="fields">
            <div className="eight wide field">
              <label>Default Insurance</label>
              <input type="text" name="defaultInsurance" value={account.billingPreferences.defaultInsurance} data-group="billingPreferences" onInput={handleChange} />
            </div>
            <div className="eight wide field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="autoInvoice" checked={account.billingPreferences.autoInvoice} data-group="billingPreferences" onChange={handleChange} />
                <label>Auto-Generate Invoices</label>
              </div>
            </div>
          </div>

          {/* Lab Integration */}
          <h4 className="ui dividing header">Lab Integration</h4>
          <div className="fields">
            <div className="eight wide field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="autoUpload" checked={account.labIntegration.autoUpload} data-group="labIntegration" onChange={handleChange} />
                <label>Auto-Upload Lab Results</label>
              </div>
            </div>
            <div className="eight wide field">
              <label>Default Lab</label>
              <input type="text" name="defaultLab" value={account.labIntegration.defaultLab} data-group="labIntegration" onInput={handleChange} />
            </div>
          </div>

          {/* Security */}
          <h4 className="ui dividing header">Security & Access</h4>
          <div className="fields">
            <div className="eight wide field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="twoFA" checked={account.security.twoFA} data-group="security" onChange={handleChange} />
                <label>Enable Two-Factor Authentication</label>
              </div>
            </div>
            <div className="four wide field">
              <label>New Password</label>
              <input type="password" name="newPassword" value={account.security.newPassword} data-group="security" onInput={handleChange} />
            </div>
            <div className="four wide field">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={account.security.confirmPassword} data-group="security" onInput={handleChange} />
            </div>
          </div>

          {/* Theme & Display */}
          <h4 className="ui dividing header">Theme & Display</h4>
          <div className="inline fields">
            <div className="field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="darkMode" checked={account.theme.darkMode} data-group="theme" onChange={handleChange} />
                <label>Dark Mode</label>
              </div>
            </div>
            <div className="field">
              <div className="ui toggle checkbox">
                <input type="checkbox" name="compactUI" checked={account.theme.compactUI} data-group="theme" onChange={handleChange} />
                <label>Compact UI</label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button type="submit" className="ui blue button mt-3">
            <i className="save icon"></i> Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}