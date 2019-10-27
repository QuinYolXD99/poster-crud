const express = require("express");
const routes = express.Router();

//MODELS
const create = require("./models/create")
const retrieve = require("./models/retrieve")
const update = require("./models/update")
const remove = require("./models/delete")
//create
routes.route("/upload").post((req, res) => {    
    create(req.body, res)
});
//retrieve
routes.route("/retrieve").get((req, res) => {
    retrieve(res)
});
// update
routes.route("/update").post((req, res) => {
    update.updateTodo(req.body, res)
});
// delete
routes.route("/delete").post((req, res) => {
    remove(req.body, res);
});
// routes.route("/mark").post((req, res) => {
//     update.markTodo(req.body, res);
// });



module.exports = routes;