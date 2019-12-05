const express = require("express");
const routes = express.Router();
//controller
const create = require("../controller/create")
const retrieve = require("../controller/retrieve")
const update = require("../controller/update")
const remove = require("../controller/delete")
const login = require("../controller/login")
const register = require("../controller/register")
//create
routes.route("/upload").post((req, res) => {
    create(req.body, res)
});
//retrieve
routes.route("/retrieve").post((req, res) => {
     retrieve.retrieveOwn(req.body.id, res)
});
//retrieve
routes.route("/retrieveAll").post((req, res) => {
    retrieve.retrieveAll(res)
});
//retrieve
routes.route("/retrieve/Userinfo").post((req, res) => {
    console.log(req.body)
    const _id = req.body.id
    console.log(req.body.id)
    retrieve.findId(_id,res)
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
routes.route("/updateProfile").post((req, res) => {
    let uid= req.body.id
    retrieve.retrieveUserProf(uid,res)
});


// register
// routes.route("/mark").post((req, res) => {
//     update.markTodo(req.body, res);
// });



module.exports = routes;