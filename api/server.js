const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4001;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/DB");
const routes = require("./router");
const path = require('path');
const createAdmin = require("./createAdmin")
mongoose.Promise = global.Promise;
console.log("connecting....");

mongoose.connect(config.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err, data) => {
    if (err) {
        console.log("error : " + err);
    } else {
        console.log("database is connected!");
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use("/admin", routes.adminRoutes);
app.use("/user", routes.userRoutes);

app.use('/files', express.static(path.join(__dirname, 'public/uploads')))
app.listen(PORT, () => {
    createAdmin();
    console.log("Server is running on Port:", PORT);
})

