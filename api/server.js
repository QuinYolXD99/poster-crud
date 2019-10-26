const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
const routes = require("./db.route");
const create = require("./models/create")
const multer = require("multer")
const Grid = require("gridfs-stream");
var storage = create.storage
const upload = multer({ storage });


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
console.log("connecting....");
const conn = mongoose.createConnection(config.DB);
mongoose.connect(config.DB, { useNewUrlParser: true }, (err, data) => {
    if (err) {
        console.log("error : " + err);
    } else {
        console.log("database is connected!");
    }
});

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    console.log("Connection Successful");
});

app.post("/crud/upload", upload.single("file"), (req, res, err) => {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
    })
    res.end(req.files);
});

app.get("/crud/retrieve", (req, res) => {
    console.log("retrieve")
    gfs.files.find().toArray((err, filess) => {
        // Check if files
        if (!filess || filess.length === 0) {
            // res.render('index', { files: false });
            console.log("no image");
            
        } else {
            filess.map(file => {
                console.log(file);
                
                if (file.contentType === 'image/jpeg' ||file.contentType === 'image/png') {
                   
                   console.log("image!!!!");
                    // file.isImage = true;
                } else {
                   console.log(" not image!!!!");

                }
            });
            res.json(filess)
            // res.render('index', { files: files });
        }
    });

    // gfs.files.find({}, (err, file) => {
    //     // Check if file

    //     if (!file || file.length === 0) {
    //         console.log("No file");

    //         return res.status(404).json({
    //             err: "No file exists"
    //         });
    //     }

    //     // Check if image
    //     if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
    //         // Read output to browser
    //         res.writeHead(200, {
    //             'Access-Control-Allow-Origin': '*',
    //         })
    //         const readstream = gfs.createReadStream(file.filename);
    //         readstream.pipe(res);
    //     } else {
    //     console.log("Not an image");

    //         res.status(404).json({
    //             err: "Not an image"
    //         });
    //     }
    // });
});

// app.use("/crud", routes);

app.listen(PORT, function () {
    console.log("Server is running on Port:", PORT);
});