const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("img"));
app.use(express.static("css"));
app.use(express.static("js"));

app.use('/css-pride-flag', express.static(path.join(__dirname, 'node_modules/@vkea/pridecss/css')));


app.get("/", (req, res) => {
    if (req.headers.referer) {
        console.log("Referrer: ", req.headers.referer);
        console.log("Host: ", req.headers.host);
    }
    res.render("main");
});

app.get("/referer", (req, res) => {
    res.render("blankie");
});

app.get("/desktop", (req, res) => {
    res.render("desktop");
});

app.get("/blogs/:hyperlink", (req, res) => {
    const hyperlink = req.params.hyperlink;
    const blogPath = path.join(__dirname, "blogs", `${hyperlink}.md`);

    fs.readFile(blogPath, "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading blog file: ${err.message}`);
            return res.status(404).render("main", {
                error: "Blog not found!",
            });
        }

        res.render("blog", { content: data, title: hyperlink });
    });
});

app.use((req, res) => {
    res.status(404).redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
