/**
 *  Project front end ideas
 */


{ // local scope
    const GREETING = "Welcome"

    loadLogin() // landing page is login

    // Load Login Page
    function loadLogin() {

      $('#main-bar').html(`
          <br>
          <img id="login_img" src="The_Fantasy_Street_Kitchen.png" alt="Company Logo" height="500">
          <br><h1>${GREETING}</h1><br>
          <p>Username <textarea rows="1" cols="20"> </textarea></p>
          <p>Password <textarea rows="1" cols="20"> </textarea></p>
          <button type="btn btn-primary" id='login-btn'>
              Login
          </button>
      `)

    } // end loadLogin

    // login button
    $(document).on('click', '#login-btn', event => {
        event.preventDefault

      //$.getScript("./adminView.js", function() {
      //    loadAdmin();
      //  });

        $.getScript("./adminView.js").then(function () {
          $('#main-bar').empty();
        }, function(err){
          alert('ERROR:' + JSON.stringify(err));
        });

    });

} // end script
