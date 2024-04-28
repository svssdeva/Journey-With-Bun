import { Database } from "bun:sqlite";
const database = new Database("newdb.sqlite");
database.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
//database.run("INSERT INTO users (name) VALUES (?)", ["John"]);

const users = database.query("SELECT * FROM users").all();
console.log(users);