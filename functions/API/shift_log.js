const db = require('../db/db')
const shift_log_db = require('../db/shift_log')

const shift_log_api = {
  clock_in(req, res) {
    const clock_in_time = new Date()
    shift_log_json = {
      "employee_id": req.body.employee_id,
      "shift_date": clock_in_time,
      "time_in": clock_in_time,
      "time_out": null
    }
    db.query(shift_log_db.create(shift_log_json))
      .then(success => {
        res.send(success)
      }).catch(err => {
        res.send({msg: err, status: 500})
      })
  },

  clock_out(req, res) {
    const clock_out_time = new Date()
    db.query(shift_log_db.end_employee_current_shift(req.body.employee_id, clock_out_time))
      .then(success => {
        res.send(success)
      }).catch(err => {
        res.send({msg: err, status: 500})
      })
  },

  current_shift(req, res) {
    db.query(shift_log_db.employee_current_shift(req.params.employee_id))
      .then(success => {
        res.send(success)
      }).catch(err => {
        res.send({msg: err, status: 500})
      })
  },

  completed_shifts_for_employee(req, res) {
    console.log(req.params.employee_id)
    db.query(shift_log_db.employee_completed_shifts(req.params.employee_id))
      .then(success => {
        res.send(success)
      }).catch(err => {
        res.send({msg: err, status: 500})
      })
  }
}

module.exports = shift_log_api
