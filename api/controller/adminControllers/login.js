const jwt = require("jsonwebtoken");
let models = require("../../model/models");
const bcrypt = require("bcryptjs");

module.exports = function(credentials, res) {
    models.User.findOne({ 'account.username': credentials.username }, (err, admin) => {
        if (err) {
            res.json(err);
        } else {
            if (admin !== null) {
                bcrypt
                    .compare(credentials.password, admin.account.password)
                    .then(match => {
                        if (match) {
                            let token = jwt.sign({ admin: admin }, "pictalk");
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