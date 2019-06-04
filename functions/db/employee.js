const db = require('./db')

const employee_db = {

  // Create a new employee record in the database.
  // Only JSON with attributes in query_string.values will be used.
  // No need to provide an employee_id, that is created by the database.
  create(employee_json) {
    const query_string = {
      text: "INSERT INTO employee (f_name, l_name, phone_number, address, cook_flag, station, server_flag, cash_out, tip_out, manager_flag, mgr_start_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;",
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
        employee_json.mgr_start_date
      ]
    }

    result = db.query(query_string)
    return result
  },

  // Find an employee record in the database that corresponds to the given id.
  find(employee_id) {
    const query_string = {
      text: "SELECT * FROM employee WHERE employee_id = $1;",
      values: [employee_id]
    }

    result = db.query(query_string)
    return result
  },

  // Updates an employee record in the database with values specified in employee_json.
  // If a value is null or not provided in employee_json, it will be set to null in the database.
  update(employee_json) {
    const query_string = {
      text: "UPDATE employee SET f_name = $1, l_name = $2, phone_number = $3, address = $4, cook_flag = $5, station = $6, server_flag = $7, cash_out = $8, tip_out = $9, manager_flag = $10, mgr_start_date = $11 WHERE employee_id = $12 RETURNING *;",
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
        employee_json.employee_id
      ]
    }

    result = db.query(query_string)
    return result
  },

  // Deletes an employee record from the database that corresponds
  delete(employee_id) {
    const query_string = {
      text: "DELETE FROM employee WHERE employee_id = $1 RETURNING *;",
      values: [employee_id]
    }

    result = db.query(query_string)
    return result
  }
}

module.exports = employee_db
