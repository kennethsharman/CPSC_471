const db = require('./db')

const _db = {
  create() {
    const query_string = {
      text: "",
      values: []
    }

    result = db.query(query_string)
    return result
  },

  find() {
    const query_string = {
      text: "",
      values: []
    }

    result = db.query(query_string)
    return result
  },

  update() {
    const query_string = {
      text: "",
      values: []
    }

    result = db.query(query_string)
    return result
  },

  delete() {
    const query_string = {
      text: "",
      values: []
    }

    result = db.query(query_string)
    return result
  }
}

module.exports =
