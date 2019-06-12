// Employee Access Screen View

{
  loadAdmin();
  set_shift_clock();

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

        <div class="card" id="server-card">
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

        <div class="card" id="cook-card">
          <div class="card-body">
            <h5 class="card-title">Cook</h5>

            <div class="container-fluid lighter">
              <div class="row">
                <div class="col-md-6">
                  <div class="dropdown">
                    <a class="btn dropbtn btn-primary ">
                      Station
                      <i class="fas fa-sort-down"></i>
                    </a>
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
        <div class="card" id="manager-card">
          <div class="card-body">
            <h5 class="card-title">Manager</h5>

            <div class="container-fluid lighter">
              <div class="row">
                <div class="col-md-12">
                  <a href="#" id='m-dash-btn' class="btn btn-primary">Dashboard</a>
                </div><!-- col -->
              </div><!-- row -->
            </div> <!-- container-->
          </div><!-- card body -->
        </div><!-- card -->
    `)

    const user = state('user')

    if(!user.server_flag) $('#server-card').hide()
    if(!user.manager_flag) $('#manager-card').hide()
    if(!user.cook_flag) $('#cook-card').hide()

    $('#left-bar').html(`

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Logged in as</h5>
        <p class="card-text">${user.f_name}</p>
        <a href="#" id='self' class="btn btn-primary edit-emp">My Account</a>
      </div>
    </div>

    <br>

    <div id="shift-clock" class="card">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p id="clock-in-time" class="time-color" style="font-size:25px;"></p>
        <button href="#" id='shift-btn' class="btn btn-primary"></button>
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


  click('#neworder-btn', () => view("./js/customer.js"))

  function set_shift_clock() {
    const user = state('user')

    requestService(`/shift/${user.employee_id}/current`, "GET", null, res_success => {
      // The employee has no current shift and thus is not clocked in
      console.log(res_success)
      console.log("BLAH")
      if ($.isEmptyObject(res_success)) {
        $('#shift-clock .card-title').html("Not Clocked In")
        $('#clock-in-time').html("")
        $('#shift-btn').html("Clock In")
        $('#shift-btn').unbind("click")
        $('#shift-btn').click(clock_in)
        $("#shift-btn").attr("disabled", false)
      } else {
        $('#shift-clock .card-title').html("Clocked In")
        $('#clock-in-time').html(new Date().toLocaleString())
        $('#shift-btn').html("Clock Out")
        $('#shift-btn').unbind("click")
        $('#shift-btn').click(clock_out)
        $("#shift-btn").attr("disabled", false)
      }
    }, res_error => {
        console.log(res_error)
        $("#shift-btn").attr("disabled", false)
    })
  }

  function clock_in() {
    const user = state('user')
    $("#shift-btn").attr("disabled", true)
    requestService(`/shift`, "POST", user, res_success => {
      set_shift_clock()
    }, res_error => {
      console.log(res_error)
    })
  }

  function clock_out() {
    const user = state('user')
    // Prevent users from spamming clock in / clock out to generate many shifts
    $("#shift-btn").attr("disabled", true)
    requestService(`/shift/end`, "POST", user, res_success => {
      set_shift_clock()
    }, res_error => {
      console.log(res_error)
      $("#shift-btn").attr("disabled", false)
    })
  }
} // end adminView.js
