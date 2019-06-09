const takes_inventory_db = {
  create(takes_inventory_json) {
    const query_string = {
      text: "INSERT INTO takes_inventory (manager_id, ingredient_number, supplier, inventory_date, inventory_time) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      values: [
        takes_inventory_json.manager_id,
        takes_inventory_json.ingredient_number,
        takes_inventory_json.supplier,
        takes_inventory_json.inventory_date,
        takes_inventory_json.inventory_time
      ]
    }

    return query_string
  },

  find(manager_id, ingredient_number, supplier, inventory_date) {
    const query_string = {
      text: "SELECT * FROM takes_inventory WHERE manager_id = $1 AND ingredient_number = $2 AND supplier = $3 AND inventory_date = $4;",
      values: [manager_id, ingredient_number, supplier, inventory_date]
    }

    return query_string
  },

  update(takes_inventory_json) {
    const query_string = {
      text: "UPDATE takes_inventory SET inventory_time = $1 WHERE manager_id = $2 AND ingredient_number = $3 AND supplier = $4 AND inventory_date = $5 RETURNING *;",
      values: [
        takes_inventory_json.inventory_time,
        takes_inventory_json.manager_id,
        takes_inventory_json.ingredient_number,
        takes_inventory_json.supplier,
        takes_inventory_json.inventory_date
      ]
    }

    return query_string
  },

  delete(manager_id, ingredient_number, supplier, inventory_date) {
    const query_string = {
      text: "DELETE FROM takes_inventory WHERE manager_id = $1 AND ingredient_number = $2 AND supplier = $3 AND inventory_date = $4 RETURNING *;",
      values: [manager_id, ingredient_number, supplier, inventory_date]
    }

    return query_string
  }
}

module.exports = takes_inventory_db
