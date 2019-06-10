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

        client.connect()

        return new Promise((resolve, reject) => {
            let result
            client.query(query_string)
                .then(res => {
                    result = res.rows
                    client.end()
                    console.log("HRE", result)
                    return result
                })
                .then(f => {
                    console.log("RESOLVEING", f)
                    resolve(f)
                })
                .catch(err => {
                    if (err) {
                        console.log("ERROR", err)
                        reject(err)
                    }
                })
        })
    }
}

module.exports = db
