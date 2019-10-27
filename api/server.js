const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
const routes = require("./db.route");

mongoose.Promise = global.Promise;
console.log("connecting....");

mongoose.connect(config.DB, { useNewUrlParser: true }, (err, data) => {
    if (err) {
        console.log("error : " + err);
    } else {
        console.log("database is connected!");
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


app.use("/crud", routes);

app.listen(PORT, function () {
    console.log("Server is running on Port:", PORT);
});