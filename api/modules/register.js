/* eslint-disable  */
let models = require("../db.model");
const jwt = require("jsonwebtoken");

module.exports = function (credentials, res) {
    models.User.find({ username: credentials.username },
        (err, user) => {
            if (!err) {
                if (user.length) {
                    res.status(200).json({ exist: true });
                } else {
                    let new_user = new models.User(credentials);
                    new_user
                        .save()
                        .then(data => {
                            let token = jwt.sign({ user: { id: data._id , username: data.username } }, "pictalk");
                            res.status(201).json({ error: { status: false, message: null }, auth: true, token: token, exist: false });
                        })
                        .catch(err => {
                            console.log("error : " + err);
                            res.status(200).json({ error: { status: false, message: null }, auth: false, token: null, exist: true });
                        });
                }
            }
        }
    ).catch(err => {
        if (err) {
            res.status(503).json({
                error: { status: true, message: 'Service unavailable' },
            });
        }
    })
}
