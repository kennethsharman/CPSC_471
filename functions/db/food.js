const food_db = {
  create(food_json) {
    const query_string = {
      text: "INSERT INTO food (item_number, food_name, station, out_of_stock_flag, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      values: [
        food_json.item_number,
        food_json.food_name,
        food_json.station,
        food_json.out_of_stock_flag,
        food_json.description
      ]
    }

    return query_string
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM food WHERE item_number = $1;",
      values: [item_number]
    }

    return query_string
  },

  find_out_of_stock() {
    return {
      text: "SELECT * FROM FOOD WHERE out_of_stock_flag = true"
    }
  },

  update(food_json) {
    const query_string = {
      text: "UPDATE food SET food_name = $1, station = $2, out_of_stock_flag = $3, description = $4 WHERE item_number = $5 RETURNING *;",
      values: [
        food_json.food_name,
        food_json.station,
        food_json.out_of_stock_flag,
        food_json.description,
        food_json.item_number
      ]
    }

    return query_string
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM food WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    return query_string
  }
}

module.exports = food_db
