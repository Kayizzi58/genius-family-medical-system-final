export default function Dashboard() {
  return (
    <div class="ui grid">
      <div class="four wide column">
        <div class="ui blue statistic">
          <div class="value">24</div>
          <div class="label">Appointments Today</div>
        </div>
      </div>

      <div class="four wide column">
        <div class="ui orange statistic">
          <div class="value">6</div>
          <div class="label">Waiting</div>
        </div>
      </div>

      <div class="four wide column">
        <div class="ui red statistic">
          <div class="value">$1,240</div>
          <div class="label">Pending Payments</div>
        </div>
      </div>
    </div>
  );
}