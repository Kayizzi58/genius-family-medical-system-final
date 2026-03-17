export default function Appointments() {
  return (
    <div>
      <button class="ui primary button">
        <i class="plus icon"></i>
        New Appointment
      </button>

      <table class="ui celled table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Dr. Smith</td>
            <td>10:30 AM</td>
            <td><div class="ui green label">Confirmed</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}