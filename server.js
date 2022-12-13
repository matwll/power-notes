const uuid = require("uuid");
const express = require("express");
const path = require('path');
const fs = require('fs');
const savedNotes = require('./db/db.json');
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
    fs.readFile('./db/db.json', (err, notes) => {
        if (err){
            console.log(err);
        }else{
            res.send(notes);
        }
    });
})

app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;

    if (title && text){
        const newNote = {
            title,
            text,
            noteId: generateUuid,
        }
        fs.readFile('./db/db.json', (err, notes) => {
            if (err){
                console.log(err);
            }else{
                let parseNotes = JSON.parse(notes);
    
                parseNotes.push(newNote);

                fs.writeFileSync('./db/db.json', JSON.stringify(parseNotes, null, 4));
            }
        })
        
        const response = {
            status: 'success',
            body: newNote,
          };
          res.json(newNote);
    }
})

app.listen(PORT);