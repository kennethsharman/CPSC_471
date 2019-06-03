
// Customer Order View

{
  loadOrder();

  // Load Customer Order View Page
  function loadOrder() {

    $('#header-row').html(`

      <h1>Order View</h1>
      <pre>
        <img id="headerlogo" src="/pics/logo1.png" alt="Company Logo" height="75">
      </pre>

    `) // end header-row

    $('#main-bar').html(`

      <div> <!-- Pasta Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>Pasta</u>
        </h4>

        <table class="tg">
          <tr>
            <th class="tg-s268">
              <img id="headerlogo" src="/pics/pasta1.jpeg" alt="Pasta1" height="150">
            </th>
            <th class="tg-0lax">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</th>
            <th class="tg-0lax">
              <button style="width: 75px;height: 150px" type="btn btn-primary" id='additem1-btn'>
                ADD
              </button>
            </th>
          </tr>
        </table>

        <table class="tg">
          <tr>
            <th class="tg-s268">
              <img id="headerlogo" src="/pics/pasta2.jpg" alt="Pasta2" height="150">
            </th>
            <th class="tg-0lax">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</th>
            <th class="tg-0lax">
              <button style="width: 75px;height: 150px" type="btn btn-primary" id='additem2-btn'>
                ADD
              </button>
            </th>
          </tr>
        </table>

      </div> <!-- end Pasta Section -->

      <br><br>

      <div> <!-- Drink Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>Drinks</u>
        </h4>

        <table class="tg">
          <tr>
            <th class="tg-s268">
              <img id="headerlogo" src="/pics/coke.jpg" alt="Pasta1" height="125">
            </th>
            <th class="tg-0lax">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</th>
            <th class="tg-0lax">
              <button style="width: 75px;height: 125px" type="btn btn-primary" id='additem3-btn'>
                ADD
              </button>
            </th>
          </tr>
        </table>

      </div> <!-- end Drinks Section -->

    `) // end main-bar

    $('#left-bar').html(`

      <div> <!-- Order Info -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          <u>Order Info</u>
        </h4>

        <table class="tg">
          <tr>
            <th class="tg-s268">Start_time</th>
          </tr>
          <tr>
            <td class="tg-s268">Order_date</td>
          </tr>
          <tr>
            <td class="tg-0lax">Price</td>
          </tr>
        </table>

      </div> <!-- end Order Info -->

    `) // end left-bar

    $('#right-bar').html(`

      <button style="width: 150px" type="btn btn-primary" id='switchviews-btn'>
          Switch Views
      </button>

      <br><br>

      <div> <!-- Order Info -->

        <h4 style="display: inline-block; text-align: center; width: 100%">
          <u>Order Contents</u>
        </h4>

        <table class="tg" align="center">
          <tr>
            <th class="tg-s268">ABC</th>
          </tr>
          <tr>
            <td class="tg-0lax">123</td>
          </tr>
          <tr>
            <td class="tg-0lax">345 (No peanuts)</td>
          </tr>
        </table>

      </div> <!-- end Order Info -->

      <br><br><br>

      <button style="width: 150px" type="btn btn-primary" id='placeOrder-btn'>
          Place Order
      </button>

    `) // end right-bar

  } // end loadOrder

  // Switch Views button
  $(document).on('click', '#switchviews-btn', event => {
      event.preventDefault

      $.getScript("./js/adminView.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  }); // end switch views button actions

} // end customer.js
