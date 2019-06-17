const drink_db = {
  create(drink_json) {
    const query_string = {
      text: "INSERT INTO drink (item_number, diet) VALUES ($1, $2) RETURNING *;",
      values: [drink_json.item_number, drink_json.diet]
    }

    return query_string
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM drink WHERE item_number = $1;",
      values: [item_number]
    }

    return query_string
  },

  update(drink_json) {
    const query_string = {
      text: "UPDATE drink SET diet = $1 WHERE item_number = $2 RETURNING *;",
      values: [drink_json.description, drink_json.diet]
    }

    return query_string
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM drink WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    return query_string
  }
}

module.exports = drink_db
