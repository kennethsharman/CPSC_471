const db = require('./db')

const customer_db = {
  create(customer_json) {
    const query_string = {
      text: "INSERT INTO customer (group_size) VALUES ($1) RETURNING *;",
      values: [customer_json.group_size]
    }

    return query_string
  },

  find(customer_number) {
    const query_string = {
      text: "SELECT * FROM customer WHERE customer_number = $1;",
      values: [customer_number]
    }

    return query_string
  },

  update(customer_json) {
    const query_string = {
      text: "UPDATE customer SET group_size = $1 WHERE customer_number = $2 RETURNING *;",
      values: [customer_json.group_size, customer_json.customer_number]
    }

    return query_string
  },

  delete(customer_number) {
    const query_string = {
      text: "DELETE FROM customer WHERE customer_number = $1 RETURNING *;",
      values: [customer_number]
    }

    return query_string
  }
}

module.exports = customer_db
