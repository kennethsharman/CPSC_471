
// Server Dashboard View

{
  loadServerDB();

  // Load Server Dashboard
  function loadServerDB() {

    $('#header-row').html(`
      <h3 class="header-title">
        <img id="header-logo" src="pics/logo1.png" alt="Company Logo"> 
        Server Dashboard
      </h3>
  
    `) // end header-row

    $('#main-bar').html(`

      <div> <!-- Open orders Section -->

      <div class="card">
        <div class="card-body">
        <h4 class="card-title order-heading">
          Open Orders for Employee ID
        </h4>

        <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h5 style="text-align:left"> Order Ord_num </h5>
          </div>
        </div><!-- top row -->
        <div class="row">
          <div class="col-8">
            <table class="table table-dark">
              <tr>
                <th class="tg-0lax">
                <p>Customer: <span>Cust_no</span></p>
                <p>Ticket Time: <span>Tkt_time</span></p>
                </th>
                <th class="tg-s268">
                  <p>Price: <span>price</span></p> 
                  <p>Total Pay: <span>TTL_pay</span></p>
                </th>
              </tr>
            </table>
          </div><!-- col L -->
          <div class="col-4">
          <a href="#" class="btn btn-primary order-btn" id='openOrder1-btn'>
            Open Order
          </a>
          </div><!-- col R -->
        </div><!-- row main -->
        <hr>
      </div><!-- container -->

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h5 style="text-align:left"> Order Ord_num </h5>
          </div>
        </div><!-- top row -->
        <div class="row">
          <div class="col-8">
            <table class="table table-dark">
              <tr>
                <th class="tg-0lax">
                <p>Customer: <span>Cust_no</span></p>
                <p>Ticket Time: <span>Tkt_time</span></p>
                </th>
                <th class="tg-s268">
                  <p>Price: <span>price</span></p> 
                  <p>Total Pay: <span>TTL_pay</span></p>
                </th>
              </tr>
            </table>
          </div><!-- col L -->
          <div class="col-4">
          <a href="#" class="btn btn-primary order-btn" id='openOrder1-btn'>
            Open Order
          </a>
          </div><!-- col R -->
        </div><!-- row main -->
        <hr>
      </div><!-- container -->

        </div><!-- card body -->
      </div><!-- card -->

    </div> <!-- Open orders Section -->
    <br>
      <div> <!-- Completed Orders Section -->

      <div class="card">
        <div class="card-body">
        <h4 class="card-title order-heading">
          Completed Orders of Employee_ID
        </h4>
        <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h5 style="text-align:left"> Order Ord_num </h5>
          </div>
        </div><!-- top row -->
        <div class="row">
          <div class="col-8">
            <table class="table table-dark">
              <tr>
                <th class="tg-0lax">
                <p>Customer: <span>Cust_no</span></p>
                <p>Ticket Time: <span>Tkt_time</span></p>
                </th>
                <th class="tg-s268">
                  <p>Price: <span>price</span></p> 
                  <p>Total Pay: <span>TTL_pay</span></p>
                </th>
              </tr>
            </table>
          </div><!-- col L -->
          <div class="col-4">
          <a href="#" class="btn btn-primary order-btn" id='openOrder1-btn'>
            Open Order
          </a>
          </div><!-- col R -->
        </div><!-- row main -->
        <hr>
      </div><!-- container -->

      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h5 style="text-align:left"> Order Ord_num </h5>
          </div>
        </div><!-- top row -->
        <div class="row">
          <div class="col-8">
            <table class="table table-dark">
              <tr>
                <th class="tg-0lax">
                <p>Customer: <span>Cust_no</span></p>
                <p>Ticket Time: <span>Tkt_time</span></p>
                </th>
                <th class="tg-s268">
                  <p>Price: <span>price</span></p> 
                  <p>Total Pay: <span>TTL_pay</span></p>
                </th>
              </tr>
            </table>
          </div><!-- col L -->
          <div class="col-4">
          <a href="#" class="btn btn-primary order-btn" id='openOrder1-btn'>
            Open Order
          </a>
          </div><!-- col R -->
        </div><!-- row main -->
        <hr>
      </div><!-- container -->

        </div><!-- card body -->
      </div><!-- card -->


      </div> <!-- end Completed Orders Section -->

    `) // end main-bar

    $('#left-bar').html(`
    <div class="card">
      <div class="card-body">
        <div class="container-fluid lighter">
        <div class="row">
            <div class="col-lg-12">
              <a href="#" class="btn btn-primary" id="switchviews-btn">
                Switch Views
              </a>
            </div><!-- col -->
          </div><!-- row 1 -->
          <br>
          <div class="row">
            <div class="col-lg-12">
              <a href="#" class="btn btn-primary" id='neworder-btn'>
                Take Order
              </a>
            </div><!-- col -->
          </div><!-- row 2 -->
        </div> <!-- container-->
      </div><!-- card body-->
    </div><!-- card -->
    `) // end left-bar

    $('#right-bar').html(`
      <div class="card">
        <div class="card-body">
        <h5 class="card-title">Cash Out</h5>
        <div class="container-fluid lighter">
          <div class="row">
              <div class="col-lg-12">
                Cash Out Value
              </div><!-- col -->
            </div><!-- row 1 -->
          </div> <!-- container-->
        </div><!-- card body-->
      </div><!-- card -->

      <br>

      <div class="card">
        <div class="card-body">
        <h5 class="card-title">Tip Out</h5>
        <div class="container-fluid lighter">
          <div class="row">
              <div class="col-lg-12">
                Tip Out Value
              </div><!-- col -->
            </div><!-- row 1 -->
          </div> <!-- container-->
        </div><!-- card body-->
      </div><!-- card -->
    `)
  } // end loadServerDB

  // Open Order button
  $(document).on('click', '#openOrder1-btn', event => {
      event.preventDefault()

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Open Order button actions

  // Open Order button
  $(document).on('click', '#openOrder2-btn', event => {
      event.preventDefault()

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Open Order button actions

  // Open Order button
  $(document).on('click', '#completedOrder1-btn', event => {
      event.preventDefault()

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Open Order button actions

  // New Order button
  $(document).on('click', '#neworder-btn', event => {
      event.preventDefault()

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end New Order button actions

} // end serverDashboard.js
