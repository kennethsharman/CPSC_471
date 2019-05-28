const { Client } = require('pg');
const functions = require('firebase-functions')

const db = () => {

    console.log(functions.config().envs.pg_host)
    const client = new Client({
        host: functions.config().envs.pg_host,
        port: functions.config().envs.pg_port,
        user: functions.config().envs.pg_user,
        password: functions.config().envs.pg_password,
        database: functions.config().envs.pg_database,
        ssl: true
    })

    return client
}

module.exports = db
