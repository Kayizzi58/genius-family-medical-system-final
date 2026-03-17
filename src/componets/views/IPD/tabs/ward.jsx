function Ward(){
    return (
        <div>
            <div className="card p-2 bg-light">
  <h3 class="ui header blue">Ward Management</h3>
  <table class="ui celled table">
    <thead><tr><th>Ward</th><th>Capacity</th><th>Occupied</th><th>Status</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td>Ward A</td><td>30</td><td>28</td><td>Almost Full</td><td><button class="ui tiny button">Manage</button></td></tr>
    </tbody>
  </table>
</div>
        </div>
    )
}
export default Ward