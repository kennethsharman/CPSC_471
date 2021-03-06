const shift_log_db = {
  create(shift_log_json) {
    const query_string = {
      text: "INSERT INTO shift_log (employee_id, shift_date, time_in, time_out) VALUES ($1, $2, $3, $4) RETURNING *;",
      values: [
        shift_log_json.employee_id,
        shift_log_json.shift_date,
        shift_log_json.time_in,
        shift_log_json.time_out
      ]
    }

    return query_string
  },

  find(employee_id, shift_date, time_in) {
    const query_string = {
      text: "SELECT * FROM shift_log WHERE employee_id = $1 AND shift_date = $2 AND time_in = $3;",
      values: [employee_id, shift_date, time_in]
    }

    return query_string
  },

  update(shift_log_json) {
    const query_string = {
      text: "UPDATE shift_log SET time_out = $1 WHERE employee_id = $2 AND shift_date = $3 AND time_in = $4;",
      values: [
        shift_log_json.time_out,
        shift_log_json.employee_id,
        shift_log_json.shift_date,
        shift_log_json.time_in
      ]
    }

    return query_string
  },

  delete(employee_id, shift_date, time_in) {
    const query_string = {
      text: "DELETE FROM shift_log WHERE employee_id = $1 AND shift_date = $2 AND time_in = $3 RETURNING *;",
      values: [employee_id, shift_date,time_in]
    }

    return query_string
  },

  employee_current_shift(employee_id) {
    const query_string = {
      text: "SELECT * FROM shift_log WHERE employee_id = $1 AND time_out IS NULL;",
      values: [employee_id]
    }
    return query_string
  },

  end_employee_current_shift(employee_id, clock_out_time) {
    const query_string = {
      text: "UPDATE shift_log SET time_out = $1 WHERE employee_id = $2 AND time_out IS NULL RETURNING *;",
      values: [clock_out_time, employee_id]
    }

    return query_string
  },

  employee_completed_shifts(employee_id) {
    const query_string = {
      text: "SELECT * FROM shift_log WHERE employee_id = $1 AND time_out IS NOT NULL;",
      values: [employee_id]
    }

    return query_string
  }
}

module.exports = shift_log_db
