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

    return query_string
  },

  find(order_obj) {
    const query_string = {
      text: "SELECT * FROM customer_order WHERE order_number = $1;",
      values: [order_obj.order_number]
    }

    return query_string
  },

  findOpenOrdersEmp(employee_json) {
    const query_string = {
      text: "SELECT * FROM customer_order WHERE employee_id = $1 AND completed_flag = false;",
      values: [employee_json.employee_id]
    }

    return query_string
  },

  findClosedOrdersEmp(employee_json) {
    const query_string = {
      text: "SELECT * FROM customer_order WHERE employee_id = $1 AND completed_flag = true;",
      values: [employee_json.employee_id]
    }

    return query_string
  },

  cashout(employee_json) {
    const query_string = {
      text: "UPDATE employee as e SET cash_out = (SELECT SUM(price) FROM customer_order as cust WHERE e.employee_id = cust.employee_id );",
      values: []
    }

    return query_string
  },

  openItems(employee_json) {
    const query_string = {
      text: "SELECT order_consists_of.order_number, food.item_number, food_name, station FROM food inner join order_consists_of on order_consists_of.item_number=food.item_number where completed_flag=false;",
      values: []
    }

    return query_string
  },

  bumpOrder(employee_json) {
    const query_string = {
      text: "UPDATE order_consists_of SET completed_flag=true where order_number=$1 and item_number=$2;",
      values: [employee_json.order_number, employee_json.item_number]
    }

    return query_string
  },

  tipout(employee_json) {
    const query_string = {
      text: "UPDATE employee as e SET tip_out = ROUND( 0.04 * e.cash_out, 2 );",
      values: []
    }

    return query_string
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

    return query_string
  },

  delete(order_number) {
    const query_string = {
      text: "DELETE FROM customer_order WHERE order_number = $1 RETURNING *;",
      values: [order_number]
    }

    return query_string
  }
}

module.exports = customer_order_db
