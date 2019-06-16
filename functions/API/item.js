const db = require('../db/db')
const item_db = require('../db/item')

const item_api = {
  out_of_stock_items(req, res) {
    db.query(item_db.out_of_stock_items())
      .then(success => {
        res.send(success)
      }).catch(err => {
        res.send({msg: err, status: 500})
      })
  }
}

module.exports = item_api
