const db = require('./db')

const drink_db = {
  create(drink_json) {
    const query_string = {
      text: "INSERT INTO drink (item_number, description) VALUES ($1, $2) RETURNING *;",
      values: [drink_json.item_number, drink_json.description]
    }

    result = db.query(query_string)
    return result
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM drink WHERE item_number = $1;",
      values: [item_number]
    }

    result = db.query(query_string)
    return result
  },

  update(drink_json) {
    const query_string = {
      text: "UPDATE drink SET description = $1 WHERE item_number = $2 RETURNING *;",
      values: [drink_json.description, drink_json.item_number]
    }

    result = db.query(query_string)
    return result
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM drink WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    result = db.query(query_string)
    return result
  }
}

module.exports = drink_db
