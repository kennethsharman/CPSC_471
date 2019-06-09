const db = require('./db')

const made_from_db = {
  create(made_from_json) {
    const query_string = {
      text: "INSERT INTO made_from (ingredient_number, supplier, item_number, amount, weight) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      values: [
        made_from_json.ingredient_number,
        made_from_json.supplier,
        made_from_json.item_number,
        made_from_json.amount,
        made_from_json.weight
      ]
    }

    return db.query(query_string)
  },

  find(ingredient_number, supplier, item_number) {
    const query_string = {
      text: "SELECT * FROM made_from WHERE ingredient_number = $1 AND supplier = $2 AND item_number = $3;",
      values: [ingredient_number, supplier, item_number]
    }

    return db.query(query_string)
  },

  update(made_from_json) {
    const query_string = {
      text: "UPDATE made_from SET amount = $1, weight = $2 WHERE ingredient_number = $3 AND supplier = $4 AND item_number = $5 RETURNING *;",
      values: [
        made_from_json.amount,
        made_from_json.weight,
        made_from_json.ingredient_number,
        made_from_json.supplier,
        made_from_json.item_number
      ]
    }

    return db.query(query_string)
  },

  delete(ingredient_number, supplier, item_number) {
    const query_string = {
      text: "DELETE FROM made_from WHERE ingredient_number = $1 AND supplier = $2 AND item_number = $3",
      values: [ingredient_number, supplier, item_number]
    }

    return db.query(query_string)
  }
}

module.exports = made_from_db
