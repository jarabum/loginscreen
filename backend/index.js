const express = require("express");
const cors = require("cors");
const { checkUser, createUser, allUsers } = require("./userModel")
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.get("/allusers", (req, res) => {
  res.status(200).send({ users: "lol you thought" });
})

app.post("/createuser", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send({ message: "name and password is required >:(" });
  }

  const created = await createUser(name, password);

  if (created === "exists") {
    res.status(400).send({ message: "user already exists :(" });
  } else if (created) {
    res.status(201).send({ message: "created user :)" });
    console.log(`created user: ${name}`);
  } else {
    res.status(400).send({ message: "could not create user :(" });
  }
})

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).send({ message: "name and password is required >:(" });
  }

  const check = await checkUser(name, password);

  if (check) {
    return res.status(200).send({ message: "successfully logged in :)" });
  }

  return res.status(400).send({ message: "wrong name or password :(" });
})

//app.post("/dalsi/:id", (req, res) => {
//const { id } = req.params;
//const { data } = req.body;

//if (!data) {
//res.status(400).send({ message: "are you mad :(" });
//}

//res.send({ zprava: `id je ${id} data je ${data}` });
//});

app.listen(PORT, () => { console.log(`server started on port: ${PORT}`) })
