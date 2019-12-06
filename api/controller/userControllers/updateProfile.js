let models = require("../../model/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const update = (reqBody, res) => {
    if (reqBody.account.new_password) {
        reqBody.account.password = bcrypt.hashSync(reqBody.account.new_password, 10);
    }
    delete reqBody.account.new_password;
    models.User.findByIdAndUpdate(reqBody._id, { $set: { account: reqBody.account } }, { new: true }, (err, saved) => {
        if (err) {
            console.log("error");
            res.status(200).send({ error: true, success: false, data: null })
        } else {
            console.log(saved);
            res.status(200).send({ error: false, success: true, token: saved })
        }
    })
}
module.exports = update