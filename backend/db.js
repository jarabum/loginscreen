const Database = require("better-sqlite3");
const db = new Database("database.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    name TEXT PRIMARY KEY,
    password TEXT NOT NULL
  )
`);


module.exports = db;

//const insert = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
//insert.run('Alice', 'alice@example.com');


//const getUser = db.prepare('SELECT * FROM users WHERE id = ?');
//const user = getUser.get(1);
//console.log(user);


//const allUsers = db.prepare('SELECT * FROM users').all();
//console.log(allUsers);
