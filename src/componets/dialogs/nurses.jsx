import { h } from 'preact';
import { useState } from 'preact/hooks';

const NurseRegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        dateJoined: '',
        employmentType: '',
        status: '',
        licenseNumber: '',
        licenseExpiryDate: '',
        specialisation: '',
        experience: '',
        trainingInstitution: '',
        registrationBody: '',
        shiftType: '',
        salary: '',
        supervisor: '',
        ward: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    return (
        <div className="card p-3">
            <h2 className="text-center">Nurse Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="card p-3 mb-3">
                    <h3>Biodata</h3>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" name="firstName" value={formData.firstName} onInput={handleChange} placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={formData.lastName} onInput={handleChange} placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select className="form-control" name="gender" value={formData.gender} onInput={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onInput={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onInput={handleChange} placeholder="Phone Number" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onInput={handleChange} placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <label>Date Joined</label>
                        <input type="date" className="form-control" name="dateJoined" value={formData.dateJoined} onInput={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Employment Type</label>
                        <input type="text" className="form-control" name="employmentType" value={formData.employmentType} onInput={handleChange} placeholder="Employment Type" />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <input type="text" className="form-control" name="status" value={formData.status} onInput={handleChange} placeholder="Status" />
                    </div>
                </div>

                <div className="card p-3 mb-3">
                    <h3>Nursing Details</h3>
                    <div className="form-group">
                        <label>License Number</label>
                        <input type="text" className="form-control" name="licenseNumber" value={formData.licenseNumber} onInput={handleChange} placeholder="License Number" />
                    </div>
                    <div className="form-group">
                        <label>License Expiry Date</label>
                        <input type="date" className="form-control" name="licenseExpiryDate" value={formData.licenseExpiryDate} onInput={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Specialisation</label>
                        <input type="text" className="form-control" name="specialisation" value={formData.specialisation} onInput={handleChange} placeholder="Specialisation" />
                    </div>
                    <div className="form-group">
                        <label>Experience (Years)</label>
                        <input type="number" className="form-control" name="experience" value={formData.experience} onInput={handleChange} placeholder="Experience" />
                    </div>
                    <div className="form-group">
                        <label>Training Institution</label>
                        <input type="text" className="form-control" name="trainingInstitution" value={formData.trainingInstitution} onInput={handleChange} placeholder="Training Institution" />
                    </div>
                    <div className="form-group">
                        <label>Registration Body</label>
                        <input type="text" className="form-control" name="registrationBody" value={formData.registrationBody} onInput={handleChange} placeholder="Registration Body" />
                    </div>
                </div>

                <div className="card p-3 mb-3">
                    <h3>Employment</h3>
                    <div className="form-group">
                        <label>Shift Type</label>
                        <input type="text" className="form-control" name="shiftType" value={formData.shiftType} onInput={handleChange} placeholder="Shift Type" />
                    </div>
                    <div className="form-group">
                        <label>Salary</label>
                        <input type="number" className="form-control" name="salary" value={formData.salary} onInput={handleChange} placeholder="Salary" />
                    </div>
                    <div className="form-group">
                        <label>Supervisor</label>
                        <input type="text" className="form-control" name="supervisor" value={formData.supervisor} onInput={handleChange} placeholder="Supervisor" />
                    </div>
                    <div className="form-group">
                        <label>Ward</label>
                        <input type="text" className="form-control" name="ward" value={formData.ward} onInput={handleChange} placeholder="Ward" />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default NurseRegistrationForm;