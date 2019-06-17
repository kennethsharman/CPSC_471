const db = require('./db')

const employee_db = {

  // Create a new employee record in the database.
  // Only JSON with attributes in query_string.values will be used.
  // No need to provide an employee_id, that is created by the database.
  create(employee_json) {
    const query_string = {
      text: "INSERT INTO employee (f_name, l_name, phone_number, address, cook_flag, station, server_flag, cash_out, tip_out, manager_flag, mgr_start_date, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;",
      values: [
        employee_json.f_name,
        employee_json.l_name,
        employee_json.phone_number,
        employee_json.address,
        employee_json.cook_flag,
        employee_json.station,
        employee_json.server_flag,
        employee_json.cash_out,
        employee_json.tip_out,
        employee_json.manager_flag,
        employee_json.mgr_start_date,
        employee_json.email
      ]
    }

    return query_string
  },

  // Find an employee record in the database that corresponds to the given id.
  find(employee_id) {
    const query_string = {
      text: "SELECT * FROM employee WHERE employee_id = $1;",
      values: [employee_id]
    }

    return query_string
  },

  findAll() {
    const query_string = {
      text: "SELECT * FROM employee;",
    }

    return query_string
  },

  // Updates an employee record in the database with values specified in employee_json.
  // If a value is null or not provided in employee_json, it will be set to null in the database.
  update(employee_json) {
    const query_string = {
      text: "UPDATE employee SET f_name = $1, l_name = $2, phone_number = $3, address = $4, cook_flag = $5, station = $6, server_flag = $7, cash_out = $8, tip_out = $9, manager_flag = $10, mgr_start_date = $11, email = $13 WHERE employee_id = $12 RETURNING *;",
      values: [
        employee_json.f_name,
        employee_json.l_name,
        employee_json.phone_number,
        employee_json.address,
        employee_json.cook_flag,
        employee_json.station,
        employee_json.server_flag,
        employee_json.cash_out,
        employee_json.tip_out,
        employee_json.manager_flag,
        employee_json.mgr_start_date,
        employee_json.employee_id,
        employee_json.email
      ]
    }

    return query_string
  },

  // Deletes an employee record from the database that corresponds
  delete(employee_id) {
    const query_string = {
      text: "DELETE FROM employee WHERE employee_id = $1 RETURNING *;",
      values: [employee_id]
    }

    return query_string
  },

  findEmail(req, res, next) {
    db.query({
        text: "SELECT * FROM employee WHERE email = $1;",
        values: [req.body.email]
      }).then(success => {
        console.log("SUCCESS", success)
        console.log(success.length)
        switch(success.length) {
            // you need a new person
          case 0:
              console.log("NEW PERSON")
              db.query(employee_db.create({
                f_name: req.body.displayName,
                l_name: null,
                phone_number: null,
                address: null,
                cook_flag: true,
                station: null,
                server_flag: true,
                cash_out: null,
                tip_out: null,
                manager_flag: false,
                mgr_start_date: null,
                email: req.body.email
            })).then(success => {
              console.log("MADE NEW PERSON")
              res.send({msg: success, status: 200})
            }).catch(err => {
              res.send({msg: err, status: 404})
            })
          break

            // you're good
          case 1:
            console.log("OLD PERSON")
            res.send({msg: success, status: 200})
            // this should never happen
          // default:
        }
    }).catch(err => {
      res.send({msg: err, status: 404})
    })

  }
}

module.exports = employee_db
