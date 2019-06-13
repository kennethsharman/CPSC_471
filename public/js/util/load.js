const view = url => {
    $.getScript(url).then(function () {
    }, function(err){
      alert('ERROR:' + JSON.stringify(err));
    });
}

const click = (query, callback) => {
  if(callback==undefined) $(document).off('click', query)
  $(document).off('click', query).on('click', query, callback)
}

const modal = (head, body, foot) => {
  $('.modal-header').html(head)
  $('.modal-body').html(body)
  $('.modal-footer').html(foot)
  $('#modal-container').modal() 
}

const loginService = () => {
  click('.logout', e => {
    e.preventDefault()
    firebase.auth().signOut().then( () => {
      location.reload()
    })
  })

  const auth = firebase.auth()
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)

  let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
  ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => false,
    },
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  })

  auth.onAuthStateChanged(user => {
    $('.loader').show()
    $('#firebaseui-auth-container').hide()
    if(user) {
      $('#header-row').html('')
      $('#main-bar').html(`
      <div class="card">
        <div class="card-body">
          <h2>Welcome to Fantasy Street Kitchen</h2>
          <h5> Logging in as <strong>${user.displayName}</strong></h5>
        </div>
      </div>`)
      requestService("/user/byEmail", "POST", user, res => {
        state('user', res.msg[0])
        
        $('.loader').hide()
        view("./js/adminView.js")
      },() => {
        console.log("ERRROR")
      })
    } else loadLogin()
  })

  function loadLogin() {
    $('.loader').hide()
    $('#header-row').html(`
      <div style="padding:24px;margin:12px;">
        <img id="login_img" src="pics/The_Fantasy_Street_Kitchen.png" alt="Company Logo" height="200px">
      </div>
    `)
    $('#firebaseui-auth-container').show()
  }
}

class Spinner {
  constructor(element, defaultNum = 1, lowBound = 1, highBound = 10) {
    this.element = element
    this.defaultNum = defaultNum
    this.lowBound = lowBound
    this.highBound = highBound
  }

  loadCtrl() {
    const num = $(this.element)
    num.val(this.defaultNum)
    click('.spin-btn', ({target: {id}}) => {
      switch(id.substring(8,10)) {
        case 'in':
          if(num.val()<this.highBound)
            num.val(`${Number(num.val()) + 1}`)
        break;
        case 'de':
          if(num.val()>this.lowBound)
            num.val(`${Number(num.val()) - 1}`)
        break;
      }
    })
  }

  getHTML() {
    return `<div class="input-group" style="width:100%">
    <span class="input-group-btn">
    <a href="#" class="btn btn-primary spin-btn" id="spinner-decrement">
      <i id="spinner-decrement-i" class="fas fa-minus-square"></i>
    </a>
    </span><!-- first button -->
    <input class="form-control spinner" id="${this.element.substring(1)}" type="text" placeholder="${this.defaultNum}" disabled>
    <span class="input-group-btn">
      <a href="#" class="btn btn-primary spin-btn" id="spinner-increment">
        <i  id="spinner-increment-i" class="fas fa-plus-square"></i>
      </a>
    </span><!-- second button-->
  </div><!-- number spinner -->`
  }
}