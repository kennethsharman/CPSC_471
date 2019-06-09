const db = require('./db')

const pasta_db = {
  create(pasta_json) {
    const query_string = {
      text: "INSERT INTO pasta (item_number, baked_flag) VALUES ($1, $2) RETURNING *;",
      values: [pasta_json.item_number, pasta_json.baked_flag]
    }

    return db.query(query_string)
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM pasta WHERE item_number = $1;",
      values: [item_number]
    }

    return db.query(query_string)
  },

  update(pasta_json) {
    const query_string = {
      text: "UPDATE pasta SET baked_flag = $1 WHERE item_number = $2 RETURNING *;",
      values: [pasta_json.baked_flag, pasta_json.item_number]
    }

    return db.query(query_string)
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM pasta WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    return db.query(query_string)
  }
}

module.exports = pasta_db
