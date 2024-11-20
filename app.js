const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("img"));
app.use(express.static("css"));
app.use(express.static("js"));

app.get("/", (req, res) => {
  const referer = req.get("Referer");
  if (referer) {
    res.sendFile(path.join(__dirname, "blankie.png"));
    console.log("Referer: ", referer);
  } else {
    res.render("main");
  }
});

app.use((req, res) => {
  res.status(404).redirect("/");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
