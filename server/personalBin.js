import "dotenv/config"
import { Pool } from "pg"


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  host: "db",
  port: 5432
})

const res = await pool.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, password TEXT)")
const res1 = await pool.query("SELECT * FROM users")
// const res = await pool.query("INSERT INTO test_table (name, age) VALUES ('nig', 6)")
console.log("entire database:", res1.rows)


async function handlePersonalBin(data) {
  // console.log(data) // {"name":"sdfsdf","password":"4bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f877","action":"logIn"}
  const parsedData = JSON.parse(data)

  if (parsedData.action === "logIn") {
    const usernameCheck = await pool.query("SELECT * FROM users WHERE name = $1", [parsedData.name])
    const usernameMatch = usernameCheck.rows

    if (usernameCheck.rowCount) {
      if (parsedData.password === usernameMatch[0].password) {
        return `logged in successfully as ${parsedData.name}`
      } else {
        console.log("password wrong")
      }
    } else {
      console.log("username doesn't exist")
    }
    return "username or password incorrect"

  } else if (parsedData.action === "signUp") {
    const usernameCheck = await pool.query("SELECT * FROM users WHERE name = $1", [parsedData.name])
    const usernameExists = usernameCheck.rowCount

    if (!usernameExists) {
      const signUpAction = await pool.query("INSERT INTO users (name, password) VALUES ($1, $2)", [parsedData.name, parsedData.password])
      return "account created"

    } else {
      return "username already taken"
    }

  }
}

export default handlePersonalBin
