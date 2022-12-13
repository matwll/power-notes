const uuid = require("uuid");
const express = require("express");
const path = require('path');
const fs = require('fs');
const { json } = require("express");

const generateUuid = uuid.v4();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html')) 
});

app.get('/api/notes', (req, res) => {
    res.status(200).json(reviews);
})

app.post('/api/notes', (req, res) => {
    console.log(req);

    const { title, text } = req.body;

    if (title && text){
        const newNote = {
            title,
            text,
            noteId: generateUuid(),
        }
    }

    fs.readFile('./db/db.json', (err, notes) => {
        if (err){
            console.log(err);
        }else{
            let savedNotes = JSON.parse(notes);

            savedNotes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(savedNotes, null, 4));
        }
    })
    
    const response = {
        status: 'success',
        body: newNote,
      };

    res.json(response)
    console.log(res);
})

app.listen(PORT);