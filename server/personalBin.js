import "dotenv/config"
import { Pool } from "pg"


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  host: "db",
  port: 5432
})

const res = await pool.query("CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name TEXT, age INTEGER)")
const res1 = await pool.query("SELECT * FROM postgres")
// const res = await pool.query("INSERT INTO test_table (name, age) VALUES ('nig', 6)")
console.log(res1)


async function handlePersonalBin() {
  console.log("handling personalbin beep boop...")
}

export default handlePersonalBin
