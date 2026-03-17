import { h } from 'preact';
import { hydrate, prerender as ssr } from 'preact-iso';
import { useState } from 'preact/hooks';

import Clientlogin from './modules/client portal/account/login';
import './style.css';
import Client from './modules/client portal/portal';
import Admin from './modules/client portal/account/admin';
import Dental from './modules/dental/dental';
import Ipd from './componets/views/IPD/ipd';
import Mertanitymain from './componets/views/mertanity';
import Labworkflow from './modules/laboratory/workflow';
import Nurse from './modules/nurse';
import OPD from './componets/views/OPD/idex';
import Payroll from './componets/views/payroll';
import Priveledges from './componets/views/permissions';
import Adminlogin from './componets/forms/Admin';
import Home from './componets/forms/staff/home';
import Doctor from './modules/doctor/doctor';
import Pharmacy from './modules/pharmacy/pharmacy';
import Billing from './modules/pharmacy/billings';
import Acc from './control/routers';
import Accounts from './modules/accounting_and_billing/accounts';
import Partnerportal from './modules/partners/dispensery';
import Radiologymodule from './modules/radiology/main';

export function App() {
  const [role, setRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return h(Admin);

      case "nurse":
        return h(Nurse);

      case "dentist":
        return h(Dental);

      case "labtech":
        return h(Labworkflow);

      case "doctor":
        return h(Doctor);

      case "pharmacist":
        return h(Pharmacy);

      case "partner":
        return h(Partnerportal);

      case "client":
        return h(Client);

      case "radiologist":
        return h(Radiologymodule);

      default:
        return h(Home, {
          setRole,
          setIsAuthenticated
        });
    }
  };

  return h(
    'div',
    { class: 'p-2' },
    !isAuthenticated &&
      h(Home, { setRole, setIsAuthenticated }),
    isAuthenticated && renderDashboard()
  );
}

if (typeof window !== 'undefined') {
  hydrate(h(App), document.getElementById('app'));
}

export async function prerender(data) {
  return await ssr(h(App, data));
}
