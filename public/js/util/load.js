const loadService = url => {
    $.getScript(url).then(function () {
    }, function(err){
      alert('ERROR:' + JSON.stringify(err));
    });
}

const clickService = (query, callback) => {
    $(document).on('click', query, callback)
}

const modalService = (head, body, foot) => {
  $('.modal-header').html(head)
  $('.modal-body').html(body)
  $('.modal-footer').html(foot)
  $('#modal-container').modal() 
}

const loginService = () => {
  clickService('.logout', e => {
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
    if(user) {
      $('#main-bar').html(`
      <div class="card">
        <div class="card-body">
          <h2>Welcome to Fantasy Street Kitchen</h2>
          <h5> Logging in as <strong>${user.displayName}</strong></h5>
        </div>
      </div>`)
      requestService("/user/byEmail", "POST", user, res => {
        state('user', res.msg[0])
        
        console.log("user state service", state('user'))
        $('.loader').hide()
        loadService("./js/adminView.js")
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
    $('#main-bar').html(`
      <div id="firebaseui-auth-container"></div>
    `)

  }
}