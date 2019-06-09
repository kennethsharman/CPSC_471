
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

    loginService()

      // MyAccount button
  clickService('.edit-emp', event => {
    //ENUM
    const MANAGER_EDIT = 0
    const MANAGER_NEW = 1
    const SELF_EDIT = 2
    event.preventDefault()

    let mode = MANAGER_EDIT
    switch(event.target.id) {
      case 'self':
        mode = SELF_EDIT
        // editting yourself. You shoul dbe able to logout.
        break;
      case 'anonymous-emp':
        mode = MANAGER_NEW
        // new employee. Load up some blanks and make sure to POST
        break;

      // default:
        // manager editting a rando. Add manager options
    }

    $('.modal-header').html(`
    <h4 class="modal-title" style="text-align: center" color="black">
      FName LName
      <a class="glyph" href="#" id="name-edit"><i class="fas fa-pencil-alt pad"></i></a>
    </h4>`)

    $('.modal-body').html(`

      <h6>Contact Number </h6>
      <p>
          <span> 555-555-5555</span>
          <a class="glyph" href="#" id="contact-edit"><i class="fas fa-pencil-alt pad"></i></a>
      </p>
      <h6>Address </h6>
      <p>
          <span> 134 45th St SW</span>
          <a class="glyph" href="#" id="address-edit"><i class="fas fa-pencil-alt pad"></i></a>
      </p>
    `)

    if(mode!==SELF_EDIT) $(`.modal-body`).append(`
      <br>
      <h6> Roles </h6>
      <p>
        <span>
          COOK | SERVER | MANAGER 
          <a class="glyph" href="#" id="role-edit"><i class="fas fa-pencil-alt pad"></i></a>
        </span>
      </p>
    `)

    if(mode!==MANAGER_NEW) $(`.modal-body`).append(`
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
      <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
    `)

    if(mode===SELF_EDIT) $(`.modal-footer`).prepend(`
    <button type="button" class="btn btn-warning mr-auto logout" style="color: white" data-dismiss="modal">
      <i class="fas fa-sign-out-alt"></i>Logout
    </button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    `)
    else $(`.modal-footer`).prepend(`
    <button type="button" class="btn btn-secondary" id="manage-emp-btn">Back</button>
    `)

    $('#modal-container').modal();
}) // end button action

clickService('#switchviews-btn', () => loadService("./js/adminView.js"))
clickService('#s-dash-btn', () => loadService("./js/serverDashboard.js"))
clickService('#c-dash-btn',  () => loadService("./js/cookDashboard.js"))
clickService('#m-dash-btn', () => loadService("./js/managerDashboard.js"))
clickService('#neworder-btn', () => loadService("./js/customer.js"))
} // end script.js
