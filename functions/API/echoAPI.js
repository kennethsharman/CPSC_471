/**
 * Just for testing
 */

const db = require('../db')// to be used on the endpoints

const echoAPI = {
    testEP(req, res, next) {
        // logic here
        console.log(req.body)

        client = db.call()

        client.connect();
        client.query('SELECT * FROM test_table;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
        });

        res.send({status: 200, msg: req.body.msg})
    }
}

module.exports = echoAPI
