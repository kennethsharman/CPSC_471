
// Employee Access Screen View

{
  loadAdmin();

  // Load Admin View Page
  function loadAdmin() {

    $('#header-row').html(`
  <h3 class="header-title">
    <img id="header-logo" src="pics/logo1.png" alt="Company Logo"> 
    Staff Dashboard
  </h3>

    `) // end header-row
    $('#main-bar').html(`

        <div text-align="left">

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Server</h5>
            <div class="container-fluid lighter">
              <div class="row">
                <div class="col-md-6">
                  <a href="#" id='neworder-btn' class="btn btn-primary">Take Order</a>
                </div><!-- L col -->
                <div class="col-md-6">
                  <a href="#" id='s-dash-btn' class="btn btn-primary">Dashboard</a>
                </div><!-- R col -->
              </div><!-- row -->
            </div> <!-- container-->
          </div><!-- card body -->
        </div><!-- card -->

        <br>

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Cook</h5>

            <div class="container-fluid lighter">
              <div class="row">
                <div class="col-md-6">
                  <div class="dropdown">
                    <a class="btn dropbtn btn-primary ">Station</a>
                    <div class="dropdown-content">
                      <a href="#">Build</a>
                      <a href="#">Fry</a>
                      <a href="#">Pasta</a>
                      <a href="#">Cut</a>
                    </div><!-- content -->
                  </div><!-- dropdown -->
                </div><!-- L col -->
                <div class="col-md-6">
                  <a href="#" id='c-dash-btn' class="btn btn-primary">Dashboard</a>
                </div><!-- R col -->
              </div><!-- row -->
            </div> <!-- container-->
          </div><!-- card body -->
        </div><!-- card -->
        <br>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Manager</h5>

            <div class="container-fluid lighter">
              <div class="row">
                <div class="col-md-6">

                  <a href="#" id='manage-btn' class="btn btn-primary">Manage Employees</a>
                </div><!-- L col -->
                <div class="col-md-6">
                  <a href="#" id='m-dash-btn' class="btn btn-primary">Dashboard</a>
                </div><!-- R col -->
              </div><!-- row -->
            </div> <!-- container-->
          </div><!-- card body -->
        </div><!-- card -->
    `)

    const username = "KEN SHARMAN"
    const clocktime = "08:34"

    $('#left-bar').html(`

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Logged in as</h5>
        <p class="card-text">${username}</p>
        <a href="#" id='myaccount-btn' class="btn btn-primary">My Account</a>
      </div>
    </div>
    
    <br>
    
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Clocked in at</h5>
        <p class="time-color" style="font-size:25px;">${clocktime}</p>
        <a href="#" id='clockout-btn' class="btn btn-primary">Clock Out</a>
      </div>
    </div>

    `) // end left-bar

    $('#right-bar').html(`
    
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">86ed ITEMS</h5>
        <div class="card-text">

          <div class="card subcard">
            <div class="card-body">
              <h5 class="card-title subcard-t">Ingredient</h5>
              <p class="card-text subcard-t">Food</p>
              <p class="card-text subcard-t">Food</p>
            </div>
          </div>

          <div class="card subcard">
            <div class="card-body">
              <h5 class="card-title subcard-t">Ingredient</h5>
              <p class="card-text subcard-t">Food</p>
              <p class="card-text subcard-t">Food</p>
            </div>
          </div>

        </div><!--card text -->
      </div><!-- card body -->
    </div><!-- card -->
    `)
  } // end loadAdmin

  // MyAccount button
  $(document).on('click', '#myaccount-btn', event => {
      event.preventDefault()

      $('.modal-header').html(`
      <h4 class="modal-title" style="text-align: center" color="black">
        FName LName
      </h4>`)

      $('.modal-body').html(`

        <h6>Contact Number </h6>
        <p>
            <span> 555-555-5555</span>
            <a class="glyph" href="#" id="contact-edit"><i class="fas fa-pencil-alt"></i></a>
        </p>
        <h6>Address </h6>
        <p>
            <span> 134 45th St SW</span>
            <a class="glyph" href="#" id="address-edit"><i class="fas fa-pencil-alt"></i></a>
        </p>

        <h6>Shift Log</h6>
        <div class="table-div">
          <table class="table table-dark">
            <thead>
              <tr>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>May 20, 2019</td>
                <td>8:30</td>
                <td>16:22</td>
              </tr>
              <tr>
                <td>July 17, 2077</td>
                <td>9:00</td>
                <td>15:01</td>
              </tr>
              <tr>
                <td>July 17, 2077</td>
                <td>9:00</td>
                <td>15:01</td>
              </tr>
              <tr>
                <td>July 17, 2077</td>
                <td>9:00</td>
                <td>15:01</td>
              </tr>
              <tr>
                <td>July 17, 2077</td>
                <td>9:00</td>
                <td>15:01</td>
              </tr>
            </tbody>
          </table>
      </div>
      `)
      $('.modal-footer').html(`
      <button type="button" class="btn btn-warning mr-auto logout" style="color: white" data-dismiss="modal">
        <i class="fas fa-sign-out-alt"></i>Logout
      </button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
      `)
      $('#modal-container').modal();
  }) // end button action

  // Server Dashboard button
  $(document).on('click', '#s-dash-btn', event => {
      event.preventDefault

      $.getScript("./js/serverDashboard.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Server Dashboard button actions

  // Cook Dashboard button
  $(document).on('click', '#c-dash-btn', event => {
      event.preventDefault

      $.getScript("./js/cookDashboard.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Cook Dashboard button actions

  // Manager Dashboard button
  $(document).on('click', '#m-dash-btn', event => {
      event.preventDefault

      $.getScript("./js/managerDashboard.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Manager Dashboard button actions

  // New Order button
  $(document).on('click', '#neworder-btn', event => {
    event.preventDefault()

    $.getScript("./js/customer.js").then(function () {
    }, function(err){
      alert('ERROR:' + JSON.stringify(err));
    })
  }) // end New Order button actions

} // end adminView.js
