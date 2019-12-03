const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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
            res.status(503).send({ error: true, auth: false, token: null });
        }
    });
};