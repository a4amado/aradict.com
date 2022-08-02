const { Pool } = require("pg");
// pools will use environment variables
// for connection information
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "aradict",
  password: "ahmad",
  port: 5432,
});

export default pool;
