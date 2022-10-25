const express = require('express');
const path = require('path');
const fs = require('fs');
let currentNnote = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// html routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//api routes
app.get('/api/notes/', (req, res) => {
    note = JSON.parse(fs.readFileSync("./db/db.json"))
    res.json(note);
})

app.post('/api/notes/', (req, res) => {
    const { title, text } = req.body;
    const newNote = { title, text };
    newNote.id = Math.floor(Math.random()*100);
    currentNnote.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(currentNnote));
    res.json(currentNnote);
})

// DELETE ROUTE not working currently
// app.delete('/api/notes/:id', (req, res) => {
//     const noteId = req.params.id;
//     currentNnote = JSON.parse(currentNnote).filter((note) => {
//         return note.id !== noteId 
//     });
//     fs.writeFileSync("./db/db.json", JSON.stringify(currentNnote));
//     res.json(currentNnote);
// });

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})