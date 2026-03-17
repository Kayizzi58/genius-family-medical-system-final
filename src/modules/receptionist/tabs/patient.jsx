export default function PatientRegistration() {
  return (
    <form class="ui form">
      <h4 class="ui dividing header">Personal Information</h4>

      <div class="two fields">
        <div class="field">
          <label>First Name</label>
          <input type="text" placeholder="First Name" />
        </div>
        <div class="field">
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" />
        </div>
      </div>

      <div class="field">
        <label>Phone</label>
        <input type="text" placeholder="Phone Number" />
      </div>

      <div class="field">
        <label>Date of Birth</label>
        <input type="date" />
      </div>

      <h4 class="ui dividing header">Insurance</h4>

      <div class="field">
        <label>Provider</label>
        <input type="text" placeholder="Insurance Provider" />
      </div>

      <div class="field">
        <label>Policy Number</label>
        <input type="text" />
      </div>

      <button class="ui primary button">Register Patient</button>
    </form>
  );
}