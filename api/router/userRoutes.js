const express = require("express");
const routes = express.Router();
const upload = require("../config/multer_upload");
//controller
const main_contoller = require('../controller/main_contoller');
//create
routes.route("/upload").post(upload.single('img'), (req, res) => {
    let details = JSON.parse(req.body.details)
    details.images = [`http://localhost:4001/files/${req.file.filename}`];
    main_contoller.create_post(details, res);
});
//retrieve
routes.route("/retrieve").post((req, res) => {
    main_contoller.retrieve_posts.retrieveOwn(req.body.id, res)
});
//retrieveAll
routes.route("/retrieveAll").post((req, res) => {
    main_contoller.retrieve_posts.retrieveAll(res)
});
// update
routes.route("/update").post((req, res) => {
    main_contoller.update_post(req.body, res)
});
// delete
routes.route("/delete").post((req, res) => {
    // console.log(req.body);
    main_contoller.remove_post(req.body, res);
});

// login
routes.route("/login").post((req, res) => {
    main_contoller.login(req.body, res);
});

routes.route("/register").post(upload.single('avatar'), (req, res) => {
    let credentials = JSON.parse(req.body.credentials)
    credentials.avatar = `http://localhost:4001/files/${req.file.filename}`;    
    main_contoller.register(credentials, res);
});

module.exports = routes;