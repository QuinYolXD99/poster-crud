const jwt = require("jsonwebtoken");
let models = require("../../model/models");
const bcrypt = require("bcryptjs");
<<<<<<< HEAD:api/controller/adminControllers/login.js

module.exports = function (credentials, res) {
    models.Admin.findOne({ 'account.username': credentials.username }, (err, admin) => {        
        if (err) {
            res.json(err);
        } else {
             
            if (admin !== null) {
                bcrypt
                    .compare(credentials.password, admin.account.password)
                    .then(match => {
                        if (match) {
                            let token = jwt.sign({ admin: { id: admin._id, username: admin.account.username } }, "pictalk");
=======
let models = require("../../model/models");

module.exports = (credentials, res) => {
    models.User.findOne({ 'profile.username': credentials.username }, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            console.log(user);
            if (user !== null) {
                bcrypt
                    .compare(credentials.password, user.profile.password)
                    .then(match => {
                        if (match) {
                            let token = jwt.sign({ user: user }, "pictalk");
>>>>>>> master:api/controller/modules/login.js
                            res.status(200).send({
                                error: false,
                                auth: true,
                                token: token,
                            });
<<<<<<< HEAD:api/controller/adminControllers/login.js
                        } else {    
                        
                            
=======
                        } else {
>>>>>>> master:api/controller/modules/login.js
                            return res
                                .status(202)
                                .send({ error: true, auth: false, token: null });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.json(err);
                    });
            } else {
                console.log("not found!");
                return res.status(200).send({ error: true, auth: false, token: null });
            }
        }
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).send({ error: true, auth: false, token: null });
        }
    });
};