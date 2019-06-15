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

 const db = require('./db/db')
 const employee = require('./db/employee')
 const customer = require('./db/customer')
 const inventory = require('./db/takes_inventory')

// argument in body - use when passing a JSON
const bodyAPI = (qString, pass) => (req, res, next) => new Promise((resolve, reject) => {
    db.query(qString(req.body)).then(success => {
        req.body = success
        if(pass) next()
        else res.send({msg: success, status: 200})
    }).catch(err => {
        res.send({msg: err, status: 404})
    })
 })

// argument right on the URL- use when passing just a string or a number
const paramsAPI = qString => (req, res, next) => new Promise((resolve, reject) => {
   db.query(qString(req.params.id)).then(success => {
        if(pass) next()
        else res.send({msg: success, status: 200})
   }).catch(err => {
       res.send({msg: err, status: 404})
   })
})

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

// employee
app.post('/user', bodyAPI(employee.create))
app.get('/user/:id', paramsAPI(employee.find))
app.put('/user', bodyAPI(employee.update))
app.delete('/user/:id', paramsAPI(employee.delete))

app.post('/user/byEmail', employee.findEmail)
app.get('/user', bodyAPI(employee.findAll))

// customer
app.post('/customer', bodyAPI(customer.create))

// inventory - check managerDashboard.js
app.post('/inventory', bodyAPI(inventory.create, true), inventory.makeIngredients)
app.post('/inventory/history', bodyAPI(inventory.find))

exports.app = functions.https.onRequest(app)
