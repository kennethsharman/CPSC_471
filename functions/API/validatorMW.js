// if we're doing validation, we can do it here

const validatorMW = {
    echo(req, res, next) {
        if(typeof(req.body.msg)=='string') {
            next()
        } else {
            res.send({status: 400, msg: "stuff went wrong"})
        }
    }
}

module.exports = validatorMW