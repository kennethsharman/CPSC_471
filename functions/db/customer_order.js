const db = require('./db')

const customer_order_db = {
  create(customer_order_json) {
    const query_string = {
      text: "INSERT INTO customer_order (customer_number, employee_id, start_time, order_date, price, ticket_time, completed_flag) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      values: [
        customer_order_json.customer_number,
        customer_order_json.employee_id,
        customer_order_json.start_time,
        customer_order_json.order_date,
        customer_order_json.price,
        customer_order_json.ticket_time,
        customer_order_json.completed_flag
      ]
    }

    return db.query(query_string)
  },

  find(order_number) {
    const query_string = {
      text: "SELECT * FROM customer_order WHERE order_number = $1;",
      values: [order_number]
    }

    return db.query(query_string)
  },

  update(customer_order_json) {
    const query_string = {
      text: "UPDATE customer_order SET customer_number = $1, employee_id = $2, start_time = $3, order_date = $4, price = $5, ticket_time = $6, completed_flag = $7 WHERE order_number = $8 RETURNING *;",
      values: [
        customer_order_json.customer_number,
        customer_order_json.employee_id,
        customer_order_json.start_time,
        customer_order_json.order_date,
        customer_order_json.price,
        customer_order_json.ticket_time,
        customer_order_json.completed_flag,
        customer_order_json.order_number
      ]
    }

    return db.query(query_string)
  },

  delete(order_number) {
    const query_string = {
      text: "DELETE FROM customer_order WHERE order_number = $1 RETURNING *;",
      values: [order_number]
    }

    return db.query(query_string)
  }
}

module.exports = customer_order_db
