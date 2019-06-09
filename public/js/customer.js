
// Customer Order View

{
  loadOrder();

  // Load Customer Order View Page
  function loadOrder() {

    $('#header-row').html(`
  <h3 class="header-title">
    <img id="header-logo" src="pics/logo1.png" alt="Company Logo"> 
    Fantasy Street Kitchen
  </h3>

    `) // end header-row

    $('#main-bar').html(`

      <div> <!-- Pasta Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          Pasta
        </h4>

        <table class="table table-dark">
          <tr>
            <th class="tg-s268">
              <img class="headerlogo" src="/pics/pasta2.jpg" alt="Pasta2">
            </th>
            <th class="tg-0lax">
              <div class="row">
                <div class="col-sm-8">
                  <h4 class="food-name">Mom's Spaghetti</h4>
                </div><!-- name col -->
                <div class="col-sm-4">
                  <a href="#" class="btn btn-primary food-action" id='spaghetti'>
                    <i class="fas fa-plus-square"></i> Add
                  </a>
                </div> <!-- action col -->
              </div><!--first row -->
              <br>
              <div class="row">
                <div class="col-12">
                  <p  class="food-desc">
                    Made with the best spaghetti sauce.<br> May contain allergens: wheat, milk, eggs, shellfish.
                  </p>
                </div> <!-- singleton col -->
              </div><!-- second row -->
            </th>
          </tr>
        </table>

        <table class="table table-dark">
          <tr>
            <th class="tg-s268">
              <img class="headerlogo" src="/pics/pasta1.jpeg" alt="Pasta1">
            </th>
            <th class="tg-0lax">
              <div class="row">
                <div class="col-sm-6">
                  <h4 class="food-name">Dad's Macaroni</h4>
                </div><!-- name col -->
                <div class="col-sm-6">
                  <a href="#" class="btn btn-primary food-action" id='macaroni'>
                    <i class="fas fa-plus-square"></i> Add
                  </a>
                </div> <!-- action col -->
              </div><!--first row -->
              <br>
              <div class="row">
                <div class="col-12">
                  <p class="food-desc">
                    Made with the best spaghetti sauce.<br> May contain allergens: wheat, milk, eggs, shellfish.
                  </p>
                </div> <!-- singleton col -->
              </div><!-- second row -->
            </th>
          </tr>
        </table>

      </div> <!-- end Pasta Section -->

      <br><br>

      <div> <!-- Drink Section -->

        <h4 style="display: inline-block; text-align: left; width: 100%">
          Drinks
        </h4>

        <table class="table table-dark">
          <tr>
            <th class="tg-s268">
              <img class="headerlogo" src="/pics/coke.jpg" alt="Drink1">
            </th>
            <th class="tg-0lax">
              <div class="row">
                <div class="col-sm-6">
                  <h4 class="food-name">Coca Cola</h4>
                </div><!-- name col -->
                <div class="col-sm-6">
                  <a href="#" class="btn btn-primary food-action" id='coke'>
                    <i class="fas fa-plus-square"></i> Add
                  </a>
                </div> <!-- action col -->
              </div><!--first row -->
              <br>
              <div class="row">
                <div class="col-12">
                  <p class="food-desc">
                    You're not you when you're thirsty.
                  </p>
                </div> <!-- singleton col -->
              </div><!-- second row -->
            </th>
          </tr>
        </table>

      </div> <!-- end Drinks Section -->

    `) // end main-bar

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
          Order Contents
        </h5>
        <div class="container-fluid lighter">
          <div class="row">
            <div class="col-lg-12">
              <table class="table table-dark" style="text-align: center">
                <tr>
                  <th>ABC</th>
                </tr>
                <tr>
                  <td>123</td>
                </tr>
                <tr>
                  <td>345 (No peanuts)</td>
                </tr>
              </table>
            </div><!-- col -->
          </div><!-- row -->
          </div> <!-- container-->
      </div><!-- card body-->
      <div class="card-footer">
        <a href="#" class="btn btn-primary" style="width:100%, height:100%" id='placeOrder-btn'>
          Place Order
      </a>
      </div>
    </div><!-- card -->

      <br><br><br>


    `) // end right-bar

  } // end loadOrder

    clickService('#employee-modal', () => modalService(
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

    clickService('#payment-modal', () => modalService(
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

    const employeeFNAME = 'KEN'

    clickService('.request-btn', () => modalService(
      `<h4>Server requested</h4>`,`
      <h5>${employeeFNAME} will be at your table shortly.</h5>`,`
      <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
    `))

    clickService('#paid-btn', () => modalService(
      `<h4>Payment complete</h4>`,
      `<h5>Thank you for visiting the Fantasy Street Kitchen.</h5>`,`
      <button type="button" class="btn btn-primary" id="reset-order-btn" data-dismiss="modal">OK</button>
    `))


    clickService('.food-action', () => {
      modalService(`
      <h4>Add to order</h4>`,`
      <h5 style="text-align: center">${event.target.id}</h5>
      <br>
      
      <br>
      <div class="input-group" style="width:100%">
        <span class="input-group-btn">
        <a href="#" class="btn btn-primary spin-btn" id="spinner-decrement">
          <i id="spinner-decrement-i" class="fas fa-minus-square"></i>
        </a>
        </span><!-- first button -->
        <input class="form-control spinner" id="spinner-num" type="text" placeholder="1" disabled>
        <span class="input-group-btn">
          <a href="#" class="btn btn-primary spin-btn" id="spinner-increment">
            <i  id="spinner-increment-i" class="fas fa-plus-square"></i>
          </a>
        </span><!-- second button-->
      </div><!-- number spinner -->
      <br>
      <div class="form-group">
        <label for="comment">Note (Optional):</label>
        <textarea class="form-control" rows="5" id="note"></textarea>
      </div>`, `
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      <button type="button" class="btn btn-primary" id="Add-order-btn" data-dismiss="modal">Add</button>
      `)

      // number spinner
      const num = $("#spinner-num")
      num.val(1)
      clickService('.spin-btn', ({target: {id}}) => {
        switch(id.substring(8,10)) {
          case 'in':
            if(num.val()<10)
              num.val(`${Number(num.val()) + 1}`)
          break;
          case 'de':
            if(num.val()>1)
              num.val(`${Number(num.val()) - 1}`)
          break;
        }
      })
    }); // end switch views button actions

} // end customer.js
