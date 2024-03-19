import mysql from "mysql2/promise";

const dbConfig = {
  host: "127.0.0.1",
  port: "3306",
  database: "meals_db",
  user: "root",
  password: "8126064068@h",
};
const pool = mysql.createPool(dbConfig);

// Function to execute SQL queries
export async function query(sql, values) {
  let connection;
  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Execute the query with optional values
    const [result] = await connection.execute(sql, values);

    // Release the connection back to the pool
    connection.release();

    // Return the query result
    return result;
  } catch (error) {
    // If an error occurs, release the connection and throw the error
    if (connection) {
      connection.release();
    }
    throw new Error(error.message);
  }
}
