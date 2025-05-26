const express = require('express');
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  res.render('home');
});

// Blog list page
app.get('/blog', (req, res) => {
  fs.readdir(path.join(__dirname, 'posts'), (err, files) => {
    if (err) return res.status(500).send('Error reading posts');
    const posts = files.filter(f => f.endsWith('.md')).map(f => ({
      slug: f.replace(/\.md$/, ''),
      title: f.replace(/-/g, ' ').replace(/\.md$/, '')
    }));
    res.render('blog', { posts });
  });
});

// Individual blog post page
app.get('/blog/:slug', (req, res) => {
  const postPath = path.join(__dirname, 'posts', req.params.slug + '.md');
  fs.readFile(postPath, 'utf8', (err, content) => {
    if (err) return res.status(404).send('Post not found');
    const html = marked.parse(content);
    res.render('post', { title: req.params.slug.replace(/-/g, ' '), content: html });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 