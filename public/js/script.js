
// Login View

{ // local scope
    loadLogin() // landing page is login

    // Load Login Page
    function loadLogin() {
      $('#header-row').html(`
        <div style="padding:24px;margin:12px;">
          <img id="login_img" src="pics/The_Fantasy_Street_Kitchen.png" alt="Company Logo" height="200px">
        </div>
      `)
      $('#main-bar').html(`
        <div id="firebaseui-auth-container"></div>
      `)

    } // end loadLogin


    $(document).on('click', '.logout', e => {
      e.preventDefault()
      firebase.auth().signOut().then( () => {
        location.reload()
      })
    })

    const auth = firebase.auth()
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
        $.getScript("./js/adminView.js").then(function () {
        }, function(err){
          alert('ERROR:' + JSON.stringify(err));
        }); // end getScript

      } else {
          loadLogin()
        }
    })

} // end script.js
