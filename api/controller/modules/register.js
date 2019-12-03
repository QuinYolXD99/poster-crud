let models = require("../../model/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = function (credentials, res) {    
    credentials.joined = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    credentials.password = bcrypt.hashSync(credentials.password, 10);
    console.log(credentials);
    models.User.find({ 'profile.username':  credentials.username },
        (err, user) => {
            if (!err) {
                if (user.length) {
                    res.status(200).json({ exist: true });
                } else {
                    let new_user = new models.User({ profile: credentials, posts: [] });
                    new_user
                        .save()
                        .then(saved => {
                            let token = jwt.sign({ user: { id: saved._id, username: saved.profile.username } }, "pictalk");
                            res.status(201).json({ error: { status: false, message: null }, auth: true, token: token, exist: false });
                        })
                        .catch(err => {
                            res.status(503).json({ error: err, auth: false, token: null });
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