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
 const customer_order = require('./db/customer_order')

 const API = qString => (req, res, next) => new Promise((resolve, reject) => {
    db.query(qString(req.body)).then(success => {
        res.send({msg: success, status: 200})
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
app.post('/user', API(employee.create))
app.get('/user', API(employee.find))
app.put('/user', API(employee.update))
app.delete('/user', API(employee.delete))
app.post('/user/byEmail', employee.findEmail)

// customer
app.post('/customer', API(customer.create))

// customer_order
app.post('/order', API(customer_order.find))
app.post('/openOrders', API(customer_order.findOpenOrdersEmp))
app.post('/closedOrders', API(customer_order.findClosedOrdersEmp))

exports.app = functions.https.onRequest(app)
