const path = require("path");
const express = require("express");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("img"));
app.use(express.static("css"));
app.use(express.static("js"));
app.use(xss());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: "Too many submissions. Try again later.",
});

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

app.post("/api/guestbook", limiter, (req, res) => {
    const { name, message, website } = req.body;

    if (!name || !message || name.length > 50 || message.length > 300) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const entry = {
        name: name.trim(),
        message: message.trim(),
        date: new Date().toISOString(),
        website: website ? website.trim().replace(/\/+$/, "") : "",
    };

    const file = "./guestbook.json";
    const entries = fs.existsSync(file)
        ? JSON.parse(fs.readFileSync(file))
        : [];

    entries.push(entry);
    fs.writeFileSync(file, JSON.stringify(entries, null, 2));

    res.status(200).json({ success: true });
});

// Get entries
app.get("/api/guestbook", (req, res) => {
    const file = "./guestbook.json";
    const entries = fs.existsSync(file)
        ? JSON.parse(fs.readFileSync(file))
        : [];

    res.status(200).json({ entries });
});

app.use((req, res) => {
    res.status(404).redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
