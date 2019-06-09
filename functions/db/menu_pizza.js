const db = require('./db')

const menu_pizza_db = {
  create(menu_pizza_json) {
    const query_string = {
      text: "INSERT INTO menu_pizza (item_number, crust, dip) VALUES ($1, $2, $3) RETURNING *;",
      values: [menu_pizza_json.item_number, menu_pizza_json.crust, menu_pizza_json.dip]
    }

    return db.query(query_string)
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM menu_pizza WHERE item_number = $1;",
      values: [item_number]
    }

    return db.query(query_string)
  },

  update(menu_pizza_json) {
    const query_string = {
      text: "UPDATE menu_pizza SET crust = $1, dip = $2 WHERE item_number = $3 RETURNING *;",
      values: [menu_pizza_json.crust, menu_pizza_json.dip, menu_pizza_json.item_number]
    }

    return db.query(query_string)
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM menu_pizza WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    return db.query(query_string)
  }
}

module.exports = menu_pizza_db
