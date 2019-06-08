
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
        <div class="card">
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

    const username = "KEN SHARMAN"
    const clocktime = "08:34"

    $('#left-bar').html(`

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Logged in as</h5>
        <p class="card-text">${username}</p>
        <a href="#" id='self' class="btn btn-primary edit-emp">My Account</a>
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


  $(document).on('click', '#neworder-btn', event => {
    event.preventDefault()

    $.getScript("./js/customer.js").then(function () {
    }, function(err){
      alert('ERROR:' + JSON.stringify(err));
    });

});
} // end adminView.js
