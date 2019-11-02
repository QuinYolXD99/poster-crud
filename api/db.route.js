const express = require("express");
const routes = express.Router();
//modules
const create = require("./modules/create")
const retrieve = require("./modules/retrieve")
const update = require("./modules/update")
const remove = require("./modules/delete")
const login = require("./modules/login")
const register = require("./modules/register")
//create
routes.route("/upload").post((req, res) => {
    create(req.body, res)
});
//retrieve
routes.route("/retrieve").get((req, res) => {

    return retrieve.retrieveOwn(req.body.id, res)
});
//retrieve
routes.route("/retrieveAll").get((req, res) => {
    retrieve.retrieveAll(req.body._id, res)
});
// update
routes.route("/update").post((req, res) => {
    update.update(req.body, res)
});
// delete
routes.route("/delete").post((req, res) => {
    // console.log(req.body);
    remove(req.body, res);
});

routes.route("/like").post((req, res) => {
    // console.log(req.body);   
    update.like(req.body, res);
});

// login
routes.route("/login").post((req, res) => {
    login(req.body, res);
});

routes.route("/register").post((req, res) => {
    register(req.body, res);
});


// register
// routes.route("/mark").post((req, res) => {
//     update.markTodo(req.body, res);
// });



module.exports = routes;