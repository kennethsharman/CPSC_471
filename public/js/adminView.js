
// Employee Access Screen View

{
  loadAdmin();

  // Load Admin View Page
  function loadAdmin() {

    $('#header-row').html(`

      <h1 >Employee Access Screen</h1>
      <pre>
        <img id="headerlogo" src="/pics/logo1.png" alt="Company Logo" height="75">
      </pre>

    `) // end header-row

    $('#main-bar').html(`

        <div align="left"> <!-- main-bar content -->

          <div> <!-- Server Options -->
            <h2 style="display: inline-block; text-align: left; width: 100%">
              <u>Server</u>
            </h2>
            <button style="width: 150px" type="btn btn-primary" id='neworder-btn'>
                New Order
            </button>
            <button style="width: 150px" type="btn btn-primary" id='svrdsbrd-btn'>
                Server Dashboard
            </button>
          </div> <!-- end Server Options -->
          <br>
          <div> <!-- Cook Options -->
            <h2 style="display: inline-block; text-align: left; width: 100%">
              <u>Cook</u>
            </h2>
            <div class="dropdown">
              <button class="dropbtn">Station</button>
                <div class="dropdown-content">
                  <a href="#">Build</a>
                  <a href="#">Fry</a>
                  <a href="#">Pasta</a>
                  <a href="#">Cut</a>
                </div>
              </div>
              <button style="width: 150px" type="btn btn-primary" id='ckdshrd-btn'>
                  Cook Dashboard
              </button>
          </div> <!-- end Cook Options -->
          <br>
          <div> <!-- Manager Options -->
            <h2 style="display: inline-block; text-align: left; width: 100%">
              <u>Manager</u>
            </h2>
            <button style="width: 200px" type="btn btn-primary" id='mgrdshrd-btn'>
                Manager Dashboard
            </button>
          </div> <!-- end Manager Options -->

        </div> <!-- end main-bar content -->

    `) // end main-bar

    $('#left-bar').html(`

      <div>
        <h5 style="display: inline-block; text-align: left; width: 100%">
          Logged in as</h5>
        <p>Ken Sharman</p>
      </div>
      <br>

      <button style="width: 150px" type="btn btn-primary" id='myaccount-btn'>
          My Account
      </button>
      <br><br><br>

      <div>
        <h5 style="display: inline-block; text-align: left; width: 100%">
        Clocked In at</h5>
        <p style="color:#800000; font-size:25px;">8:34</p>
      </div>

      <button style="width: 150px" type="btn btn-primary" id='clockout-btn'>
          Clockout
      </button>
      <br><br><br>

    `) // end left-bar

    $('#right-bar').html(`

      <h4>86ed ITEMS</h4>

      <div>
        <div>
          <h5 style="display: inline-block; text-align: left; width: 100%">
            Ingredient</h5>
          <p>Food<br>Food</p>
        <div>
      </div>

      <div>
        <div>
          <h5 style="display: inline-block; text-align: left; width: 100%">
            Ingredient</h5>
          <p>Food<br>Food</p>
        <div>
      </div>

    `) // end right-bar

  } // end loadAdmin

  // MyAccount button
  $(document).on('click', '#myaccount-btn', event => {
      event.preventDefault
      $('#myAccount').modal();
  }) // end myaccount button actions

  // Server Dashboard button
  $(document).on('click', '#svrdsbrd-btn', event => {
      event.preventDefault

      $.getScript("./js/serverDashboard.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Server Dashboard button actions

  // Cook Dashboard button
  $(document).on('click', '#ckdshrd-btn', event => {
      event.preventDefault

      $.getScript("./js/cookDashboard.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Cook Dashboard button actions

  // Manager Dashboard button
  $(document).on('click', '#mgrdshrd-btn', event => {
      event.preventDefault

      $.getScript("./js/managerDashboard.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Manager Dashboard button actions

  // New Order button
  $(document).on('click', '#neworder-btn', event => {
      event.preventDefault

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end New Order button actions

} // end adminView.js
