import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export default function Partnerportal() {
  const [activeTab, setActiveTab] = useState('verify');
  const [prescriptionCode, setPrescriptionCode] = useState('');
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dispenseItems, setDispenseItems] = useState({});
  const [message, setMessage] = useState('');

  // =========================
  // Fetch Prescription
  // =========================
  const verifyPrescription = async () => {
    if (!prescriptionCode) return;

    setLoading(true);
    setMessage('');
    setPrescription(null);

    try {
      const res = await fetch(`/api/pharmacy/verify/${prescriptionCode}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setPrescription(data);
    } catch (err) {
      setMessage(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Mark Dispensed
  // =========================
  const markDispensed = async () => {
    try {
      const res = await fetch(`/api/pharmacy/dispense/${prescription.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: dispenseItems })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage('Successfully marked as dispensed');
      setPrescription(null);
      setPrescriptionCode('');
    } catch (err) {
      setMessage(err.message || 'Dispense failed');
    }
  };

  return (
    <div class="ui container" style="margin-top:30px; max-width:1100px;">
      <h2 class="ui dividing header">
        <i class="medkit icon"></i>
        <div class="content">
          Partner Pharmacy Portal
          <div class="sub header">
            Secure Prescription Verification & Dispensing
          </div>
        </div>
      </h2>

      {/* Navigation */}
      <div class="ui top attached tabular menu">
        <a class={`item ${activeTab==='verify'?'active':''}`}
           onClick={() => setActiveTab('verify')}>
          Verify Prescription
        </a>

        <a class={`item ${activeTab==='history'?'active':''}`}
           onClick={() => setActiveTab('history')}>
          Dispense History
        </a>

        <a class={`item ${activeTab==='profile'?'active':''}`}
           onClick={() => setActiveTab('profile')}>
          Pharmacy Profile
        </a>
      </div>

      <div class="ui bottom attached segment">

        {/* ================= VERIFY TAB ================= */}
        {activeTab === 'verify' && (
          <div>

            <div class="ui form">
              <div class="field">
                <label>Prescription Code / QR</label>
                <div class="ui action input">
                  <input
                    type="text"
                    placeholder="Enter Prescription Code"
                    value={prescriptionCode}
                    onInput={e => setPrescriptionCode(e.target.value)}
                  />
                  <button
                    class={`ui primary button ${loading?'loading':''}`}
                    onClick={verifyPrescription}>
                    Verify
                  </button>
                </div>
              </div>
            </div>

            {message && (
              <div class="ui message">
                {message}
              </div>
            )}

            {prescription && (
              <div class="ui segment">

                <h4 class="ui dividing header">
                  Prescription Details
                </h4>

                <div class="ui grid">
                  <div class="eight wide column">
                    <p><strong>Prescription ID:</strong> {prescription.id}</p>
                    <p><strong>Status:</strong>
                      <span class={`ui label ${
                        prescription.status === 'ACTIVE' ? 'green' :
                        prescription.status === 'PARTIALLY_DISPENSED' ? 'orange' :
                        'grey'
                      }`}>
                        {prescription.status}
                      </span>
                    </p>
                    <p><strong>Issued:</strong> {prescription.created_at}</p>
                    <p><strong>Expires:</strong> {prescription.expires_at}</p>
                  </div>

                  <div class="eight wide column">
                    <p><strong>Patient Initials:</strong> {prescription.patient_initials}</p>
                    <p><strong>Age:</strong> {prescription.patient_age}</p>
                  </div>
                </div>

                <h5 class="ui dividing header">Medications</h5>

                <table class="ui celled table">
                  <thead>
                    <tr>
                      <th>Drug</th>
                      <th>Dosage</th>
                      <th>Prescribed Qty</th>
                      <th>Already Dispensed</th>
                      <th>Dispense Now</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescription.items.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.dosage}</td>
                        <td>{item.quantity}</td>
                        <td>{item.dispensed_quantity}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            max={item.quantity - item.dispensed_quantity}
                            onInput={e =>
                              setDispenseItems({
                                ...dispenseItems,
                                [item.id]: e.target.value
                              })
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  class="ui positive button"
                  onClick={markDispensed}>
                  Confirm Dispense
                </button>

              </div>
            )}
          </div>
        )}

        {/* ================= HISTORY TAB ================= */}
        {activeTab === 'history' && (
          <div>
            <h4 class="ui dividing header">Recent Dispensed Prescriptions</h4>

            <table class="ui celled table">
              <thead>
                <tr>
                  <th>Prescription ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Loaded from API in production */}
                <tr>
                  <td>#8721</td>
                  <td>2026-02-22</td>
                  <td><div class="ui green label">DISPENSED</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ================= PROFILE TAB ================= */}
        {activeTab === 'profile' && (
          <div class="ui form">
            <h4 class="ui dividing header">Pharmacy Information</h4>

            <div class="field">
              <label>Pharmacy Name</label>
              <input type="text" value="CityCare Pharmacy" disabled />
            </div>

            <div class="field">
              <label>License Number</label>
              <input type="text" value="LIC-447728" disabled />
            </div>

            <div class="field">
              <label>Contact Email</label>
              <input type="email" />
            </div>

            <button class="ui primary button">
              Update Contact Info
            </button>
          </div>
        )}

      </div>
    </div>
  );
}