import { h } from 'preact';
import { useState } from 'preact/hooks';

import Dashboard from './tabs/Dashboard';
import PatientRegistration from './tabs/PatientRegistration';
import Appointments from './tabs/Appointments';
import CheckInQueue from './tabs/CheckInQueue';
import Billing from './tabs/Billing';
import Insurance from './tabs/Insurance';
import Documents from './tabs/Documents';
import Communication from './tabs/Communication';
import Reports from './tabs/Reports';

export default function ReceptionistLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'patients': return <PatientRegistration />;
      case 'appointments': return <Appointments />;
      case 'queue': return <CheckInQueue />;
      case 'billing': return <Billing />;
      case 'insurance': return <Insurance />;
      case 'documents': return <Documents />;
      case 'communication': return <Communication />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  return (
    <div class="ui container" style="margin-top:20px;">
      <h2 class="ui dividing header">
        <i class="hospital icon"></i>
        <div class="content">Receptionist Panel</div>
      </h2>

      <div class="ui top attached tabular menu">
        <a class={`item ${activeTab==='dashboard'?'active':''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</a>
        <a class={`item ${activeTab==='patients'?'active':''}`} onClick={() => setActiveTab('patients')}>Patients</a>
        <a class={`item ${activeTab==='appointments'?'active':''}`} onClick={() => setActiveTab('appointments')}>Appointments</a>
        <a class={`item ${activeTab==='queue'?'active':''}`} onClick={() => setActiveTab('queue')}>Check-In</a>
        <a class={`item ${activeTab==='billing'?'active':''}`} onClick={() => setActiveTab('billing')}>Billing</a>
        <a class={`item ${activeTab==='insurance'?'active':''}`} onClick={() => setActiveTab('insurance')}>Insurance</a>
        <a class={`item ${activeTab==='documents'?'active':''}`} onClick={() => setActiveTab('documents')}>Documents</a>
        <a class={`item ${activeTab==='communication'?'active':''}`} onClick={() => setActiveTab('communication')}>Communication</a>
        <a class={`item ${activeTab==='reports'?'active':''}`} onClick={() => setActiveTab('reports')}>Reports</a>
      </div>

      <div class="ui bottom attached segment">
        {renderTab()}
      </div>
    </div>
  );
}