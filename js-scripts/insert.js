const { Client } = require('pg');

const dbUser = 'bjumper';
const dbPass = 'bjumper';
const dbName = 'bjumper';
const dbHost = 'localhost';
const dbPort = 5432;

const connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

const client = new Client({ connectionString });

client.connect();

client.query('INSERT INTO measurement(id, process_timestamp) VALUES (\'ident\', NOW())', (err, res) => {
    console.log('err', err);
    console.log('res', res);
    client.end();
});
