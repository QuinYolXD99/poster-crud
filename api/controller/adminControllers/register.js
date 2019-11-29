/* eslint-disable  */
let models = require("../../model/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


module.exports = function (credentials, res) {
    credentials.joined = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    credentials.password = bcrypt.hashSync(this.account.password, 10);

    console.log(credentials);
    
    models.Admin.find({ username: credentials.username},
        (err, admin) => {
            if (!err) {
                if (admin.length) {
                    res.status(200).json({ exist: true });
                } else {
                    let new_admin = new models.Admin({account :credentials,role:"admin"});
                    new_admin
                        .save()
                        .then(data => {
                            let token = jwt.sign({ admin: { id: data._id , username: data.username } }, "pictalk");
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

