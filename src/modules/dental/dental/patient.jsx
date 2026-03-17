
import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function Dpatient() {
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: '',
    dentalHistory: '',
    insurance: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Patient Registered:', form);
    alert('Patient registration submitted!');
  };

  return (
    <div className="container fluid my-4" style={{ maxWidth: '700px' }}>
      <h2 className="mb-4 text-center">Dental Patient Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="card fluid mb-3 p-2 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Personal Information</h5>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={form.fullName}
                onInput={handleChange}
                required
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={form.dob}
                  onInput={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onInput={handleChange}
                  required
                />
              </div>
              <div className="col">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onInput={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={form.address}
                onInput={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Medical History */}
        <div className="card mb-3 p-2 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Medical History</h5>
            <div className="mb-3">
              <label className="form-label">Medical Conditions</label>
              <textarea
                name="medicalHistory"
                className="form-control"
                value={form.medicalHistory}
                onInput={handleChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Allergies</label>
              <input
                type="text"
                name="allergies"
                className="form-control"
                value={form.allergies}
                onInput={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Current Medications</label>
              <input
                type="text"
                name="currentMedications"
                className="form-control"
                value={form.currentMedications}
                onInput={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Dental History */}
        <div className="card mb-3 p-2 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Dental History</h5>
            <div className="mb-3">
              <label className="form-label">Previous Dental Treatments / Issues</label>
              <textarea
                name="dentalHistory"
                className="form-control"
                value={form.dentalHistory}
                onInput={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Insurance */}
        <div className="card mb-3 p-2 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Insurance</h5>
            <div className="mb-3">
              <label className="form-label">Insurance Provider / Policy Number</label>
              <input
                type="text"
                name="insurance"
                className="form-control"
                value={form.insurance}
                onInput={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Consent */}
        <div className="card mb-3 p-2 shadow-sm">
          <div className="card-body">
            <div className="form-check">
              <input
                type="checkbox"
                name="consent"
                className="form-check-input"
                checked={form.consent}
                onChange={handleChange}
                required
              />
              <label className="form-check-label">
                I consent to dental treatment and record keeping
              </label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success w-100">Register Patient</button>
      </form>
    </div>
  );
}