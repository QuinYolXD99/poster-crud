let models = require("../../model/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const update = (reqBody, res) => {
    if (reqBody.account.new_password) {
        reqBody.account.password = bcrypt.hashSync(reqBody.account.new_password, 10);
    }
    delete reqBody.account.new_password;
    console.log(reqBody);

    models.User.findByIdAndUpdate(reqBody._id, { $set: { account: reqBody.account } }, { new: true }, (err, saved) => {
        // Handle any possible database errors
        if (err) {
            console.log("error");
            res.status(200).send({ error: true, success: false, data: null })
        } else {
            console.log(saved);
            let token = jwt.sign({ admin: saved }, "pictalk");
            res.status(200).send({ error: false, success: true, token: token })
        }
    })
}
module.exports = update