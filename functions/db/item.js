const db = require('./db')

const item_db = {
  create(item_json) {
    const query_string = {
      text: "INSERT INTO item (price, completed_flag) VALUES ($1, $2) RETURNING *;",
      values: [item_json.price, item_json.completed_flag]
    }

    return query_string
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM item WHERE item_number = $1;",
      values: [item_number]
    }

    return query_string
  },

  update(item_json) {
    const query_string = {
      text: "UPDATE item SET price = $1, completed_flag = $2 WHERE item_number = $3 RETURNING *;",
      values: [item_json.price, item_json.completed_flag, item_json.item_number]
    }

    return query_string
  },

  delete(item_number) {
    const query_string = {
      text: "DELETE FROM item WHERE item_number = $1 RETURNING *;",
      values: [item_number]
    }

    return query_string
  },

  menu(req, res, next) {
    const items = []
    db.query("SELECT * FROM drink AS d, food AS f, item AS i WHERE f.item_number=d.item_number AND d.item_number=i.item_number;").then(drink => {
      items.push({name: "Drinks", array: drink})
      db.query("SELECT * FROM wings AS w, food AS f, item AS i WHERE f.item_number=w.item_number AND w.item_number=i.item_number;").then(wings => {
        items.push({name: "Wings", array: wings})
        db.query("SELECT * FROM pasta AS p, item AS i WHERE f.item_number=p.item_number AND p.item_number=i.item_number;").then(pasta => {
          items.push({name: "Pasta", array: pasta})
          db.query("SELECT * FROM menu_pizza AS p, item AS i WHERE f.item_number=p.item_number AND p.item_number=i.item_number;").then(pizza => {
            items.push({name: "PIzza", array: pizza})
            res.send({msg: items, status: 200})
          })
        })
      })
    })
  },

  menuItem(req, res, next) {
    const id = req.params.id
    db.query(`SELECT *
      FROM drink AS d, food AS f, item AS i
      WHERE f.item_number=d.item_number AND d.item_number=i.item_number AND i.item_number = ${id};`).then(stuff => {
        res.send({msg: stuff, status: 200})
    })
  },

  placeOrder(req, res, next) {
    const orders = req.body.map(({food, quantity, note, orderNum}) => {
        // place the order logic here
    })
  }
}

module.exports = item_db
