const order_consists_of_db = {
  create(order_consists_of_json) {
    const query_string = {
      text: "INSERT INTO order_consists_of (order_number, item_number, quantity, completed_item) VALUES ($1, $2, $3, false) RETURNING *;",
      values: [order_consists_of_json.order_number, order_consists_of_json.item_number, order_consists_of_json.quantity]
    }

    return query_string
  },

  find(order_number, item_number) {
    const query_string = {
      text: "SELECT * FROM order_consists_of WHERE order_number = $1 AND item_number = $2;",
      values: [order_number, item_number]
    }

    return query_string
  },

  complete({order_number, item_number}) {
    const query_string = {
      text: `UPDATE customer_order SET completed_item = true WHERE order_number = $1 AND item_number = $2`,
      values: [order_number, item_number]
    }

    result = db.query(query_string)
    return result
  },

  delete(order_number, item_number) {
    const query_string = {
      text: "DELETE FROM order_consists_of WHERE order_number = $1 AND order_number = $2 RETURNING *;",
      values: [order_number, item_number]
    }

    return query_string
  }
}

module.exports = order_consists_of_db
