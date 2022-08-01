const { Pool } = require("pg");
// pools will use environment variables
// for connection information
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mydb",
  password: "ahmad",
  port: 5432,
});
