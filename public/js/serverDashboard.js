
// Server Dashboard View

{
  const user = state('user')

  // update cashout attribute
  requestService('/cashout', 'post', user, res => {
    //state('updatedCashout', res.msg)
    $(`.loader-container`).hide()
  });

  // update tipout attribute
  requestService('/tipout', 'post', user, res => {
    //state('updatedtipout', res.msg)
    $(`.loader-container`).hide()
  });

  let openOrders;
  set_orders_list();


  // Load Server Dashboard
  function loadServerDB() {
    openOrders= state('openOrders')

    $('#header-row').html(`
      <h3 class="header-title">
        <img id="header-logo" src="pics/logo1.png" alt="Company Logo">
        Server Dashboard
      </h3>
    `)

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
                $${user.cash_out}
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
                $${user.tip_out}
              </div><!-- col -->
            </div><!-- row 1 -->
          </div> <!-- container-->
        </div><!-- card body-->
      </div><!-- card -->
    `)

  } // end loadServerDB

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

      let currentCust
      let newCustNo
      group.group_size = $('#groupSize').val()
        click('.save-group', () => {
          // modal loading
          $('.modal-body').html(`
          <h4>
            Creating a group of ${group.group_size}...
          </h4>`)
          $('.modal-footer').hide()

          // call backend to make a new customer
          requestService('/customer', 'get', group, res => {
          $('.modal-footer').show()
          $('#cancel-group').click() // UI closes the modal by clicking the button instantaneously
          state('currentCust', res.msg)
          currentCust = state('currentCust')
          newCustNo = currentCust[0].customer_number
          const order1 = {
            customer_number: newCustNo,
            employee_id: user.employee_id,
            start_time: null,
            order_date: null,
            price: 0,
            ticket_time: null,
            completed_flag: false
          }

          // call backend to make a new customer_order
          requestService('/customerOrder', 'post', order1, res => {
          $('.modal-footer').show() // shows the close button
          $('#cancel-group').click() // UI closes the modal by clicking the button instantaneously

          state('currentOrder', res.msg) // saves the group for later use
            currentOrder = state('currentOrder')
            view('./js/customer.js') // switches to customer view. You can access the group now with state('currentGroup')
          })
        })
      })
  }) // end click serverNewOrder-btn

  function set_orders_list() {
    $('.loader').show()
    requestService('/openOrders', 'post', user, res => {
      state('openOrders', res.msg)
      $('.loader').hide()

      $('#main-bar').html(`
        <div> <!-- Open orders Section -->
          <div class="card">
            <div class="card-body">
              <h4 class="card-title order-heading">
                Open Orders for ${user.f_name}
              </h4>
              <hr>
            </div>
          </div>
        ${
          res.msg.reduce((prev, {order_number, customer_number, employee_id, start_time, order_date, price, ticket_time, completed_flag, special_request}) => `
          ${prev}
            <div class="card">
              <div class="card-body">
                <div id="open-orders-card" class="card-text">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-8">
                        <table class="table table-dark">
                          <tr>
                            <th class="tg-0lax">
                              <p>Order #<span>${order_number}</span></p>
                              <p><span>${new Date(order_date).toDateString()}</span></p>
                            </th>
                            <th class="tg-s268">
                              <p>Customer #<span>${customer_number}</span></p>
                              <p>Total:  $<span>${price}</span></p>
                            </th>
                          </tr>
                        </table>
                      </div><!-- col L -->
                      <div class="col-4">
                      <a href="#" class="btn btn-primary order-btn" onclick="selectOrder(${order_number})">
                        Open Order
                      </a>
                      <script>
                        function selectOrder(ordNum) {
                          const order_obj = {
                            order_number: ordNum
                          }

                          requestService('/order', 'post', order_obj, res => {
                            state('currentOrder', res.msg)
                            view('./js/customer.js')
                          })
                        }
                      </script>
                      </div><!-- col R -->
                    </div><!-- row main -->
                    <hr>
                    </div><!-- container -->
                </div><!-- card body -->
              </div><!-- card -->
            </div> <!-- Open orders Section -->

            `,``)
          }
      `) // end main-bar

    }) // end requestService

    loadServerDB();
  } // end set_orders_list

} // end serverDashboard.js
