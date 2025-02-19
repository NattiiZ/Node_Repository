require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require("express");
const req = require("express/lib/request");
const app = express();


app.get("/", (req, res) => 
{
    res.send("Hello World! Nattawut");
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


console.log(process.env.Msg);