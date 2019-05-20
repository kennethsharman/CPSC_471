/**
 * Just for testing
 */
const echoAPI = {
    testEP(req, res, next) {
        // logic here
        console.log(req.body)
        
        res.send({status: 200, msg: req.body.msg})
    }
}

module.exports = echoAPI