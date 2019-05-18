const { Client } = require('pg');

const db = () => {

    const client = new Client({
        connectionString: 'postgres://zmbjdluvebkako:9228f69b4e05f8c63208c44cb52469aca62616eaa30eabd4548904b775f95330@ec2-174-129-240-67.compute-1.amazonaws.com:5432/d836rs3ar4eutu'
    })

    client.connect();

    // client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    // if (err) throw err;
    // for (let row of res.rows) {
    //     console.log(JSON.stringify(row));
    // }
    // client.end();
    // });

    return client
}

module.exports = db