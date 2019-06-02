
// Server Dashboard View

{
  loadServerDB();

  // Load Server Dashboard
  function loadServerDB() {

    $('#header-row').html(`

      <h1 >Server Dashboard</h1>
      <pre>
        <img id="headerlogo" src="/pics/logo1.png" alt="Company Logo" height="75">
      </pre>

    `) // end header-row

    $('#main-bar').html(`

      <div> <!-- Open Orders Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>Open Orders of Employee_ID</u>
        </h4>

        <table class="tg">
          <tr>
            <th class="tg-0lax">Order_No</th>
            <th class="tg-0lax">Cust_no</th>
            <th class="tg-0lax">Start_time</th>
            <th class="tg-0lax" rowspan="2">
              <button style="width: 150px;height: 75px" type="btn btn-primary" id='openOrder1-btn'>
                  Open Order
              </button>
            </th>
          </tr>
          <tr>
            <td class="tg-0lax">Tkt_time</td>
            <td class="tg-0lax">Price</td>
            <td class="tg-0lax">Ttl_pay</td>
          </tr>
        </table>

        <table class="tg">
          <tr>
            <th class="tg-0lax">Order_No</th>
            <th class="tg-0lax">Cust_no</th>
            <th class="tg-0lax">Start_time</th>
            <th class="tg-0lax" rowspan="2">
              <button style="width: 150px;height: 75px" type="btn btn-primary" id='openOrder2-btn'>
                  Open Order
              </button>
            </th>
          </tr>
          <br>
          <tr>
            <td class="tg-0lax">Tkt_time</td>
            <td class="tg-0lax">Price</td>
            <td class="tg-0lax">Ttl_pay</td>
          </tr>
        </table>

      </div> <!-- end Open Orders Section -->

      <br><br><br>

      <div> <!-- Completed Orders Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>Completed Orders of Employee_ID</u>
        </h4>

        <table class="tg">
          <tr>
            <th class="tg-0lax">Order_No</th>
            <th class="tg-0lax">Cust_no</th>
            <th class="tg-0lax">Start_time</th>
            <th class="tg-0lax" rowspan="2">
              <button style="width: 150px;height: 75px" type="btn btn-primary" id='completedOrder1-btn'>
                  Open Order
              </button>
            </th>
          </tr>
          <tr>
            <td class="tg-0lax">Tkt_time</td>
            <td class="tg-0lax">Price</td>
            <td class="tg-0lax">Ttl_pay</td>
          </tr>
        </table>

      </div> <!-- end Completed Orders Section -->

    `) // end main-bar

    $('#left-bar').html(`

    `) // end left-bar

    $('#right-bar').html(`

      <button style="width: 150px" type="btn btn-primary" id='switchviews-btn'>
          Switch Views
      </button>

      <br><br><br>

      <div> <!-- Shift Info Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>Shift Info</u>
        </h4>

        <table class="tg" align="center">
          <tr>
            <th class="tg-s268">Cash_out</th>
          </tr>
          <tr>
            <td class="tg-s268">Tip_out</td>
          </tr>
        </table>

      </div> <!-- end Shift Info Section -->

      <br><br><br><br><br>

      <div>
        <button style="width: 150px;height: 100px" type="btn btn-primary" id='newOrder-btn'>
          New Order
        </button>
      <div>

    `)
  } // end loadServerDB

  // Switch Views button
  $(document).on('click', '#switchviews-btn', event => {
      event.preventDefault

      $.getScript("./js/adminView.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end login-btn actions

  // Open Order button
  $(document).on('click', '#openOrder1-btn', event => {
      event.preventDefault

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Open Order button actions

  // Open Order button
  $(document).on('click', '#openOrder2-btn', event => {
      event.preventDefault

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Open Order button actions

  // Open Order button
  $(document).on('click', '#completedOrder1-btn', event => {
      event.preventDefault

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end Open Order button actions

  // New Order button
  $(document).on('click', '#newOrder-btn', event => {
      event.preventDefault

      $.getScript("./js/customer.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end New Order button actions

} // end serverDashboard.js
