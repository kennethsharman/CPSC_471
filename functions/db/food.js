const db = require('./db')

const food_db = {
  create(food_json) {
    const query_string = {
      text: "INSERT INTO food (item_number, food_name, cook_id, station, special_request, allergy_info, out_of_stock_flag) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      values: [
        food_json.item_number,
        food_json.food_name,
        food_json.cook_id,
        food_json.station,
        food_json.special_request,
        food_json.allergy_info,
        food_json.out_of_stock_flag
      ]
    }

    result = db.query(query_string)
    return result
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM food WHERE item_number = $1;",
      values: [item_number]
    }

    result = db.query(query_string)
    return result
  },

  update(food_json) {
    const query_string = {
      text: "UPDATE food SET food_name = $1, cook_id = $2, station = $3, special_request = $4, allergy_info = $5, out_of_stock_flag = $6 WHERE item_number = $7 RETURNING *;",
      values: [
        food_json.food_name,
        food_json.cook_id,
        food_json.station,
        food_json.special_request,
        food_json.allergy_info,
        food_json.out_of_stock_flag,
        food_json.item_number
      ]
    }

    result = db.query(query_string)
    return result
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM food WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    result = db.query(query_string)
    return result
  }
}

module.exports = food_db
