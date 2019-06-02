
// Cook Dashboard View

{
  loadCookDB();

  // Load Cook Dashboard
  function loadCookDB() {

    $('#header-row').html(`

      <h1 >Cook Dashboard</h1>
      <pre>
        <img id="headerlogo" src="/pics/logo1.png" alt="Company Logo" height="75">
      </pre>

    `) // end header-row

    $('#main-bar').html(`

      <div> <!-- FRY Food Items Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>FRY Food Items</u>
        </h4>

        <table class="tg">
          <tr>
            <th class="tg-s268">Item_no</th>
            <th class="tg-0lax" colspan="2">Food_Name</th>
            <th class="tg-0lax" rowspan="2">
              <button style="width: 150px;height: 75px" type="btn btn-primary" id='openOrder1-btn'>
                Bump Order
              </button>
            </th>
          </tr>
          <tr>
            <td class="tg-s268">Spc_Req</td>
            <td class="tg-0lax">Allergy</td>
            <td class="tg-0lax">Tkt_time</td>
          </tr>
        </table>

        <br>

        <table class="tg">
          <tr>
            <th class="tg-s268">Item_no</th>
            <th class="tg-0lax" colspan="2">Food_Name</th>
            <th class="tg-0lax" rowspan="2">
              <button style="width: 150px;height: 75px" type="btn btn-primary" id='openOrder1-btn'>
                Bump Order
              </button>
            </th>
          </tr>
          <tr>
            <td class="tg-s268">Spc_Req</td>
            <td class="tg-0lax">Allergy</td>
            <td class="tg-0lax">Tkt_time</td>
          </tr>
        </table>

      </div> <!-- end FRY Food Items Section -->

      <br><br><br>

      <div> <!-- CUT Food Items Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>FRY Food Items</u>
        </h4>

        <table class="tg">
          <tr>
            <th class="tg-s268">Item_no</th>
            <th class="tg-0lax" colspan="2">Food_Name</th>
            <th class="tg-0lax" rowspan="2">
              <button style="width: 150px;height: 75px" type="btn btn-primary" id='openOrder1-btn'>
                Bump Order
              </button>
            </th>
          </tr>
          <tr>
            <td class="tg-s268">Spc_Req</td>
            <td class="tg-0lax">Allergy</td>
            <td class="tg-0lax">Tkt_time</td>
          </tr>
        </table>

        <br>

      </div> <!-- end CUT Food Items Section -->

    `) // end main-bar

    $('#left-bar').html(`

    `) // end left-bar

    $('#right-bar').html(`

      <button style="width: 150px" type="btn btn-primary" id='switchviews-btn'>
          Switch Views
      </button>

    `)
  } // end loadCookDB

  // Switch Views button
  $(document).on('click', '#switchviews-btn', event => {
      event.preventDefault

      $.getScript("./js/adminView.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end login-btn actions

} // end serverDashboard.js
