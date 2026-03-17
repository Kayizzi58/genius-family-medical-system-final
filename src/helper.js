import roles from "./componets/views/permissions/roles";
export function getModules(roleCode) {
  const role = roles.roles.find(r => r.code === roleCode);
  return role ? role.modules : [];
}

export function canAccess(roleCode, module) {
  const modules = getModules(roleCode);
  return modules.includes(module);
}