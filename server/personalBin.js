import "dotenv/config"
import { Pool } from "pg"
import * as crypto from 'node:crypto';


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  host: "db",
  port: 5432
})

const res = await pool.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name TEXT, password TEXT, textbox TEXT)")
const res1 = await pool.query("SELECT * FROM users")
console.log("entire database:", res1.rows)


async function handlePersonalBin(data, headers) {
  // console.log(data) // {"name":"sdfsdf","password":"4bac27393bdd9777ce02453256c5577cd02275510b2227f473d03f533924f877","action":"logIn"}
  const parsedData = JSON.parse(data)

  // ----------------- login --------------------
  if (parsedData.action === "logIn") {
    const usernameCheck = await pool.query("SELECT * FROM users WHERE name = $1", [parsedData.name])
    const usernameMatch = usernameCheck.rows

    if (usernameCheck.rowCount) {
      if (parsedData.password === usernameMatch[0].password) {
        const usersTextBox = usernameMatch[0].textbox
        console.log(`logged in successfully as ${parsedData.name}`)
        return { status: "success", message: `logged in successfully as ${parsedData.name}`, task: "signup", textbox: usersTextBox, cookie: `user_session=${createRandomHash()}; HttpOnly; secure;` }

      } else {
        console.log("password wrong")
      }

    } else {
      console.log("username doesn't exist")
    }
    return { status: "unsuccessful", message: "username or password incorrect", task: "login" }


    // ----------------- singup ---------------
  } else if (parsedData.action === "signUp") {
    const usernameCheck = await pool.query("SELECT * FROM users WHERE name = $1", [parsedData.name])
    const usernameExists = usernameCheck.rowCount

    if (!usernameExists) {
      const signUpAction = await pool.query("INSERT INTO users (name, password) VALUES ($1, $2)", [parsedData.name, parsedData.password])
      return { status: "success", message: "account created", task: "signup" }

    } else {
      return { status: "unsuccessful", message: "username already taken", task: "signup" }
    }

    // ---------------- submit changes ---------------
  } else if (parsedData.action === "submitChanges") {
    console.log("headers ", headers.cookie)
    return {}

  }
}

function createRandomHash() {
  const randomString = crypto.randomBytes(32).toString("hex")
  return randomString
}

export default handlePersonalBin
