const uuid = require("uuid");
const express = require("express");
const path = require('path');
const fs = require('fs');

const generateUuid = uuid.v4();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html')) 
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, notes) => {
        if (err){
            console.log(err);
        }else{
            const savedNotes = JSON.parse(notes);
        }
    })
})

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, notes) => {
        if (err){
            console.log(err);
        }else{
            const savedNotes = JSON.parse(notes);
        }
    })
    fs.writeFile('./db/db.json', (err) => {
        
    })
})

app.listen(PORT);