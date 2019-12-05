const express = require("express");
const routes = express.Router();
//controller
const controller = require('../controller/admin_controller');
// login
routes.route("/login").post((req, res) => {
    controller.login(req.body, res);
});

routes.route("/register").post((req, res) => {
    controller.register(req.body, res);
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

routes.route("/retrieveAllPosts").post((req, res) => {
    controller.retrieveAllPosts.retrieveAllPosts(req.body, res);
});

routes.route("/retrieveOwnPosts").post((req, res) => {
    controller.retrieveAllPosts.retrieveOwnPosts(req.body, res);
});

routes.route("/update").post((req, res) => {
    controller.update(req.body, res);
});

routes.route("/delete").post((req, res) => {
    controller.delete(req.body, res);
});

routes.route("/analyze").post((req, res) => {
    controller.analyze(req.body, res);
});

module.exports = routes;