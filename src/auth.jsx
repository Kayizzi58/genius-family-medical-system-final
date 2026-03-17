import roles from "./componets/views/permissions/roles";

export function canAccess(roleCode, module) {
  const role = roles.roles.find(r => r.code === roleCode);
  return role ? role.modules.includes(module) : false;
}