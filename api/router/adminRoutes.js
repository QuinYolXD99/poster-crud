const express = require("express");
const routes = express.Router();
const upload = require("../config/multer_upload");
//controller
const controller = require('../controller/admin_controller');
// login
routes.route("/login").post((req, res) => {
    controller.login(req.body, res);
});

routes.route("/register").post(upload.single("avatar"), (req, res) => {
    let credentials = JSON.parse(req.body.credentials);
    credentials.avatar = `http://localhost:4001/files/${req.file.filename}`
    controller.register(credentials, res);
});

routes.route("/retrievebylocation").post((req, res) => {
    controller.retrieve_by_location.retrieve_by_location(req.body, res);
});

routes.route("/retrievebycategory").post((req, res) => {
    controller.retrieve_by_category.retrieve_by_category(req.body, res);
});

routes.route("/create").post((req, res) => {
    controller.create(req.body, res);
});

routes.route("/update").post(upload.single("avatar"), (req, res) => {
    console.log(req.file);
    let credentials = JSON.parse(req.body.credentials);
    if (req.file) {
        credentials.account.avatar = `http://localhost:4001/files/${req.file.filename}`
    }
    controller.update(credentials, res);
});

routes.route("/deleteProfile/:id").get((req, res) => {

    controller.delete(req.params.id, res);
});

routes.route("/analyzeByLocation").get((req, res) => {
    controller.analyzeByLocation(res);
});

routes.route("/analyzeByCategory").get((req, res) => {
    controller.analyzeByCategory(res);
});

routes.route("/analyzeByMonth").get((req, res) => {
    controller.analyzeByMonth(res);
});
module.exports = routes;