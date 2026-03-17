import { h } from "preact";
import { useState } from "preact/hooks";

const allModules = ["OPD", "IPD", "Lab", "Pharmacy", "Billing", "Inventory"];
const allPermissions = ["View", "Create", "Edit", "Delete", "Approve"];

const dummyUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Anna Smith" },
  { id: 3, name: "Mike Brown" },
  { id: 4, name: "Sarah Lee" }
];

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    modules: ["OPD", "IPD", "Lab"],
    permissions: ["View", "Create", "Edit"],
    users: 2,
    status: "Active"
  },
  {
    id: 2,
    name: "Doctor",
    modules: ["OPD"],
    permissions: ["View"],
    users: 4,
    status: "Active"
  }
];

const statusColor = {
  Active: "green",
  Disabled: "red"
};

export default function Rolespermissions() {
  const [roles, setRoles] = useState(initialRoles);
  const [search, setSearch] = useState("");

  const [editRole, setEditRole] = useState(null);
  const [assignRole, setAssignRole] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id) => {
    setRoles(prev =>
      prev.map(role =>
        role.id === id
          ? { ...role, status: role.status === "Active" ? "Disabled" : "Active" }
          : role
      )
    );
  };

  const handleModuleToggle = (module) => {
    setEditRole(prev => ({
      ...prev,
      modules: prev.modules.includes(module)
        ? prev.modules.filter(m => m !== module)
        : [...prev.modules, module]
    }));
  };

  const handlePermissionToggle = (permission) => {
    setEditRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const saveRoleChanges = () => {
    setRoles(prev =>
      prev.map(r => (r.id === editRole.id ? editRole : r))
    );
    setEditRole(null);
  };

  const saveAssignedUsers = () => {
    setRoles(prev =>
      prev.map(r =>
        r.id === assignRole.id ? { ...r, users: selectedUsers.length } : r
      )
    );
    setAssignRole(null);
    setSelectedUsers([]);
  };

  return (
    <div className="ui container my-4">
      <div className="card p-4 shadow-sm">
        <h3 className="ui header teal">
          <i className="shield alternate icon"></i> Roles & Permissions Management
        </h3>

        <div className="ui fluid input mb-3">
          <input
            type="text"
            placeholder="Search role..."
            value={search}
            onInput={e => setSearch(e.target.value)}
          />
        </div>

        <table className="ui celled striped table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Modules</th>
              <th>Permissions</th>
              <th>Users</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.map(role => (
              <tr key={role.id}>
                <td><strong>{role.name}</strong></td>
                <td>
                  {role.modules.map(m => (
                    <span className="ui tiny blue label mr-1">{m}</span>
                  ))}
                </td>
                <td>
                  {role.permissions.map(p => (
                    <span className="ui tiny teal label mr-1">{p}</span>
                  ))}
                </td>
                <td>{role.users}</td>
                <td>
                  <span className={`ui ${statusColor[role.status]} label`}>
                    {role.status}
                  </span>
                </td>
                <td>
                  <button
                    className="ui tiny blue button mr-1"
                    onClick={() => setEditRole({ ...role })}
                  >
                    <i className="edit icon"></i> Edit
                  </button>

                  <button
                    className="ui tiny violet button mr-1"
                    onClick={() => setAssignRole(role)}
                  >
                    <i className="users icon"></i> Assign Users
                  </button>

                  <button
                    className="ui tiny red button"
                    onClick={() => toggleStatus(role.id)}
                  >
                    {role.status === "Active" ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= EDIT MODAL ================= */}
        {editRole && (
          <div className="ui active modal">
            <div className="header">Edit Role - {editRole.name}</div>
            <div className="content">
              <div className="field">
                <label>Role Name</label>
                <input
                  className="ui input"
                  value={editRole.name}
                  onInput={e =>
                    setEditRole({ ...editRole, name: e.target.value })
                  }
                />
              </div>

              <h4>Modules</h4>
              {allModules.map(m => (
                <div className="ui checkbox mr-2">
                  <input
                    type="checkbox"
                    checked={editRole.modules.includes(m)}
                    onChange={() => handleModuleToggle(m)}
                  />
                  <label>{m}</label>
                </div>
              ))}

              <h4 className="mt-3">Permissions</h4>
              {allPermissions.map(p => (
                <div className="ui checkbox mr-2">
                  <input
                    type="checkbox"
                    checked={editRole.permissions.includes(p)}
                    onChange={() => handlePermissionToggle(p)}
                  />
                  <label>{p}</label>
                </div>
              ))}
            </div>
            <div className="actions">
              <button className="ui button" onClick={() => setEditRole(null)}>
                Cancel
              </button>
              <button className="ui primary button" onClick={saveRoleChanges}>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* ================= ASSIGN USERS MODAL ================= */}
        {assignRole && (
          <div className="ui active modal">
            <div className="header">Assign Users - {assignRole.name}</div>
            <div className="content">
              {dummyUsers.map(user => (
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() =>
                      setSelectedUsers(prev =>
                        prev.includes(user.id)
                          ? prev.filter(id => id !== user.id)
                          : [...prev, user.id]
                      )
                    }
                  />
                  <label>{user.name}</label>
                </div>
              ))}
            </div>
            <div className="actions">
              <button
                className="ui button"
                onClick={() => setAssignRole(null)}
              >
                Cancel
              </button>
              <button
                className="ui primary button"
                onClick={saveAssignedUsers}
              >
                Save Assignments
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}