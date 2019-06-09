const db = require('./db')

const _db = {
  create() {
    const query_string = {
      text: "",
      values: []
    }

    return db.query(query_string)
  },

  find() {
    const query_string = {
      text: "",
      values: []
    }

    return db.query(query_string)
  },

  update() {
    const query_string = {
      text: "",
      values: []
    }

    return db.query(query_string)
  },

  delete() {
    const query_string = {
      text: "",
      values: []
    }

    return db.query(query_string)
  }
}

module.exports =
