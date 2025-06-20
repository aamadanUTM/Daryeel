import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a MySQL connection
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Export the connection object for reuse
export default connection;
