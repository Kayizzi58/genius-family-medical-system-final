import { h } from 'preact';
import { useState } from 'preact/hooks';
function DoctorForm() {
	const [active, setActive] = useState(true);
    return (

        <div class="card p-3 bg-light">
            <h2 class="ui dividing header label">Doctor Form</h2>
            <br></br>
            <hr></hr>
            < h3 className="ui blue label">Identification</ h3>
            <form class="ui form">
                <div class="two fields card p-3 ">
                    <div class="field">
                        <label>First Name</label>
                        <input type="text" name="firstName" placeholder="First Name"/>
                    </div>
                    <div class="field">
                        <label>Last Name</label>
                        <input type="text" name="lastName" placeholder="Last Name"/>
                    </div>
                </div>
                <div class="field card p-3">
                    <label>Gender</label>
                    <select name="gender"class="ui dropdown">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="field card p-3">
                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth"/>
                </div>
                <div class="field card p-3">
                    <label>National ID</label>
                    <input type="text" name="nationalId" placeholder="National ID"/>
                </div>
                <hr></hr>
                < h3 className="ui blue label">Professional Information</ h3>
                <div class="field card p-3">
                    <label>Speciality</label>
                    <input type="text" name="speciality" placeholder="Speciality"/>
                </div>
                <div class="field card p-3">
                    <label>Sub Speciality</label>
                    <input type="text" name="subSpeciality" placeholder="Sub Speciality"/>
                </div>
                <div class="field card p-3">
                    <label>License Number</label>
                    <input type="text" name="licenseNumber" placeholder="License Number"/>
                </div>
                <div class="field">
                    <label>License Expiry Date</label>
                    <input type="date" name="licenseExpiryDate"/>
                </div>
                <div class="field">
                    <label>Experience (Years)</label>
                    <input type="number" name="experience" placeholder="Experience"/>
                </div>
                <div class="field">
                    <label>Education Level</label>
                    <select name="educationLevel"class="ui dropdown">
                        <option value="">Select Education Level</option>
                        <option value="highschool">High School</option>
                        <option value="bachelor">Bachelor</option>
                        <option value="master">Master</option>
                        <option value="phd">PhD</option>
                    </select>
                </div>
                <div class="field">
                    <label>Medical School</label>
                    <input type="text" name="medicalSchool" placeholder="Medical School"/>
                </div>
                <div class="field">
                    <label>Registration Body</label>
                    <input type="text" name="registrationBody" placeholder="Registration Body"/>
                </div>
                <hr></hr>
                <div className="card p-3">
                    < h3 className="ui blue label">Contact Information</ h3>
                <div class="field">
                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" placeholder="Phone Number"/>
                </div>
                <div class="field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email"/>
                </div>
                <div class="field">
                    <label>Address</label>
                    <input type="text" name="address" placeholder="Address"/>
                </div>
                <div class="field">
                    <label>City</label>
                    <input type="text" name="city" placeholder="City"/>
                </div>
                <div class="field">
                    <label>Country</label>
                    <input type="text" name="country" placeholder="Country"/>
                </div>
                <hr></hr>
                
               <div className="card p-3">
                 < h3 className="ui blue label">Employment Information</ h3>
                <div class="field">
                    <label>Department</label>
                    <input type="text" name="department" placeholder="Department"/>
                </div>
                </div>
                <div class="field">
                    <label>Employment Type</label>
                    <input type="text" name="employmentType" placeholder="Employment Type"/>
                </div>
                <div class="field">
                    <label>Date Joined</label>
                    <input type="date" name="dateJoined"/>
                </div>
                <div class="field">
                    <label>Status</label>
                    <input type="text" name="status" placeholder="Status"/>
                </div>
                <div class="field">
                    <label>Consultation Fee</label>
                    <input type="number" name="consultationFee" placeholder="Consultation Fee"/>
                </div>
               </div>
               <br></br>
                <button class="ui primary button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default DoctorForm;
