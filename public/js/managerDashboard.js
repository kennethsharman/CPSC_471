
// Manager Dashboard View

{
  loadManagerDB();

  // Load Manager Dashboard
  function loadManagerDB() {

    $('#header-row').html(`
    <h3 class="header-title">
      <img id="header-logo" src="pics/logo1.png" alt="Company Logo"> 
      Manager Dashboard
    </h3>

    `) // end header-row

    $('#main-bar').html(`
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Inventory</h4>
          <div class="container-fluid lighter">
            <div class="row">
              <div class="col-md-6">
                <a href="#" id='new-inventory-btn' class="btn btn-primary">New Inventory</a>
              </div><!-- L col -->
              <div class="col-md-6">
                <a href="#" id='inventory-history-btn' class="btn btn-primary">History</a>
              </div><!-- R col -->
            </div><!-- row -->
          </div> <!-- container-->
        </div><!-- body -->
      </div><!-- card -->

      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Employees</h4>
          <div class="container-fluid lighter">
            <div class="row">
              <div class="col-md-12">
                <a href="#" id='manage-emp-btn' class="btn btn-primary">Manage Employees</a>
              </div><!-- R col -->
            </div><!-- row -->
          </div> <!-- container-->
        </div><!-- body -->
      </div><!-- card -->

    `) // end main-bar

    $('#left-bar').html(`
    <div class="card">
      <div class="card-body">
        <div class="container-fluid lighter">
        <div class="row">
            <div class="col-lg-12">
              <a href="#" class="btn btn-primary" id="switchviews-btn">
                Switch Views
              </a>
            </div><!-- col -->
          </div><!-- row 1 -->
          </div> <!-- container-->
      </div><!-- card body-->
    </div><!-- card -->
    `) // end left-bar

    $('#right-bar').html(``)
  } // end loadManagerDB

  click('#inventory-history-btn',() => modal(`
      <a href="#" class="btn btn-primary dropbtn">Supplier<i class="fas fa-sort-down"></i></a>
          <a href="#">GFS</a>
          <a href="#">Sysco</a>
        </div><!-- dd content -->
    </div><!-- dd -->`,`
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    <button type="button" class="btn btn-primary" id="new-inventory-btn" data-dismiss="modal">Add</button>
  `))

  click('#inventory-history-btn',() => modal(`
  <h4>Inventory History</h4>`,`
  <h6>Date</h6>
  <input type="date" name="history-date">
  <br><br>
  <div class="dropdown">
    <a href="#" class="btn btn-primary dropbtn">Supplier <i class="fas fa-sort-down"></i></a>
    <div class="dropdown-content">
      <a href="#">GFS</a>
      <a href="#">Sysco</a>
    </div>
  </div>
  <br>`,`
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
  <button type="button" class="btn btn-primary" id='pullReport-btn' data-dismiss="modal">Pull Report</button>
  `))

  const empModal = (event = ({preventDefault:()=>null})) => { // js magic
      event.preventDefault()

    modal(`
    <h4>Mange Employees</h4>
    `,`
    <br>
    <div class="table-div" id="employee-table">
      <table class="table table-dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ken Sharman</td>
            <td>COOK <br> SERVER <br> MANAGER</td>
            <td>
              <a href="#" class="edit-emp glyph" id="ken-sharman-edit">
                <i class="fas fa-pencil-alt pad edit-emp" id="ken-sharman-edit-inner"></i>
              </a>
              <a href="#" class="remove-emp glyph" id="ken-sharman-remove">
                <i class="fas fa-user-times pad remove-emp" id="ken-sharman-remove-inner"></i>
              </a>
            </td>
          </tr>
          <tr>
            <td>Peter Schulze</td>
            <td>SERVER</td>
            <td>
              <a href="#" class="edit-emp glyph" id="peter-schulze-edit">
                <i class="fas fa-pencil-alt pad edit-emp" id="peter-schulze-edit-inner"></i>
              </a>
              <a href="#" class="remove-emp glyph" id="peter-schule-remove">
                <i class="fas fa-user-times pad remove-emp" id="peter-schulze-remove-inner"></i>
              </a>
            </td>
          </tr>
            <tr>
            <td>Elvin Limpin</td>
            <td>COOK</td>
            <td>
              <a href="#" class="edit-emp glyph" id="elvin-limpin-edit">
                <i class="fas fa-pencil-alt pad edit-emp" id="elvin-limpin-edit-inner"></i>
              </a>
              <a href="#" class="remove-emp glyph" id="elvin-limpin-remove">
                <i class="fas fa-user-times pad remove-emp" id="elvin-limpin-remove-inner"></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `,`
    <button type="button" class="btn btn-primary mr-auto edit-emp" id="anonymous-emp" style="color: white">
      <i class="fas fa-user-plus" id="anonymous-emp-inner"></i> Add New Employee
    </button>
      <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
    `)
  }

  // Add/Edit Employee Button
  click('#manage-emp-btn', empModal) // end add/edit employee button actions

  click('.remove-emp', () => modal(`
    <h4>Confirm Remove</h4>`,`
    <h6>Permanently remove ${event.target.id.substring(0,12)}?</h6>
    `,`
    <button type="button" class="btn btn-secondary" id="manage-emp-btn">Back</button>
    <button type="button" class="btn btn-primary" id="confirm-remove">Confirm</button>
    `))

  click('#confirm-remove', event => {
    event.preventDefault()

    // logic

    empModal()
  })

} // end managerDashboard.js
