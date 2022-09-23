const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// html Route
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Note api Route
app.get('/api/notes', (req, res) => {
    const currentNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(currentNote)
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = Math.floor(Math.random() *1000);
    const currentNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    currentNote.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(currentNote));
    res.json(newNote);
})

app.delete('/api/notes/:id', (req, res) => {
    const currentNote = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const noteId = req.params.id;
    currentNote = JSON.parse(currentNote).filter((note) => {
       return note.id !== noteId });
    fs.writeFileSync('db/db.json', JSON.stringify(currentNote));
    res.json(currentNote);
})

app.listen(PORT, () =>
    console.log(`App lisening at http://localhost:${PORT}`)
);
