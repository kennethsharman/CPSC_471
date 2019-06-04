
// Manager Dashboard View

{
  loadManagerDB();

  // Load Manager Dashboard
  function loadManagerDB() {

    $('#header-row').html(`
    <h3 class="header-title">
      <img id="header-logo" src="pics/logo1.png" alt="Company Logo"> 
      Manager Dashboard
    </h3>

    `) // end header-row

    $('#main-bar').html(`
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Inventory</h4>
          <div class="container-fluid lighter">
            <div class="row">
              <div class="col-md-6">
                <a href="#" id='manage-btn' class="btn btn-primary">New Inventory</a>
              </div><!-- L col -->
              <div class="col-md-6">
                <a href="#" id='m-dash-btn' class="btn btn-primary">History</a>
              </div><!-- R col -->
            </div><!-- row -->
          </div> <!-- container-->
        </div><!-- body -->
      </div><!-- card -->

      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Employees</h4>
          <div class="container-fluid lighter">
            <div class="row">
              <div class="col-md-6">
                <a href="#" id='manage-btn' class="btn btn-primary">New Employee</a>
              </div><!-- L col -->
              <div class="col-md-6">
                <a href="#" id='m-dash-btn' class="btn btn-primary">Edit Existing</a>
              </div><!-- R col -->
            </div><!-- row -->
          </div> <!-- container-->
        </div><!-- body -->
      </div><!-- card -->

      <div> <!-- Inventory Section -->


        <button style="width: 150px" type="btn btn-primary" id='inventory-btn'>
            New Inventory
        </button>

        <div class="dropdown">
          <button class="dropbtn">Supplier</button>
            <div class="dropdown-content">
              <a href="#">GFS</a>
              <a href="#">Sysco</a>
            </div>
        </div>

      </div> <!-- end Inventory Section -->

      <br>

      <div> <!-- Inventory History Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>INVENTORY HISTORY</u>
        </h4>

        <form action="/action_page.php">
          <input type="date" name="bday">
          <input type="submit">
        </form>
        <br>
        <div class="dropdown">
          <button class="dropbtn">Supplier</button>
            <div class="dropdown-content">
              <a href="#">GFS</a>
              <a href="#">Sysco</a>
            </div>
        </div>

        <button style="width: 150px" type="btn btn-primary" id='pullReport-btn'>
            Pull Report
        </button>

      </div> <!-- end Inventory History Section -->

      <br>

      <div> <!-- Edit Employee Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>EDIT EMPLOYEE</u>
        </h4>

        <div class="dropdown">
          <button class="dropbtn">Select Employee</button>
            <div class="dropdown-content">
              <a href="#">Elvin Limpin</a>
              <a href="#">Peter Schulze</a>
              <a href="#">Ken Sharman</a>
            </div>
        </div>

        <button style="width: 150px" type="btn btn-primary" id='editEmp-btn'>
            Edit Employee
        </button>

        <br><br>

        <button style="width: 150px" type="btn btn-primary" id='newEmp-btn'>
            New Employee
        </button>

      </div> <!-- end Inventory Section -->

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
  } // end loadManagerDB

  // Edit Employee Button
  $(document).on('click', '#editEmp-btn', event => {
      event.preventDefault()
      $('#editEmp').modal();
  }) // end add/edit employee button actions

  // Add/Edit Employee Button
  $(document).on('click', '#newEmp-btn', event => {
      event.preventDefault()
      $('#editEmp').modal();
  }) // end add/edit employee button actions

} // end managerDashboard.js
