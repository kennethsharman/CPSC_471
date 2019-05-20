/**
 * The back end code goes here.
 * 
 * Mostly, this is the API chains go here
 * It passes through middleware (MW) and endpoint (EP)
 * functions and sends a resonse back to the front end
 * using ExpressJS
 */

 // imports. Anything not local should be in package.json

// firebase
 const firebase = require("firebase-admin")
 const functions = require('firebase-functions')
 const bodyParser = require('body-parser')
 const cors = require('cors')

 // local back end code
 const echoAPI = require('./API/echoAPI')
 const validator = require('./API/validatorMW')

 firebase.initializeApp(functions.config().firebase)

 const app = require('express')()
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: true}))
 app.use(cors())

 require('dotenv').config() // sets up the environment for DB
 const db = require('./db')// to be used on the endpoints
  
 // serving the index.html file
 app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

// recieves back end post/get/put/delete
 app.post('/echo', validator.echoMW, echoAPI.testEP)

 // more endpoints go here


 exports.app = functions.https.onRequest(app)
