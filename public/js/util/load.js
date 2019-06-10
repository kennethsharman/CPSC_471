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