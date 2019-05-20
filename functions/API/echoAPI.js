/**
 * Just for testing
 */

const db = require('../db')// to be used on the endpoints

const echoAPI = {
    testEP(req, res, next) {
        // logic here
        console.log(req.body)
        
        // this errors out
        console.log(db.call())

        res.send({status: 200, msg: req.body.msg})
    }
}

module.exports = echoAPI