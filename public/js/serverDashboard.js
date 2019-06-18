
// Server Dashboard View

{
  let user = state('user');

  $("#main-bar").html('')
  $('.loader').show()  // update cashout attribute
  requestService('/cashout', 'post', user, res => {
    requestService(`/tipout/${user.employee_id}`, 'post', user, res => {
      console.log("TIP OUT", res)
      state('user', res.msg[0])
      user = state('user')

      set_orders_list();
    });
  });

  // update tipout attribute



  // Load Server Dashboard
  function loadServerDB() {
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
                ${("$" + (Math.ceil(user.cash_out*100)/100)) || "not available"}
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
                ${("$" + user.tip_out) || "Not available"}
              </div><!-- col -->
            </div><!-- row 1 -->
          </div> <!-- container-->
        </div><!-- card body-->
      </div><!-- card -->
    `)

  } // end loadServerDB

  function set_orders_list() {
    $("#main-bar").html('')

    requestService(`/order/${user.employee_id}/closed`, 'get', null, res => {
      state('closedOrders', res.msg)

      requestService(`/order/${user.employee_id}/open`, 'get', null, res => {
        state('openOrders', res.msg)
        $('.loader').hide()

        click('.order-btn', e => {
          $('.loader').show()
          $("#main-bar").html('')
          const ordNum = e.target.id.substring(6)
        

          requestService(`/order/${ordNum}`, 'get', null, res => {
            state('currentOrder', res.msg)
            $('.loader').hide()
            view('./js/customer.js')
          })
        })
    
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
              res.msg.reduce((prev, {order_number, customer_number, employee_id, start_time, order_date, price, ticket_time, completed_order, special_request}) => `
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
                                  <p>Total:  $<span>${Math.ceil(price*100)/100}</span></p>
                                </th>
                              </tr>
                            </table>
                          </div><!-- col L -->
                          <div class="col-4">
                          <a href="#" class="btn btn-primary order-btn" id="order-${order_number}">
                            Open Order
                          </a>
                          </div><!-- col R -->
                        </div><!-- row main -->
                        <hr>
                        </div><!-- container -->
                    </div><!-- card body -->
                  </div><!-- card -->
                </div> <!-- Open orders Section -->
    
                `,``)
              }
              <br>
              <div> <!-- Closed orders Section -->
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title order-heading">
                    Closed Orders for ${user.f_name}
                  </h4>
                  <hr>
                </div>
              </div>
            ${
              state('closedOrders').reduce((prev, {order_number, customer_number, employee_id, start_time, order_date, price, ticket_time, completed_order, special_request}) => `
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
                                  <p>Total:  $<span>${Math.ceil(price*100)/100}</span></p>
                                </th>
                              </tr>
                            </table>
                          </div><!-- col L -->
                          <div class="col-4">
                          <a href="#" class="btn btn-primary order-btn" id="order-${order_number}">
                            Open Order
                          </a>
                          </div><!-- col R -->
                        </div><!-- row main -->
                        <hr>
                        </div><!-- container -->
                    </div><!-- card body -->
                  </div><!-- card -->
                </div> <!-- Closed orders Section -->
    
                `,``)
              }`)
        loadServerDB()
      })
    })

  } // end set_orders_list
// end requestService

} // end serverDashboard.js
