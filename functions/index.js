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
 // The Firebase Admin SDK to access Firebase Realtime Database
 const firebase = require("firebase-admin")
 // The Cloud Functions for Firebase SDK to create Cloud
 // Functions and setup triggers
 const functions = require('firebase-functions')
 // Parse incoming request bodies
 const bodyParser = require('body-parser')
 // Cross-Origin Resource Sharing (cors)
 const cors = require('cors')

 // local back end code
 // defined in API folder
 const echoAPI = require('./API/echoAPI')
 const validator = require('./API/validatorMW')

 // Initialize default app with the project configuration
 // functions.config returns config info object
 firebase.initializeApp(functions.config().firebase)

 const app = require('express')()
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: true}))
 app.use(cors())

 require('dotenv').config() // sets up the environment for DB

 // serving the client side
 app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))

// recieves back end post/get/put/delete
 app.post('/echo', validator.echoMW, echoAPI.testEP)

 // more endpoints go here



 exports.app = functions.https.onRequest(app)
