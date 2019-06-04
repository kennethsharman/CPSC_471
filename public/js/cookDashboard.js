
// Cook Dashboard View

{
  loadCookDB();

  // Load Cook Dashboard
  function loadCookDB() {

    $('#header-row').html(`
    <h3 class="header-title">
      <img id="header-logo" src="pics/logo1.png" alt="Company Logo"> 
      Cook Dashboard
    </h3>

    `) // end header-row

    $('#main-bar').html(`

    <div> <!-- Open Orders Section -->

    <div class="card">
      <div class="card-body">
      <h4 class="card-title order-heading">
        FRY Station
      </h4>


    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h5 style="text-align:left"> Food Food name </h5>
        </div>
      </div><!-- top row -->
      <div class="row">
        <div class="col-8">
          <table class="table table-dark">
            <tr>
              <th class="tg-0lax">
                <p>Item Number: <span>Item no</span></p>
              </th>
              <th class="tg-s268">
                <p>Ticket time: <span>tkt_time</span></p>
              </th>
            </tr>
            <tr>
              <p style="font-weight: bold!important">NOTE: <span>Hey guys, if you have a veggie toppings available it would be great. Otherwise, chicken is okay. Also I'm allergic to shellfish. Have a nice day!</span></p> 
            </tr>
          </table>
        </div><!-- col L -->
        <div class="col-4">
        <a href="#" class="btn btn-primary order-btn" id='openOrder1-btn'>
          BUMP
        </a>
        </div><!-- col R -->
      </div><!-- row main -->
      <hr>
    </div><!-- container -->

    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h5 style="text-align:left"> Food Food name </h5>
        </div>
      </div><!-- top row -->
      <div class="row">
        <div class="col-8">
          <table class="table table-dark">
            <tr>
              <th class="tg-0lax">
                <p>Item Number: <span>Item no</span></p>
              </th>
              <th class="tg-s268">
                <p>Ticket time: <span>tkt_time</span></p>
              </th>
            </tr>
            <tr>
            <!-- no note left -->
            </tr>
          </table>
        </div><!-- col L -->
        <div class="col-4">
        <a href="#" class="btn btn-primary order-btn" id='openOrder1-btn'>
          BUMP
        </a>
        </div><!-- col R -->
      </div><!-- row main -->
      <hr>
    </div><!-- container -->

      </div><!-- card body -->
    </div><!-- card -->

  </div> <!-- end Fry Section -->
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
          </div> <!-- container-->
      </div><!-- card body-->
    </div><!-- card -->
    `) // end left-bar

    $('#right-bar').html(``)
  } // end loadCookDB

} // end serverDashboard.js
