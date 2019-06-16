
// Customer Order View

{
  const currentOrder = state('currentOrder')[0]
  loadOrder();

  // Load Customer Order View Page
  function loadOrder() {

    $('#header-row').html(`
  <h3 class="header-title">
    <img id="header-logo" src="pics/logo1.png" alt="Company Logo">
    Fantasy Street Kitchen
  </h3>

    `) // end header-row
    $('.loader').show()
    state('orders', [])

    const getTables = (foodArray, foodType) => foodArray.reduce((prev, {item_number, food_name, out_of_stock_flag, description}) => {
      return out_of_stock_flag?prev:`${prev}
      <table class="table table-dark">
      <tr>
        <th class="tg-s268">
          <img class="headerlogo" src="/pics/pasta2.jpg" alt="Pasta2">
        </th>
        <th class="tg-0lax">
          <div class="row">
            <div class="col-sm-8">
              <h4 class="food-name">${food_name}</h4>
            </div><!-- name col -->
            <div class="col-sm-4">
              <a href="#" class="btn btn-primary food-action" id='food-${item_number}'>
                <i class="fas fa-plus-square"></i> Add
              </a>
            </div> <!-- action col -->
          </div><!--first row -->
          <br>
          <div class="row">
            <div class="col-12">
              <p  class="food-desc">
                ${description}
              </p>
            </div> <!-- singleton col -->
          </div><!-- second row -->
        </th>
      </tr>
    </table>`, `<div> <!-- ${foodType} Section -->
      <h4 style="display: inline-block; text-align: left; width: 100%">
        ${foodType}
      </h4>
    `}) + `</div> <!-- end ${foodType} Section --><br><br>`

    requestService(`/menu`, "get", null, ({msg}) => {
      $('.loader').hide()
      $('#main-bar').html(msg.reduce((prev, curr) => {`${prev}${getTables(curr.array, curr.name)}`}), '') // end main-bar
    })


    $('#left-bar').html(`
      <div class="card">
        <div class="card-body">
          <div class="container-fluid lighter">
          <div class="row">
              <div class="col-lg-12">
                <a href="#" class="btn btn-primary" id='payment-modal'>
                  Make payment
                </a>
              </div><!-- col -->
            </div><!-- row 1 -->
            <br>
            <div class="row">
              <div class="col-lg-12">
                <a href="#" class="btn btn-primary request-btn">Ask for a server</a>
              </div><!-- col -->
            </div><!-- row 2 -->
          </div> <!-- container-->
        </div><!-- card body-->
          <a href="#" id="employee-modal">Employee Access Mode</a>
        </div><!-- card -->

    `) // end left-bar

    $('#right-bar').html(`
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          Order ${currentOrder.order_number} Contents
        </h5>
        <div class="container-fluid lighter">
          <div class="row">
            <div class="col-lg-12">
              <table class="table table-dark" style="text-align: center">
              <div id="order-table">
              </div>
              </table>
            </div><!-- col -->
          </div><!-- row -->
          </div> <!-- container-->
      </div><!-- card body-->
      <div class="card-footer">
        <div id="place-order-container">
        </div>
      </div>
    </div><!-- card -->

      <br><br><br>


    `) // end right-bar

  } // end loadOrder

    click('#employee-modal', () => modal(
        `<h4 class="modal-title" style="text-align: center" color="black">
          Access Employee View
        </h4>`,
        `<h5> To continue, please enter your password:</h5>
          <div class="form-group">
            <input type="password" class="form-control" id="pwd">
          </div>`,
          `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id="switchviews-btn" data-dismiss="modal">Continue</button>`
    ))

    click('#payment-modal', () => modal(
      `<h4 class="modal-title" style="text-align: center" color="black">
        Make Payment
      </h4>`,`
      <h5  style="text-align: center"> To continue, please enter your Paypal account:</h5>
      <div class="form-group">
      <input type="email" class="form-control" id="email">
      </div>
      <h5  style="text-align: center"> Or ask for a server to pay in cash or credit.</h5>`,
      `<button type="button" class="btn btn-primary mr-auto request-btn" style="color: white">
        Ask for a server
      </button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary" id="paid-btn">Continue</button>`
  ))


  click('.request-btn', () => modal(
      `<h4>Server requested</h4>`,`
      <h5>${state('user').f_name} will be at your table shortly.</h5>`,`
      <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
    `))

    click('#paid-btn', () => modal(
      `<h4>Payment complete</h4>`,
      `<h5>Thank you for visiting the Fantasy Street Kitchen.</h5>`,`
      <button type="button" class="btn btn-primary" id="reset-order-btn" data-dismiss="modal">OK</button>
    `))

    const spinner = new Spinner("#orderQuantity")
    click('.food-action', () => {
      modal(``,`Loading food item...`, ``)

      requestService(`/menu/${event.target.id.substring(5)}`, 'get', null, res => {
        const name = res.msg[0].food_name
        modal(`
          <h4>Add to order</h4>`,`
          <h5 style="text-align: center">${name}</h5>
          <br>

          <br>
          ${spinner.getHTML()}
          <br>
          <div class="form-group">
            <label for="comment">Note (Optional):</label>
            <textarea class="form-control" rows="5" id="note"></textarea>
          </div>`, `
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="add-order-btn" data-dismiss="modal">
          <i class="fas fa-plus-square"></i> 
            Add
          </button>
        `)
        spinner.loadCtrl()

        click('.add-order-btn', () => {
          const ordersArr = state('orders')
          const order = {food: res.msg[0], quantity: $('#orderQuantity').val(), note: $('#note').val(), orderNum: state('customer-order')} // not sure about this orderNum thing
          ordersArr.push(order)

          // first order? display the button
          if(ordersArr.length==1) $("#place-order-container").html(`
            <a href="#" class="btn btn-primary" style="width:100%, height:100%" id='placeOrder-btn'>
              Place Order
          </a>`)

          $("#order-table").append(`
            <tr>
              <th>${order.food.name}</th>
            </tr>
            ${
              order.quantity!=1?
              `<tr>
                <td>${order.quantity}</td>
              </tr>`
              :""
            } ${
              order.quantity!=''?
              `<tr>
                <td>${order.note}</td>
              </tr>`
              :""
            }
          `)
          modal().toggle()
        })
      })
    })

    click('#placeOrder-btn', () => {
      modal(``, `Placing order...`, ``)
      requestService(`/order`, "POST", state('order'), () => {
        modal(`
        <h4 class="modal-title" style="text-align: center" color="black">
          Order complete
        </h4>`, '<h4>Your order has been placed.</h4>',
        `<button type="button" class="btn btn-primary" id="reset-order-btn" data-dismiss="modal">OK</button>`)
        $('#place-order-container').html(`
          <h5>Order will be served shortly</h5>
        `)
      })
    })

} // end customer.js
