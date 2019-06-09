const db = require('./db')

const allergy_db = {
  create(allergy_json) {
    const query_string = {
      text: "INSERT INTO allergy (order_number, allergy) VALUES ($1, $2) RETURNING *;",
      values: [allergy_json.order_number, allergy_json.allergy]
    }

    return db.query(query_string)
  },

  find(order_number, allergy) {
    const query_string = {
      text: "SELECT * FROM allergy WHERE order_number = $1 AND allergy = $2;",
      values: [order_number, allergy]
    }

    return db.query(query_string)
  },

  // No update, entire table is primary key.
  // update() {
  //   const query_string = {
  //     text: "",
  //     values: []
  //   }

  //   result = db.query(query_string)
  //   return result
  // },

  delete(order_number, allergy) {
    const query_string = {
      text: "DELETE FROM allergy WHERE order_number = $1 AND allergy = $2 RETURNING *;",
      values: [order_number, allergy]
    }

    return db.query(query_string)
  },

  allergies_for_oder(order_number) {
    const query_string = {
      text: "SELECT * FROM allergy WHERE order_number = $1;",
      values: [order_number]
    }

    return db.query(query_string)
  }
}

module.exports = allergy_db
