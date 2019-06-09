const loadService = url => {
    $.getScript(url).then(function () {
    }, function(err){
      alert('ERROR:' + JSON.stringify(err));
    });
}

const clickService = (query, callback) => {
    clickService(query, callback)
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
    if(user) {
      loadService("./js/adminView.js")

    } else loadLogin()
  })
}