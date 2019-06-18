const db = require('./db')
const order_consists_of = require('./order_consists_of')
const customer_order = require('./customer_order')
const made_from = require('./made_from')

const item_db = {
  create(item_json) {
    const query_string = {
      text: "INSERT INTO item (price) VALUES ($1, $2) RETURNING *;",
      values: [item_json.price]
    }

    return query_string
  },

  find(item_number) {
    const query_string = {
      text: "SELECT * FROM item, food WHERE item_number = $1;",
      values: [item_number]
    }

    return query_string
  },

  update(item_json) {
    const query_string = {
      text: "UPDATE item SET price = $1, completed_item = $2 WHERE item_number = $3 RETURNING *;",
      values: [item_json.price, item_json.completed_item, item_json.item_number]
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
    const qTemplate = category => ` SELECT *
      FROM ${category} AS c, food AS f, item AS i
      WHERE f.item_number=c.item_number
        AND c.item_number=i.item_number
        AND out_of_stock_flag = false;`

    db.query(qTemplate('drink')).then(drink => {
      items.push({name: "Drinks", array: drink})
      db.query(qTemplate('wings')).then(wings => {
        items.push({name: "Wings", array: wings})
        db.query(qTemplate('pasta')).then(pasta => {
          items.push({name: "Pasta", array: pasta})
          db.query(qTemplate('menu_pizza')).then(pizza => {
            items.push({name: "Pizza", array: pizza})
            res.send({msg: items, status: 200})
          })
        })
      })
    })
  },

  menuItem(req, res, next) {
    const id = req.params.id
    db.query(`SELECT *
      FROM food AS f, item AS i
      WHERE f.item_number=i.item_number AND i.item_number = ${id};`).then(stuff => {
        res.send({msg: stuff, status: 200})
    })
  },

  placeOrder(req, res, next) {
    const qArray = [], notes = []
    let totalPrice = 0

    // get queries
    req.body.orderArr.forEach(({food, quantity, note}) => {
      for(let i = 0; i < quantity; i++) {
        totalPrice += Math.ceil(Number(food.price) * 100)/100
      }

      if(note!=='') notes.push(`${food.food_name}: ${note}`)
    })

    // make order
    db.query(customer_order.create({
      customer_number: req.body.customer_number,
      employee_id: req.body.employee_id,
      start_time: new Date(),
      order_date: new Date(),
      price: totalPrice,
      ticket_time: null,
      completed_order: false,
      special_request: notes.reduce((prev, curr) => `${prev} | ${curr}`, '')
    })).then(response => {
      const order_number = response[0].order_number
      req.body.orderArr.forEach(({food, quantity}) => {
        for(let i = 0; i < quantity; i++) {
          qArray.push(order_consists_of.create({order_number, item_number: food.item_number, quantity}))
        }
      })
      // make associated orders
      const calls = qArray.map(qString => new Promise((resolve, reject) => {
        console.log("Q STRING", qString)
          db.query(qString).then(() => {
            made_from.checkIfNowOutOfStock().then(resolve)
          }).catch(reject)
        }))

      Promise.all(calls).then(() => {
        res.send({msg: '', status: 200})
      }).catch(err => {
        res.send(err)
      })
    })
  },

  out_of_stock_items() {
    const query_string = {
      text: `SELECT *
              FROM item, food, ingredient, made_from
              WHERE item.item_number = made_from.item_number
                AND food.item_number = item.item_number
                AND made_from.name = ingredient.name
                AND made_from.supplier = ingredient.supplier
                AND ingredient.on_hand_count < made_from.amount;`
    }
    return query_string
  }
}

module.exports = item_db
