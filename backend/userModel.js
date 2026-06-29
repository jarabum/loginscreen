const db = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function getUserByName(name) {
  return db.prepare('SELECT * FROM users WHERE name = ?').get(name);
}

async function checkUser(name, password) {
  const user = getUserByName(name);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return true;
    }
    return false;
  }
  return false;
}

async function createUser(name, password) {
  const hashedPass = await bcrypt.hash(password, saltRounds);
  try {
    const insert = db.prepare("INSERT INTO users (name, password) VALUES (?, ?)");
    const result = insert.run(name, hashedPass);
    return result.changes === 1;
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_PRIMARYKEY" ||
      err.code === "SQLITE_CONSTRAINT_UNIQUE" ||
      err.code === "SQLITE_CONSTRAINT") {
      return "exists";
    }
    throw err;
  }
}

function allUsers() {
  return db.prepare('SELECT * FROM users').all();
}

module.exports = { checkUser, createUser, allUsers };
