import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Settings() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ana Smith', role: 'Nurse', status: 'active', password: '••••••' },
    { id: 2, name: 'John Doe', role: 'Pharmacist', status: 'active', password: '••••••' },
  ]);

  const [categories, setCategories] = useState(['Medicine', 'Supply', 'Herbal', 'Cosmetic']);
  const [taxRate, setTaxRate] = useState(5);
  const [reorderAlert, setReorderAlert] = useState(20);

  const [passwordModal, setPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentUserId] = useState(1); // assume current nurse logged in user id

  // User Management Handlers
  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  // Category Management
  const addCategory = () => {
    const cat = prompt('Enter new category:');
    if (cat) setCategories(prev => [...prev, cat]);
  };
  const removeCategory = (cat) => setCategories(prev => prev.filter(c => c !== cat));

  // Password Handler
  const savePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setUsers(prev => prev.map(u => u.id === currentUserId ? { ...u, password: '••••••' } : u));
    alert("Password updated successfully!");
    setPasswordModal(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="ui container my-4">

      {/* Password Management */}
      <div className="ui segment raised mb-4">
        <h4 className="ui red header">Password Management</h4>
        <p>Change your account password.</p>
        <button className="ui red button" onClick={() => setPasswordModal(true)}>
          <i className="lock icon"></i> Change Password
        </button>
      </div>

      {/* User Management */}
      <div className="ui segment raised mb-4">
        <h4 className="ui blue header">User Management</h4>
        <table className="ui celled table">
          <thead>
            <tr><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.role}</td>
                <td><div className={`ui ${u.status === 'active' ? 'green' : 'grey'} label`}>{u.status}</div></td>
                <td>
                  {u.role !== 'Nurse' && (
                    <button className="ui tiny blue button" onClick={() => toggleUserStatus(u.id)}>
                      <i className="toggle on icon"></i> Toggle Status
                    </button>
                  )}
                  {u.id === currentUserId && <span className="ml-1">(You)</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Management */}
      <div className="ui segment raised mb-4">
        <h4 className="ui teal header">Categories</h4>
        <button className="ui green tiny button mb-2" onClick={addCategory}><i className="add icon"></i> Add Category</button>
        <div className="ui list">
          {categories.map(cat => (
            <div key={cat} className="item">
              {cat}
              <button className="ui red tiny button ml-2" onClick={() => removeCategory(cat)}><i className="trash icon"></i></button>
            </div>
          ))}
        </div>
      </div>

      {/* Tax & Reorder Settings */}
      <div className="ui segment raised mb-4">
        <h4 className="ui orange header">Pricing & Stock Settings</h4>
        <div className="ui form">
          <div className="fields">
            <div className="field">
              <label>Tax / VAT (%)</label>
              <input type="number" value={taxRate} onInput={e => setTaxRate(parseInt(e.currentTarget.value))} />
            </div>
            <div className="field">
              <label>Reorder Alert Level</label>
              <input type="number" value={reorderAlert} onInput={e => setReorderAlert(parseInt(e.currentTarget.value))} />
            </div>
          </div>
        </div>
      </div>

      {/* System Preferences */}
      <div className="ui segment raised mb-4">
        <h4 className="ui purple header">System Preferences</h4>
        <div className="ui form">
          <div className="field">
            <label>Theme</label>
            <select className="ui dropdown">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="field">
            <label>Notifications</label>
            <select className="ui dropdown">
              <option value="all">All</option>
              <option value="stock-only">Stock Alerts Only</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {passwordModal && (
        <div className="ui dimmer modals page active" style={{display:'flex', alignItems:'center', justifyContent:'center'}} onClick={()=>setPasswordModal(false)}>
          <div className="ui modal active" style={{display:'block', width:'400px'}} onClick={e=>e.stopPropagation()}>
            <div className="header">Change Password</div>
            <div className="content">
              <div className="ui form">
                <div className="field">
                  <label>New Password</label>
                  <input type="password" value={newPassword} onInput={e=>setNewPassword(e.currentTarget.value)} />
                </div>
                <div className="field">
                  <label>Confirm Password</label>
                  <input type="password" value={confirmPassword} onInput={e=>setConfirmPassword(e.currentTarget.value)} />
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="ui green button" onClick={savePassword}>Save</button>
              <button className="ui grey button" onClick={()=>setPasswordModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}