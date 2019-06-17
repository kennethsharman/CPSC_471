const db = require('./db')
const food = require('./food')

const made_from_db = {
  create(made_from_json) {
    const query_string = {
      text: "INSERT INTO made_from (name, supplier, item_number, amount) VALUES ($1, $2, $3, $4) RETURNING *;",
      values: [
        made_from_json.name,
        made_from_json.supplier,
        made_from_json.item_number,
        made_from_json.amount,
      ]
    }

    return query_string
  },

  find(name, supplier, item_number) {
    const query_string = {
      text: "SELECT * FROM made_from WHERE name = $1 AND supplier = $2 AND item_number = $3;",
      values: [name, supplier, item_number]
    }

    return query_string
  },

  update(made_from_json) {
    const query_string = {
      text: "UPDATE made_from SET amount = $1, WHERE ingredient_number = $2 AND supplier = $3 AND item_number = $4 RETURNING *;",
      values: [
        made_from_json.amount,
        made_from_json.ingredient_number,
        made_from_json.supplier,
        made_from_json.name
      ]
    }

    return query_string
  },

  delete(name, supplier, item_number) {
    const query_string = {
      text: "DELETE FROM made_from WHERE name = $1 AND supplier = $2 AND item_number = $3",
      values: [name, supplier, item_number]
    }

    return query_string
  },

  checkIfNowInStock() {
    db.query(food.find_out_of_stock()).then(res => {
      res.forEach(food => {
        food.item_number
      })
    })
  },

  checkIfNowOutOfStock() {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }
}

module.exports = made_from_db
