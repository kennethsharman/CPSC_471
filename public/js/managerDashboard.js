// Manager Dashboard View

{
  const sampleInventory = [[
    {
      "name": "dough",
      "quantity": 10
    },
    {
      "name": "tomato sauce",
      "quantity": 10
    },
    {
      "name": "spaghetti noodles",
      "quantity": 4
    },
    {
      "name": "mozzarella",
      "quantity": 4
    },
    {
      "name": "white bread",
      "quantity": 5
    },
    {
      "name": "spinach",
      "quantity": 1
    }],
    [{
      "name": "ham",
      "quantity": 5
    },
    {
      "name": "bacon",
      "quantity": 4
    }
  ]]
  
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
                <a href="#" id='new-inventory-btn' class="btn btn-primary">Take Inventory</a>
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

  click('#new-inventory-btn', () => {
    modal(`<h4>Take inventory</h4>`,`
      <div>
        <p><span style="color:#e14b4b" id="invalid-file-warning">This inventory file is invalid. </span>Paste inventory file here:</p><br>
        <textarea class="form-control" rows="5" id="inventory-file"></textarea>
      </div>
      <br>
      <div class="dropdown">
        <a href="#" class="btn btn-primary dropbtn"><span class='current-supplier'>Select Supplier</span> <i class="fas fa-sort-down"></i></a>
        <div class="dropdown-content">
          <a href="#" id="supplier-gfs">GFS</a>
          <a href="#" id="supplier-sysco">Sysco</a>
        </div><!-- dd content -->
      </div><!-- dd -->
      `,`
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary" id="new-inventory-add">Add</button>
    `)
    $('#invalid-file-warning').hide()

    click('#new-inventory-add', () => {
      try {
        const inventory = JSON.parse($("#inventory-file").html())
        
        modal().body(`
        <div>
          <h4>Posting new inventory...</h4>
        </div>
      `).foot(``)
  
        requestService('/inventory', 'post', {
          manager_id: state('user').employee_id,
          inventory_file: JSON.stringify(inventory),
          supplier: state('supplier').supplier,
          inventory_date: new Date(),
        }, res => {
          modal().toggle()
        })
      } catch(e) {
        $('#invalid-file-warning').show('fast')
      }
  
    })
  })

  click('#inventory-history-btn',() => {
    modal(`
    <h4>Inventory History</h4>`,`
    <h6>Date</h6>
    <input type="date" name="history-date" id="history-date">
    <br><br>
    <div class="dropdown">
      <a href="#" class="btn btn-primary dropbtn"><span class='current-supplier'>Select Supplier</span><i class="fas fa-sort-down"></i></a>
      <div class="dropdown-content">
        <a href="#" id="supplier-gfs">GFS</a>
        <a href="#" id="supplier-sysco">Sysco</a>
      </div>
    </div>
    <br>`,`
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    <button type="button" class="btn btn-primary" id='pullReport-btn'>Pull Report</button>
    `)

    click('#pullReport-btn', () => {
      const inventory_date = $('#history-date').val()
      modal().foot(``).body(`<h4>Pulling report</h4>`)

      requestService('/inventory/history', 'POST', {
        manager_id: state('user').employee_id,
        supplier: state('supplier').supplier,
        inventory_date
      }, inventory => {
          modal().foot(`
            <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
          `).body(`
            <textarea class="form-control" rows="5" id="inventory-file"></textarea>
          `)
          $('#inventory-file').html(inventory.msg[0].inventory_file)
        })
    })
  })

  click('#supplier-gfs', () => {
    $('.current-supplier').html('GFS')
    state('supplier', {supplier: 'GFS'})
  })
  click('#supplier-sysco', () => {
    $('.current-supplier').html('Sysco')
    state('supplier', {supplier: 'Sysco'})
  })

  const empModal = (e = ({preventDefault:()=>null})) => { // js magic
      e.preventDefault()

    modal(`<h4>Manage Employees</h4>`,`Loading Employees...`,``)

    requestService(`/user`, 'GET', {}, res => {
      modal().body(`<br>
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
          ${
            // loop
            res.msg.reduce((prev, {f_name, manager_flag, server_flag, cook_flag, employee_id}) => `
              ${prev}
              <tr>
                <td>${f_name}</td>
                <td>${server_flag? "SERVER" : ""}<br> ${cook_flag? "COOK" : ""} <br> ${manager_flag? "MANAGER" : ""}</td>
                <td>
                  <a href="#" class="edit-emp glyph" id="edit-emp1-${employee_id}">
                    <i class="fas fa-pencil-alt pad" id="edit-emp2-${employee_id}"></i>
                  </a>
                  <a href="#" class="remove-emp glyph" id="remove-emp1-${employee_id}">
                    <i class="fas fa-user-times pad" id="remove-emp2-${employee_id}"></i>
                  </a>
                </td>
              </tr>
            `,``)
          }
        </tbody>
        </table>
      </div>
      `).foot(`
      <!--button type="button" class="btn btn-primary mr-auto edit-emp" id="anonymous-emp" style="color: white">
        <i class="fas fa-user-plus" id="anonymous-emp-inner"></i> Add New Employee
      </button--><!-- off for now. use login to create -->
        <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
      `)

      state('employeeInfo', res.msg)
    })
  }

  // Add/Edit Employee Button
  click('#manage-emp-btn', empModal) // end add/edit employee button actions

  click('.remove-emp', e => {
    const name = state('employeeInfo').find(({employee_id}) => employee_id== e.target.id.substring(12)).f_name
    modal(`
    <h4>Confirm Remove</h4>`,`
    <h6>Permanently remove ${name}?</h6>
    `,`
    <button type="button" class="btn btn-secondary" id="manage-emp-btn">Back</button>
    <button type="button" class="btn btn-primary confirm-remove" id="confirm-remove-${e.target.id.substring(12)}">Confirm</button>
    `)
  })

  click('.confirm-remove', e => {
    e.preventDefault()

    modal().body('<h6>Removing employee...</h6>').foot('')
    requestService(`/user/${e.target.id.substring(15)}`, "DELETE", {}, res => {
      empModal()
    })
  })
} // end managerDashboard.js