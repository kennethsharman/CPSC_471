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

 const db = require('./db/db')
 const employee = require('./db/employee')
 const customer = require('./db/customer')
 const customer_order = require('./db/customer_order')
 const inventory = require('./db/takes_inventory')
 const item = require('./db/item')

 const shift_log_api = require('./API/shift_log')
 const item_api = require('./API/item')

// argument in body - use when passing a JSON
const bodyAPI = (qString, pass) => (req, res, next) => new Promise((resolve, reject) => {
    db.query(qString(req.body)).then(success => {
        req.body = success
        if(pass) next()
        else res.send({msg: success, status: 200})
    }).catch(err => {
        res.send({msg: err, status: 500})
    })
 })

// argument right on the URL- use when passing just a string or a number
const paramsAPI = (qString, pass) => (req, res, next) => new Promise((resolve, reject) => {
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

// employee
app.post('/user', bodyAPI(employee.create))
app.get('/user/:id', paramsAPI(employee.find))
app.put('/user', bodyAPI(employee.update))
app.delete('/user/:id', paramsAPI(employee.delete))


app.post('/user/byEmail', employee.findEmail)
app.get('/user', bodyAPI(employee.findAll))

// shift log
app.get('/shift/:employee_id/current', (req, res) => shift_log_api.current_shift(req, res))
app.get('/shift/:employee_id/completed', (req, res) => shift_log_api.completed_shifts_for_employee(req, res))
app.post('/shift/', (req, res) => shift_log_api.clock_in(req, res))
app.post('/shift/end', (req, res) => shift_log_api.clock_out(req, res))

// item
app.get('/item/outofstock', (req, res) => item_api.out_of_stock_items(req, res))

// customer
app.post('/customer', bodyAPI(customer.create))

// inventory - check managerDashboard.js
app.post('/inventory', bodyAPI(inventory.create, true), inventory.makeIngredients)
app.post('/inventory/history', bodyAPI(inventory.find))

// get foods
app.get('/menu', item.menu)
app.get('/menu/:id', item.menuItem)

// customer_order
app.post('/customerOrder', bodyAPI(customer_order.create))
app.post('/order', item.placeOrder)


app.post('/cashout', bodyAPI(customer_order.cashout))
app.post('/tipout/:id', bodyAPI(customer_order.tipout, true), paramsAPI(employee.find)) // get user after

app.post('/openItems', bodyAPI(customer_order.openItems))
app.post('/bumpOrder/:id', bodyAPI(customer_order.bumpOrder, true), customer_order.checkIfComplete)

app.get('/order/:id', paramsAPI(customer_order.find))
app.get('/order/:id/contents', paramsAPI(customer_order.findContents))
app.get('/order/:id/open', paramsAPI(customer_order.findOpenOrdersEmp))
app.get('/order/:id/closed', paramsAPI(customer_order.findClosedOrdersEmp))

exports.app = functions.https.onRequest(app)
