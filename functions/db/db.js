const { Client } = require('pg');
const functions = require('firebase-functions')

const db = {
    query(query_string) {
        const client = new Client({
            host: functions.config().envs.pg_host,
            port: functions.config().envs.pg_port,
            user: functions.config().envs.pg_user,
            password: functions.config().envs.pg_password,
            database: functions.config().envs.pg_database,
            ssl: true
        })

        console.log(JSON.stringify(query_string))

        client.connect()

        let result
        client.query(query_string)
            .then((res) => {
                result = res.rows
                client.end()
                return result
            })
            .then(f => {
                console.log(f)
            })
            .catch(e => {
                if (err) {
                    return console.error(err)
                }
            })

        return result
    }
}

module.exports = db
