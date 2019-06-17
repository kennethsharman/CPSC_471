
// Login View

{ // local scopes
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
      let employee
      let defaultEmployee
      switch(event.target.id) {
        case 'self':
          mode = SELF_EDIT
          employee = Object.assign({}, state('user'))
          defaultEmployee = Object.assign({}, state('user'))
          // editting yourself. You shoul dbe able to logout.
          break;
        case 'anonymous-emp':
          mode = MANAGER_NEW
          // new employee. Load up some blanks and make sure to POST
          break;

        default:
          // manager editting a rando. Add manager options
          console.log(event.target.id)
          var e = state('employeeInfo').find(({employee_id}) => employee_id== event.target.id.substring(10))
          employee = Object.assign({}, e)
          defaultEmployee = Object.assign({}, e) // deep copy
      }

      /**
       * HEADER
       */

      $('.modal-header').html(`
      <div id="name-edit-container">
        <h4 class="modal-title" style="text-align: center" color="black">
          ${employee.f_name}
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
        <h6>Email Address</h6>
        <p>${employee.email}</p>
        <h6>Contact Number </h6>
        ${contactNumber(employee.phone_number)}
        <h6>Address </h6>
        ${address(employee.address)}
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
        $('#phone-input').val(employee.phone_number)

        const save = () => {
          employee.phone_number = $('#phone-input').val()
          $("#contact-edit-container").html(contactNumber(employee.phone_number))
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
        $('#address-input').val(employee.address)

        const save = () => {
          employee.address = $('#address-input').val()
          $("#address-edit-container").html(address(employee.address))
        }
        click('#address-edit-save', save)
      })

      const roles = (s,c,m) => {
        return `
          <br>
          <h6>
          Roles
          <a class="glyph" href="#" id="role-edit"><i class="fas fa-pencil-alt pad"></i></a>
          </h6>
          <p>
            <span>
            <td>${s? "SERVER" : ""} ${c? "COOK" : ""} <br> ${m? "MANAGER" : ""}</td>
           </span>
          </p>`
      }

      if(mode!==SELF_EDIT) $(`.modal-body`).append(
        `<div id="roles">
          ${roles(employee.server_flag, employee.cook_flag, employee.manager_flag)}
        </div>`)

      click('#role-edit', () => {
        $('#roles').html(`
          <br>
          <h6>
          Roles
          <a class="glyph" href="#" id="role-edit-save">
            <i class="fas fa-save" id="role-edit-save-inner"></i>
          </a>
          </h6>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="server-role">
            <label class="form-check-label" for="server-role">
              SERVER
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="cook-role">
            <label class="form-check-label" for="cook-role">
              COOK
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="manager-role">
            <label class="form-check-label" for="manager-role">
              MANAGER
            </label>
          </div>
        `)

          $('#server-role').prop("checked", employee.server_flag)
          $('#cook-role').prop("checked", employee.cook_flag )
          $('#manager-role').prop("checked", employee.manager_flag)

        const save = () => {
          employee.server_flag = $('#server-role').is(":checked")
          employee.cook_flag = $('#cook-role').is(":checked")
          employee.manager_flag = $('#manager-role').is(":checked")
          $("#roles").html(roles(employee.server_flag, employee.cook_flag, employee.manager_flag))
        }
        click('#role-edit-save', save)
      })

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
      <button type="button" class="btn btn-secondary cancel-changes" id="cancel-changes" data-dismiss="modal">Cancel</button>
      `)
      else $(`.modal-footer`).prepend(`
      <button type="button" class="btn btn-secondary cancel-changes" id="manage-emp-btn">Back</button>
      `)

      $('#modal-container').modal()

      click('.cancel-changes', e => {
        if(e.target.id===`cancel-changes`) state('user', defaultEmployee)
        else state('employeeInfo')
      })
      click('.save-changes', () => {
        state('user', employee)
        requestService('/user', 'PUT', employee)
      })
  })
}
