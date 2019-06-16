const ingredient_db = {
  create(ingredient_json) {
    const query_string = {
      text: "INSERT INTO ingredient (supplier, name, recommended_count, critical_count, on_hand_count) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      values: [
        ingredient_json.supplier,
        ingredient_json.name,
        ingredient_json.recommended_count,
        ingredient_json.critical_count,
        ingredient_json.on_hand_count
      ]
    }

    return query_string
  },

  find(name, supplier) {
    const query_string = {
      text: "SELECT * FROM ingredient WHERE name = $1 AND supplier = $2;",
      values: [name, supplier]
    }

    return query_string
  },

  update(ingredient_json) {
    const query_string = {
      text: "UPDATE ingredient SET recommended_count = $2, critical_count = $3, on_hand_count = $4 WHERE name = $5 AND supplier = $6 RETURNING *;",
      values: [
        ingredient_json.recommended_count,
        ingredient_json.critical_count,
        ingredient_json.on_hand_count,
        ingredient_json.name,
        ingredient_json.supplier
      ]
    }

    return query_string
  },

  delete(name, supplier) {
    const query_string = {
      text: "DELETE FROM ingredient WHERE name = $1 AND supplier = $2 RETURNING *;",
      values: [name, supplier]
    }

    return query_string
  }
}

module.exports = ingredient_db
