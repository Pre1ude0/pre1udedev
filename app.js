const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("img"));
app.use(express.static("css"));
app.use(express.static("js"));

app.get("/", (req, res) => {
    if (req.headers.referrer) {
		console.log("Referrer: ", req.headers.referrer);
	}
    res.render("main");
});

app.get("/referrer", (req, res) => {
    let referrer = req.headers.referrer;
    res.render("blankie");
    console.log("Referer: ", referrer);
});

app.get("/desktop", (req, res) => {
   	res.render("desktop");
});

app.use((req, res) => {
    res.status(404).redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
