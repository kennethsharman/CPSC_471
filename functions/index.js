 // firebase
 const firebase = require("firebase-admin")
 const functions = require('firebase-functions')
 const bodyParser = require('body-parser')
 const cors = require('cors')
 firebase.initializeApp(functions.config().firebase)

 const app = require('express')()
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended: true}))
 app.use(cors())

 const db = require('./db')// to be used on the endpoints
  
 // serving the client side
 app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))


//  app.post('/endpoint here', )
 
 
 exports.app = functions.https.onRequest(app)