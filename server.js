const uuid = require("uuid");
const express = require("express");
const path = require('path');
const fs = require('fs');

const generateUuid = uuid.v4();
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html')) 
});


app.listen(3000);