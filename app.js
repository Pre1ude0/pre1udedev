const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use(express.static('js'));

const blogsDir = path.join(__dirname, 'blogs');
let blogs = Array();
let blogNames = Array();

function openAndSaveBlogs() {
    fs.readdirSync(blogsDir).forEach((filename) => {
        if (filename.endsWith('.md')) {
            const filePath = path.join(blogsDir, filename);
            const blogName = filename.slice(0, -3); // Remove the file extension
            const blogContent = fs.readFileSync(filePath, 'utf8');
            blogs.push(blogContent);
            blogNames.push(blogName);
        }
    });
}

openAndSaveBlogs();

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.get('/blogs', (req, res) => {
    res.render('blogs', { blogNames });
});

app.get('/blogs/:blog', (req, res) => {
    const blog = req.params.blog;
    const index = blogNames.indexOf(blog);
    if (!blog || index == -1) {
        res.redirect('/blogs');
    } else {
        // blogText = blogs[index].replace(/\n/g, '<br>');
        res.render('blog', { blog: blogs[index], blogName: blog});
    }
});

app.get('/discord', (req, res) => {
    res.redirect('https://discord.gg/5nZVVedbqH');
});

app.get('/test', (req, res) => {
    res.render('test');
});

app.use((req, res) => {
    res.status(404).render('unknown');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
