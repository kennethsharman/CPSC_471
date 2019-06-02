
{
  loadAdmin();
  // Load Admin View Page
  function loadAdmin() {

    $('#header-row').html(`

      <h1 >Employee Access Screen</h1>
      <pre>
        <img id="headerlogo" src="logo1.png" alt="Company Logo" height="75">
      </pre>

    `) // end header-row

    $('#main-bar').html(`

        <div align="left">

          <div>
            <h2 style="display: inline-block; text-align: left; width: 100%">
              <u>Server</u>
            </h2>
            <button style="width: 150px" type="btn btn-primary" id='neworder-btn'>
                New Order
            </button>
            <button style="width: 150px" type="btn btn-primary" id='svrdsbrd-btn'>
                Server Dashboard
            </button>
          </div>

          <div>
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
          </div>

          <div>
            <h2 style="display: inline-block; text-align: left; width: 100%">
              <u>Manager</u>
            </h2>
            <button style="width: 200px" type="btn btn-primary" id='mgrdshrd-btn'>
                Manager Dashboard
            </button>
          </div>

        </div>

    `)

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

    `)
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

    `)
  } // end loadAdmin

  // MyAccount button
  $(document).on('click', '#myaccount-btn', event => {
      event.preventDefault
      $('#myAccount').modal();
  }) // end button action

} // end adminView.js
