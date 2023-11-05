const mysql = require('mysql');
require('dotenv').config();
// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: process.env['host'],
  user: process.env['user'],
  password: process.env['password'],
  database: process.env['database']
});

const connect = async function (): Promise<void> {
  try {
    connection.connect((err: Error) => {
      if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
      }
      console.log('Connected to MySQL database');
    });

  } catch (error) {
    console.log('Exception occcured in connecting to Mysql');
    throw error;
  }
}
export default connect;