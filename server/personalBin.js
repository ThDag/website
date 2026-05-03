import "dotenv/config"
import { Pool } from "pg"


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  host: "localhost",
  port: 5432
})

// const res = await pool.query("CREATE TABLE test_table (id SERIAL PRIMARY KEY, name TEXT, age INTEGER)")
const res = await pool.query("SELECT * FROM test_table")
// const res = await pool.query("INSERT INTO test_table (name, age) VALUES ('nig', 6)")
console.log(res)
