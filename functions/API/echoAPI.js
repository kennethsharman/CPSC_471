/**
 * Just for testing
 */

const employee_db = require('../db/employee')// to be used on the endpoints

const echoAPI = {
    testEP(req, res, next) {
        // logic here
        console.log(req.body)

        employee_json = {
            "employee_id": 1,
            "f_name": "Vincent",
            "l_name": "Adultman",
            "phone_number": "1234",
            "address": "1234 test st",
            "cook_flag": false,
            "station": null,
            "server_flag": false,
            "cash_out": null,
            "tip_out": null,
            "manager_flag": true,
            "mgr_start_date": new Date()
        }

        // result = employee_db.update(employee_json)
        result = employee_db.find(1)
        // result = employee_db.delete(1)
        // result = employee_db.create(employee_json)
        console.log(result)

        res.send({status: 200, msg: result})
    }
}

module.exports = echoAPI
