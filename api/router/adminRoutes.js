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


module.exports = routes;