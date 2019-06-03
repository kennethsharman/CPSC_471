
// Manager Dashboard View

{
  loadManagerDB();

  // Load Manager Dashboard
  function loadManagerDB() {

    $('#header-row').html(`

      <h1 >Manager Dashboard</h1>
      <pre>
        <img id="headerlogo" src="/pics/logo1.png" alt="Company Logo" height="75">
      </pre>

    `) // end header-row

    $('#main-bar').html(`

      <div> <!-- Inventory Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>INVENTORY</u>
        </h4>

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

    `) // end left-bar

    $('#right-bar').html(`

      <button style="width: 150px" type="btn btn-primary" id='switchviews-btn'>
          Switch Views
      </button>

    `)
  } // end loadManagerDB

  // Switch Views button
  $(document).on('click', '#switchviews-btn', event => {
      event.preventDefault

      $.getScript("./js/adminView.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end switch views button actions

  // Edit Employee Button
  $(document).on('click', '#editEmp-btn', event => {
      event.preventDefault
      $('#editEmp').modal();
  }) // end add/edit employee button actions

  // Add/Edit Employee Button
  $(document).on('click', '#newEmp-btn', event => {
      event.preventDefault
      $('#editEmp').modal();
  }) // end add/edit employee button actions

} // end managerDashboard.js
