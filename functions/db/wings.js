const wings_db = {
  create(wings_json) {
    const query_string = {
      text: "INSERT INTO wings (item_number, sauce, dip) VALUES ($1, $2, $3) RETURNING *;",
      values: [wings_json.item_number, wings_json.sauce, wings_json.dip]
    }

    return query_string
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM wings WHERE item_number = $1;",
      values: [item_number]
    }

    return query_string
  },

  update(wings_json) {
    const query_string = {
      text: "UPDATE wings SET sauce = $1, dip = $2 WHERE item_number = $3 RETURNING *;",
      values: [wings_json.sauce, wings_json.dip, wings_json.item_number]
    }

    return query_string
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM wings WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    return query_string
  }
}

module.exports = wings_db
