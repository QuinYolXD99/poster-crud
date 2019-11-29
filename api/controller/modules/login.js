const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let models = require("../../model/new_models");

module.exports = function (credentials, res) {
    models.User.findOne({ username: credentials.username }, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            if (user !== null) {
                bcrypt
                    .compare(credentials.password, user.password)
                    .then(match => {
                        if (match) {
                            let token = jwt.sign({ user: { id: user._id, username: user.username } }, "pictalk");
                            res.status(200).send({
                                error: false,
                                auth: true,
                                token: token,
                            });
                        } else {    
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
            res.status(503).send({ error: true , auth: false, token: null });
        }
    });
};