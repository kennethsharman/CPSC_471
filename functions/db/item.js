const db = require('./db')

const item_db = {
  create(item_json) {
    const query_string = {
      text: "INSERT INTO item (price, completed_flag) VALUES ($1, $2) RETURNING *;",
      values: [item_json.price, item_json.completed_flag]
    }

    return db.query(query_string)
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM item WHERE item_number = $1;",
      values: [item_number]
    }

    return db.query(query_string)
  },

  update(item_json) {
    const query_string = {
      text: "UPDATE item SET price = $1, completed_flag = $2 WHERE item_number = $3 RETURNING *;",
      values: [item_json.price, item_json.completed_flag, item_json.item_number]
    }

    return db.query(query_string)
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM item WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    return db.query(query_string)
  }
}

module.exports = item_db
