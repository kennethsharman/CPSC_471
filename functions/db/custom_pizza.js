const custom_pizza_db = {
  create(custom_pizza_json) {
    const query_string = {
      text: "INSERT INTO custom_pizza (item_number, crust, sauce, cheese, topping1, topping2) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      values: [
        custom_pizza_json.item_number,
        custom_pizza_json.crust,
        custom_pizza_json.sauce,
        custom_pizza_json.cheese,
        custom_pizza_json.topping1,
        custom_pizza_json.topping2
      ]
    }

    return query_string
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM custom_pizza WHERE item_number = $1;",
      values: [item_number]
    }

    return query_string
  },

  update(custom_pizza_json) {
    const query_string = {
      text: "UPDATE custom_pizza SET crust = $1, sauce = $2, cheese = $3, topping1 = $4, topping2 = $5 WHERE item_number = $6 RETURNING *;",
      values: [
        custom_pizza_json.crust,
        custom_pizza_json.sauce,
        custom_pizza_json.cheese,
        custom_pizza_json.topping1,
        custom_pizza_json.topping2,
        custom_pizza_json.item_number
      ]
    }

    return query_string
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM custom_pizza WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    return query_string
  }
}

module.exports = custom_pizza_db
