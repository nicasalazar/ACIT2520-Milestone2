const express = require("express");
const PORT = process.env.PORT || 8007;
const app = express();
const fs = require('fs').promises

// Don't worry about these 4 lines below
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("createcard");
});

app.post("/", async (req, res) => {
  let data = req.body;
  let name = req.body.name;
  let aboutMe = req.body.aboutMe
  let git = req.body.git
  let twitter = req.body.twitter
  let books = req.body.books
  let artists = req.body.artists

  console.log(data)
  const database = await fs.readFile('database.json', "utf8");
  const obj = JSON.parse(database)
  await fs.writeFile('database.json', JSON.stringify(obj))

  res.render("homepage", {id: Math.random().toString(16).slice(2), name: name, aboutMe: aboutMe, git: git, twitter: twitter, books: books, artists: artists })
})

app.get("/people/:id", (req, res) => {
  res.render("people");
});

app.get("/:id/photos", (req, res) => {
  const id = req.params.id;
});

app.listen(PORT, () => {
  console.log(`Server now is running at http://localhost:${PORT} 🚀`);
});
