
// Login View

{ // local scope
    loadLogin() // landing page is login

    // Load Login Page
    function loadLogin() {
      $('#header-row').html(`
        <div style="padding:24px;margin:12px;">
          <img id="login_img" src="pics/The_Fantasy_Street_Kitchen.png" alt="Company Logo" height="200px">
        </div>
      `)
      $('#main-bar').html(`
        <div id="firebaseui-auth-container"></div>
      `)

    } // end loadLogin


    $(document).on('click', '.logout', e => {
      e.preventDefault()
      firebase.auth().signOut().then( () => {
        location.reload()
      })
    })

    const auth = firebase.auth()
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
    ui.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => false,
      },
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    })

    auth.onAuthStateChanged(user => {
      if(user) {
        $.getScript("./js/adminView.js").then(function () {
        }, function(err){
          alert('ERROR:' + JSON.stringify(err));
        }); // end getScript

      } else {
          loadLogin()
        }
    })

    $(document).on('click', '#switchviews-btn', event => {
      event.preventDefault()
  
      $.getScript("./js/adminView.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });
    })

      // MyAccount button
  $(document).on('click', '#myaccount-btn', event => {
    event.preventDefault()

    $('.modal-header').html(`
    <h4 class="modal-title" style="text-align: center" color="black">
      FName LName
    </h4>`)

    $('.modal-body').html(`

      <h6>Contact Number </h6>
      <p>
          <span> 555-555-5555</span>
          <a class="glyph" href="#" id="contact-edit"><i class="fas fa-pencil-alt"></i></a>
      </p>
      <h6>Address </h6>
      <p>
          <span> 134 45th St SW</span>
          <a class="glyph" href="#" id="address-edit"><i class="fas fa-pencil-alt"></i></a>
      </p>

      <h6>Shift Log</h6>
      <div class="table-div">
        <table class="table table-dark">
          <thead>
            <tr>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>May 20, 2019</td>
              <td>8:30</td>
              <td>16:22</td>
            </tr>
            <tr>
              <td>July 17, 2077</td>
              <td>9:00</td>
              <td>15:01</td>
            </tr>
            <tr>
              <td>July 17, 2077</td>
              <td>9:00</td>
              <td>15:01</td>
            </tr>
            <tr>
              <td>July 17, 2077</td>
              <td>9:00</td>
              <td>15:01</td>
            </tr>
            <tr>
              <td>July 17, 2077</td>
              <td>9:00</td>
              <td>15:01</td>
            </tr>
          </tbody>
        </table>
    </div>
    `)
    $('.modal-footer').html(`
    <button type="button" class="btn btn-warning mr-auto logout" style="color: white" data-dismiss="modal">
      <i class="fas fa-sign-out-alt"></i>Logout
    </button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
    `)
    $('#modal-container').modal();
}) // end button action

// Server Dashboard button
$(document).on('click', '#s-dash-btn', event => {
    event.preventDefault()

    $.getScript("./js/serverDashboard.js").then(function () {
    }, function(err){
      alert('ERROR:' + JSON.stringify(err));
    });

}); // end Server Dashboard button actions

// Cook Dashboard button
$(document).on('click', '#c-dash-btn', event => {
    event.preventDefault()

    $.getScript("./js/cookDashboard.js").then(function () {
    }, function(err){
      alert('ERROR:' + JSON.stringify(err));
    });

}); // end Cook Dashboard button actions

  // Manager Dashboard button
  $(document).on('click', '#m-dash-btn', event => {
      event.preventDefault()

      $.getScript("./js/managerDashboard.js").then(function () {
      }, function(err){
        alert('ERROR:' + JSON.stringify(err));
      });

  // New Order button
  $(document).on('click', '#neworder-btn', event => {
    event.preventDefault()

    $.getScript("./js/customer.js").then(function () {
    }, function(err){
      alert('ERROR:' + JSON.stringify(err));
      })
    }) // end New Order button actions
  })
} // end script.js
