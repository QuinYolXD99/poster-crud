let models = require("../../model/models");
const bcrypt = require("bcryptjs");

module.exports = function(credentials, res) {
    models.User.findOne({ 'account.username': credentials.username, 'disabled': false }, (err, admin) => {
        if (err) {
            res.json(err);
        } else {
            if (admin !== null) {
                bcrypt
                    .compare(credentials.password, admin.account.password)
                    .then(match => {
                        if (match) {
                            res.status(200).send({
                                error: false,
                                auth: true,
                                token: admin,
                            });
                        } else {
                            return res
                                .status(202)
                                .send({ error: true, auth: false, token: null });
                        }
                    })
                    .catch(err => {
                        res.json(err);
                    });
            } else {
                return res.status(200).send({ error: true, auth: false, token: null });
            }
        }
    }).catch(err => {
        if (err) {
            res.status(503).send({ error: true, auth: false, token: null });
        }
    });
};