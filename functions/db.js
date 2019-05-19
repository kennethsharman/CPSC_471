const { Client } = require('pg');
const db = () => {

    const client = new Client({
        ssl: true
    })

    client.connect();
    client.query('SELECT * FROM test_table;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
    });

    return client
}

module.exports = db
