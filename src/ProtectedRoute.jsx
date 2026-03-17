import { canAccess } from "./auth";

export default function Protectedroute({ roleCode, module, Component }) {

  if (!canAccess(roleCode, module)) {
    if (typeof window !== "undefined") {
      window.location.href = "/unauthorized";
    }
    return null;
  }

  return <Component />;
}