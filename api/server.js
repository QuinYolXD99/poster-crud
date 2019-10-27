const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
// const routes = require("./db.route");
// const create = require("./models/create")
// const multer = require("multer")
const Grid = require("gridfs-stream");
// var storage = create.storage
var upload = require('./models/create');
var model = require("./Photo")

// const upload = multer({ storage });


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

app.post("/crud/upload", (req, res, err) => {
    // console.log(req)
    // res.writeHead(200, {
    //     'Access-Control-Allow-Origin': '*',
    // })
    upload("file", res, (error) => {
        if (error) {
            console.log(error);
            
            // res.redirect('/?msg=3');
            res.status(400).json({ error: { status: 500, body: err, true: true }, data: null })

        } else {
            if (req.file == undefined) {

                //   res.redirect('/?msg=2');
                // res.status(500).json({ error: true })
                res.status(400).json({ error: { status: 500, body: "file is undefined", true: true }, data: null })


            } else {

                /**
                 * Create new record in mongoDB
                 */
                var fullPath = "files/" + req.file.filename;

                var document = {
                    path: fullPath,
                    caption: req.body.caption
                };

                var photo = new Photo(document);
                photo.save(function (error) {
                    if (error) {
                        throw error;
                    }
                    res.redirect("/crud/retrieve")
                });
            }
        }
    });
    // res.end(req.files);
});
app.get("/crud/retrieve", (req, res) => {
    model.find({}, ['path', 'caption'], { sort: { _id: -1 } }, function (err, photos) {
        if (err) {
            console.log("error");
            res.status(400).json({ error: { status: 500, body: err, true: true }, data: null })

        } else {
            res.status(200).json({ error: null, data: photos })
        }
        // res.render('index', { title: 'NodeJS file upload tutorial', msg: req.query.msg, photolist: photos });
    })
    // app.get("/crud/retrieve", (req, res) => {
    //     gfs.files.find().toArray((err, filess) => {
    //         // Check if files
    //         if (!filess || filess.length === 0) {
    //             // res.render('index', { files: false });
    //             console.log("no image");

    //         } else {
    //             filess.map(file => {
    //                 console.log(file);

    //                 if (file.contentType === 'image/jpeg' 
    //                 || file.contentType === 'image/png' 
    //                 || file.contentType === 'image/jpg') {

    //                     //    console.log("image!!!!");
    //                     file.isImage = true;
    //                 } else {
    //                     file.isImage = false;
    //                     //    console.log(" not image!!!!");

    //                 }
    //             });
    //             res.json({iamges :  filess})
    //             // res.render('index', { files: files });
    //         }
    //     });

    //     // gfs.files.find({}, (err, file) => {
    //     //     // Check if file

    //     //     if (!file || file.length === 0) {
    //     //         console.log("No file");

    //     //         return res.status(404).json({
    //     //             err: "No file exists"
    //     //         });
    //     //     }

    //     //     // Check if image
    //     //     if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
    //     //         // Read output to browser
    //     //         res.writeHead(200, {
    //     //             'Access-Control-Allow-Origin': '*',
    //     //         })
    //     //         const readstream = gfs.createReadStream(file.filename);
    //     //         readstream.pipe(res);
    //     //     } else {
    //     //     console.log("Not an image");

    //     //         res.status(404).json({
    //     //             err: "Not an image"
    //     //         });
    //     //     }
    //     // });
    });

    // app.use("/crud", routes);

    app.listen(PORT, function () {
        console.log("Server is running on Port:", PORT);
    });