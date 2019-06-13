const db = require('./db')
const ingredient = require('./ingredient')

const takes_inventory_db = {
  create(takes_inventory_json) {
    const query_string = {
      text: "INSERT INTO takes_inventory (manager_id, inventory_file, supplier, inventory_date) VALUES ($1, $2, $3, $4) RETURNING *;",
      values: [
        takes_inventory_json.manager_id,
        takes_inventory_json.inventory_file,
        takes_inventory_json.supplier,
        takes_inventory_json.inventory_date
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
  },

  makeIngredients(req, res, next) {
    return new Promise((resolve, reject) => {
        // compile all the db calls
        const body = req.body[0]
        const calls = JSON.parse(body.inventory_file).map(({name, quantity}) => new Promise((resolveAll, rejectAll) => {
          // check if it exists
          console.log(name, quantity)
          db.query(ingredient.find(name, body.supplier)).then(result => {
            if(result.length===0) {
              // make a new one
              db.query(ingredient.create({
                supplier: body.supplier,
                name,
                recommended_count: Math.ceiling(quantity/2),
                critical_count: Math.ceiling(quantity/4),
                on_hand_count: quantity
              })).catch(err => {
                rejectAll({msg: err, status: 404})
              })
            } else {
              const {recommended_count, critical_count, name, supplier} = result[0]
              db.query(ingredient.update({
                on_hand_count: quantity,
                recommended_count,
                critical_count,
                on_hand_count,
                name,
                supplier
              })).catch(err => {
                rejectAll({msg: err, status: 404})
              })
            }
          }).catch(err => {
              rejectAll({msg: err, status: 404})
          })
        }))

        // call them all at once
        Promise.all(calls).then(() => {
          res.send({msg: '', status: 200})
        }).catch(err => {
          res.send(err)
        })
    })
  }
}

module.exports = takes_inventory_db
