
// Server Dashboard View

{
  set_open_orders_list();


  // Load Server Dashboard
  function loadServerDB() {

    $('#header-row').html(`
      <h3 class="header-title">
        <img id="header-logo" src="pics/logo1.png" alt="Company Logo">
        Server Dashboard
      </h3>

    `) // end header-row

    const user = state('user')

    $('#main-bar').html(`

      <div> <!-- Open orders Section -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title order-heading">
              Open Orders for Employee ID #${user.employee_id} - ${user.f_name}
            </h4>

            <div id="open-orders-card" class="card-text">

            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <h5 style="text-align:left"> Order Ord_num </h5>
                </div>
              </div><!-- top row -->
              <div class="row">
                <div class="col-8">
                  <table class="table table-dark">
                    <tr>
                      <th class="tg-0lax">
                        <p>Customer: <span>Cust_no</span></p>
                        <p>Ticket Time: <span>Tkt_time</span></p>
                      </th>
                      <th class="tg-s268">
                        <p>Price: <span>price</span></p>
                        <p>Total Pay: <span>TTL_pay</span></p>
                      </th>
                    </tr>
                  </table>
                </div><!-- col L -->
                <div class="col-4">
                  <a href="#" class="btn btn-primary order-btn" id='openOrder1-btn'>
                    Open Order
                  </a>
                </div><!-- col R -->
              </div><!-- row main -->
              <hr>
            </div><!-- container -->

          </div><!-- card body -->
        </div><!-- card -->
      </div> <!-- Open orders Section -->

      <br>

      <div> <!-- Completed Orders Section -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title order-heading">
              Completed Orders of Employee_ID
            </h4>

          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <h5 style="text-align:left"> Order Ord_num </h5>
              </div>
            </div><!-- top row -->
            <div class="row">
              <div class="col-8">
                <table class="table table-dark">
                  <tr>
                    <th class="tg-0lax">
                      <p>Customer: <span>Cust_no</span></p>
                      <p>Ticket Time: <span>Tkt_time</span></p>
                    </th>
                    <th class="tg-s268">
                      <p>Price: <span>price</span></p>
                      <p>Total Pay: <span>TTL_pay</span></p>
                    </th>
                  </tr>
                </table>
              </div><!-- col L -->
              <div class="col-4">
                <a href="#" class="btn btn-primary order-btn" id='openOrder1-btn'>
                  Open Order
                </a>
              </div><!-- col R -->
            </div><!-- row main -->
            <hr>
          </div><!-- container -->

        </div><!-- card body -->
      </div><!-- card -->


      </div> <!-- end Completed Orders Section -->

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
          <br>
          <div class="row">
            <div class="col-lg-12">
              <a href="#" id='self' class="btn btn-primary serverNewOrder-btn">
                Take Order
              </a>
            </div><!-- col -->
          </div><!-- row 2 -->
        </div> <!-- container-->
      </div><!-- card body-->
    </div><!-- card -->
    `) // end left-bar

    $('#right-bar').html(`

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">EMPLOYEE ID # ${user.employee_id}</h5>
        </div><!-- card body-->
      </div><!-- card -->

      <br>

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Cash Out</h5>
          <div class="container-fluid lighter">
            <div class="row">
              <div class="col-lg-12">
                Cash Out Value
              </div><!-- col -->
            </div><!-- row 1 -->
          </div> <!-- container-->
        </div><!-- card body-->
      </div><!-- card -->

      <br>

      <div class="card">
        <div class="card-body">
        <h5 class="card-title">Tip Out</h5>
        <div class="container-fluid lighter">
          <div class="row">
              <div class="col-lg-12">
                Tip Out Value
              </div><!-- col -->
            </div><!-- row 1 -->
          </div> <!-- container-->
        </div><!-- card body-->
      </div><!-- card -->
    `)
  } // end loadServerDB

  click('#openOrder1-btn',  () => view("./js/customer.js"))
  click('#openOrder2-btn', () => view("./js/customer.js"))
  click('#completedOrder1-btn', () => view("./js/customer.js"))


  click('.serverNewOrder-btn', event => {

      const group = {
        group_size: 2 // default group size
      }
      const spinner = new Spinner("#groupSize", 2, 1, 20) // making a new spinner for input. Data can be accessed on the element param

      modal(
        `<h4 class="modal-title" style="text-align: center" color="black">
          Group Size
        </h4>`,
        `<h5> How big is this group?</h5>
          ${spinner.getHTML()}`,
          `<button type="button" class="btn btn-secondary" id="cancel-group" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary save-group">Start Order</button>`
      )
      spinner.loadCtrl()

      group.group_size = $('#groupSize').val()

      click('.save-group', () => {

        // modal loading
        $('.modal-body').html(`
        <h4>
          Creating a group of ${group.group_size}...
        </h4>`)
        $('.modal-footer').hide()

         // call backend to make a new group. res is the created group on db
        requestService('/customer', 'post', group, res => {
          $('.modal-footer').show() // shows the close button
          $('#cancel-group').click() // UI closes the modal by clicking the button instantaneously

          state('currentGroup', res.msg) // saves the group for later use)
          // res.msg = {customer_number: Number, group_size: Number}

        //  view('./js/customer.js') // switches to customer view. You can access the group now with state('currentGroup')


      click('.save-group', () => {

        // modal loading
        $('.modal-body').html(`
        <h4>
          Creating a group of ${group.group_size}...
        </h4>`)
        $('.modal-footer').hide()

         // call backend to make a new group. res is the created group on db
        requestService('/customer', 'post', group, res => {
          $('.modal-footer').show() // shows the close button
          $('#cancel-group').click() // UI closes the modal by clicking the button instantaneously

          state('currentGroup', res.msg) // saves the group for later use
          // res.msg = {customer_number: Number, group_size: Number}

          view('./js/customer.js') // switches to customer view. You can access the group now with state('currentGroup')

        })
      })

        })
      })
  }) // end click serverNewOrder-btn

  function set_open_orders_list() {
    $('.loader').show()
    
    const user = state('user');
    requestService('/empOrders', 'post', user, res => {
      console.log(res)
      console.log('res.msg[0]', res.msg[0]);
      let openOrders;
      state('openOrders', res.msg)
      loadServerDB();

    }) // end reuqestService

  } // end set_open_orders_list
} // end serverDashboard.js
