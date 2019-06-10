
// Login View

{ // local scopes
  $(`.loader-container`).hide()
  loginService()

click('#switchviews-btn', () => view("./js/adminView.js"))
click('#s-dash-btn', () => view("./js/serverDashboard.js"))
click('#c-dash-btn',  () => view("./js/cookDashboard.js"))
click('#m-dash-btn', () => view("./js/managerDashboard.js"))
click('#neworder-btn', () => view("./js/customer.js"))

/**
 * MyAccount button
*/
  click('.edit-emp', event => {
    /**
     * SETUP
     */
      event.preventDefault()

      //ENUM
      const MANAGER_EDIT = 0
      const MANAGER_NEW = 1
      const SELF_EDIT = 2
  
      let mode = MANAGER_EDIT
      let user
      let defaultUser
      switch(event.target.id) {
        case 'self':
          mode = SELF_EDIT
          user = state('user')
          defaultUser = state('user')
          // editting yourself. You shoul dbe able to logout.
          break;
        case 'anonymous-emp':
          mode = MANAGER_NEW
          // new employee. Load up some blanks and make sure to POST
          break;
  
        // default:
          // manager editting a rando. Add manager options
      }
  
      /**
       * HEADER
       */
  
      $('.modal-header').html(`
      <div id="name-edit-container">
        <h4 class="modal-title" style="text-align: center" color="black">
          ${user.f_name}
        </h4>
      </div>`)

      /**
       * BODY
       */

      const contactNumber = phone_number => `
      <p id="contact-edit-container">
          <span> ${phone_number || "No contact number provided"}</span>
          <a class="glyph" href="#" id="contact-edit"><i class="fas fa-pencil-alt pad"></i></a>
      </p>`

      const address = address => `
      <p id="address-edit-container">
        <span> ${address || "No address provided"}</span>
        <a class="glyph" href="#" id="address-edit"><i class="fas fa-pencil-alt pad"></i></a>
      </p>`
  
      $('.modal-body').html(`
        <h6>Contact Number </h6>
        ${contactNumber(user.phone_number)}
        <h6>Address </h6>
        ${address(user.address)}
      `)

      click("#contact-edit", function(event) {
        $("#contact-edit-container").html(`
          <div class="row">
            <div class="col-10">
              <input class="form-control" id="phone-input">
            </div>
            <div class="col-2">
              <h3>
                <a class="glyph" href="#" id="phone-edit-save">
                  <i class="fas fa-save" id="phone-edit-save-inner">
                  </i>
                </a>
              </h3>
            </div>
          </div><!-- row -->`)
        $('#phone-input').val(user.phone_number)

        const save = function(event) {
          user.phone_number = $('#phone-input').val()
          $("#contact-edit-container").html(contactNumber(user.phone_number))
          $(this).off(event)
        }
        click('#phone-edit-save', save)
      })

      click("#address-edit", () => {
        $("#address-edit-container").html(`
          <div class="row">
            <div class="col-10">
              <input class="form-control" id="address-input">
            </div>
            <div class="col-2">
              <h3>
                <a class="glyph" href="#" id="address-edit-save">
                  <i class="fas fa-save" id="address-edit-save-inner">
                  </i>
                </a>
              </h3>
            </div>
          </div><!-- row -->`)
        $('#address-input').val(user.address)

        const save = function(event) {
          user.address = $('#address-input').val()
          $("#address-edit-container").html(address(user.address))
          $(this).off(event)
        }
        click('#address-edit-save', save)
      })
  
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

    /**
     * FOOTER
     */

      $('.modal-footer').html(`
        <button type="button" class="btn btn-primary save-changes" data-dismiss="modal">Save</button>
      `)
  
      if(mode===SELF_EDIT) $(`.modal-footer`).prepend(`
      <button type="button" class="btn btn-warning mr-auto logout" style="color: white" data-dismiss="modal">
        <i class="fas fa-sign-out-alt"></i>Logout
      </button>
      <button type="button" class="btn btn-secondary cancel-changes" data-dismiss="modal">Cancel</button>
      `)
      else $(`.modal-footer`).prepend(`
      <button type="button" class="btn btn-secondary cancel-changes" id="manage-emp-btn">Back</button>
      `)
  
      $('#modal-container').modal()

      click('.cancel-changes', () => {
        state('user', defaultUser)

      })
      click('.save-changes', () => {
        state('user', user)
        requestService('/user', 'PUT', user)
      })
  })
}
