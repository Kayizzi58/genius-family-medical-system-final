import { useState } from "preact/hooks";

export default function Sets({ doctorName, email }) {
  const [accountInfo, setAccountInfo] = useState({
    name: doctorName || "",
    email: email || "",
    phone: "",
    department: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    appointmentReminders: true,
  });

  // Handle account info input
  const handleAccountChange = (e) => {
    const { name, value } = e.currentTarget;
    setAccountInfo({ ...accountInfo, [name]: value });
  };

  // Handle password input
  const handlePasswordChange = (e) => {
    const { name, value } = e.currentTarget;
    setPasswords({ ...passwords, [name]: value });
  };

  // Handle notifications toggle
  const handleNotificationChange = (e) => {
    const { name, checked } = e.currentTarget;
    setNotifications({ ...notifications, [name]: checked });
  };

  // Save account info
  const handleSaveAccount = (e) => {
    e.preventDefault();
    alert("Account info updated successfully!");
  };

  // Update password
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="ui segment">
      <h3 className="ui blue header">Settings</h3>

      {/* 🔹 Account Information */}
      <div className="ui segment">
        <h4 className="ui dividing header">Account Information</h4>
        <form className="ui form" onSubmit={handleSaveAccount}>
          <div className="three fields">
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={accountInfo.name}
                onInput={handleAccountChange}
                placeholder="Full Name"
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={accountInfo.email}
                onInput={handleAccountChange}
                placeholder="Email"
              />
            </div>

            <div className="field">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={accountInfo.phone}
                onInput={handleAccountChange}
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="field">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={accountInfo.department}
              onInput={handleAccountChange}
              placeholder="Department"
            />
          </div>

          <button type="submit" className="ui blue button">
            Save Changes
          </button>
        </form>
      </div>

      {/* 🔹 Password Management */}
      <div className="ui segment">
        <h4 className="ui dividing header">Change Password</h4>
        <form className="ui form" onSubmit={handleUpdatePassword}>
          <div className="three fields">
            <div className="field">
              <label>Current Password</label>
              <input
                type="password"
                name="current"
                value={passwords.current}
                onInput={handlePasswordChange}
                placeholder="Current Password"
              />
            </div>
            <div className="field">
              <label>New Password</label>
              <input
                type="password"
                name="new"
                value={passwords.new}
                onInput={handlePasswordChange}
                placeholder="New Password"
              />
            </div>
            <div className="field">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onInput={handlePasswordChange}
                placeholder="Confirm New Password"
              />
            </div>
          </div>

          <button type="submit" className="ui red button">
            Update Password
          </button>
        </form>
      </div>

      {/* 🔹 Notifications Preferences */}
      <div className="ui segment">
        <h4 className="ui dividing header">Notifications</h4>
        <div className="ui form">
          <div className="field">
            <div className="ui toggle checkbox">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={notifications.emailAlerts}
                onChange={handleNotificationChange}
              />
              <label>Email Alerts</label>
            </div>
          </div>

          <div className="field">
            <div className="ui toggle checkbox">
              <input
                type="checkbox"
                name="smsAlerts"
                checked={notifications.smsAlerts}
                onChange={handleNotificationChange}
              />
              <label>SMS Alerts</label>
            </div>
          </div>

          <div className="field">
            <div className="ui toggle checkbox">
              <input
                type="checkbox"
                name="appointmentReminders"
                checked={notifications.appointmentReminders}
                onChange={handleNotificationChange}
              />
              <label>Appointment Reminders</label>
            </div>
          </div>

          <button
            type="button"
            className="ui teal button"
            onClick={() => alert("Notification preferences saved!")}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}