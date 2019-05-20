 // firebase
 const firebase = require("firebase-admin")
 const functions = require('firebase-functions')
 const bodyParser = require('body-parser')
 const cors = require('cors')

 // back end code
 const echoAPI = require('./API/echoAPI')
 const validator = require('./API/validatorMW')

 require('dotenv').config()
 firebase.initializeApp(functions.config().firebase)

 const app = require('express')()
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: true}))
 app.use(cors())

 const db = require('./db')// to be used on the endpoints
  
 // serving the client side
 app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

// recieves back end post/get/put/delete
 app.post('/echo', validator.echo, echoAPI.test)


 exports.app = functions.https.onRequest(app)
