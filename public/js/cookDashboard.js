
// Cook Dashboard View

{
  const user = state('user')
  let openItems;
  set_items_list();
  loadCookDB();

  // Load Cook Dashboard
  function loadCookDB() {

    $('#header-row').html(`
    <h3 class="header-title">
      <img id="header-logo" src="pics/logo1.png" alt="Company Logo">
      Cook Dashboard
    </h3>
    `) // end header-row

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
    } // end loadCookDB


  function set_items_list() {
    $('.loader').show()
    $('#main-bar').html('')
    requestService('/openItems', 'post', user, res => {
      state('openItems', res.msg)
      console.log("FIRST: ", res.msg[0]);
      $('.loader').hide()

      $('#main-bar').html(`
        <div> <!-- Open Items Section -->
        <div class="card">
          <div class="card-body">
            <h4 class="card-title order-heading">
              Open Food Items
            </h4>
          </div>
        </div>
        ${
          res.msg.reduce((prev, {order_number, item_number, food_name, station, quantity}) => `
              ${prev}
                      <div class="card">
                        <div class="card-body">
                          <div class="container-fluid">
                            <div class="row">
                              <div class="col-12">
                                <h5 style="text-align:left"> Order #${order_number}: ${food_name} </h5>
                              </div>
                            </div><!-- top row -->
                            <div class="row">
                              <div class="col-8">
                                <table class="table table-dark">
                                  <tr>
                                    <th class="tg-0lax">
                                      <p>Quantity:<span> ${quantity}</span></p>
                            
                                    </th>
                                    <th class="tg-s268">
                                      <p>Station: <span>${station}</span></p>
                                    </th>
                                  </tr>
                                  <tr>
                                  <!-- no note left -->
                                  </tr>
                                </table>
                              </div><!-- col L -->
                              <div class="col-4">
                                <a href="#" class="btn btn-primary order-btn" onclick="selectOrder(${order_number}, ${item_number})">
                                  BUMP
                                </a>
                                <script>
                                function selectOrder(ordNum, itmNo) {
                                  $('.order-btn').html('bumping order...')
                                  const order_obj = {
                                    order_number: ordNum,
                                    item_number: itmNo
                                  }
                                  requestService('/bumpOrder/${order_number}', 'post', order_obj, res => {
                                    console.log('DONE BUMP QUERY', res.msg[0]);
                                    view('./js/cookDashboard.js')
                                  })
                                }
                                </script>
                            </div><!-- col R -->
                          </div><!-- row main -->
                          <hr>
                        </div><!-- container -->
                      </div><!-- card body -->
                    </div><!-- card -->
                  </div> <!-- end Open Items Section -->
                `,``)
              }
          `) // end main-bar

        }) // end requestService

    loadCookDB();
  } // end set_orders_list

} // end cookDashboard.js
