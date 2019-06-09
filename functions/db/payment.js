const db = require('./db')

const payment_db = {
  create(payment_json) {
    const query_string = {
      text: "INSERT INTO payment (order_number, customer_number, employee_id, payment_time, payment_method, total_payment) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      values: [
        payment_json.order_number,
        payment_json.customer_number,
        payment_json.employee_id,
        payment_json.payment_time,
        payment_json.payment_method,
        payment_json.total_payment
      ]
    }

    return db.query(query_string)
  },

  find(order_number) {
    const query_string = {
      text: "SELECT * FROM payment WHERE order_number = $1;",
      values: [order_number]
    }

    return db.query(query_string)
  },

  update(payment_json) {
    const query_string = {
      text: "UPDATE payment SET customer_number = $1 AND employee_id = $2 AND payment_time = $3 AND payment_method = $4 AND total_payment = $5 WHERE order_number = $6 RETURNING *;",
      values: [
        payment_json.customer_number,
        payment_json.employee_id,
        payment_json.payment_time,
        payment_json.payment_method,
        payment_json.total_payment,
        payment_json.order_number
      ]
    }

    return db.query(query_string)
  },

  delete(order_number) {
    const query_string = {
      text: "DELETE FROM payment WHERE order_number = $1 RETURNING *;",
      values: [order_number]
    }

    return db.query(query_string)
  }
}

module.exports = payment_db
