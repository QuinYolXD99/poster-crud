let models = require("../../model/models");
let timestamp = require("./timestamp")
const bcrypt = require("bcryptjs");
const update = (reqBody, res) => {
    if(reqBody.account.new_password){
        reqBody.account.password =  bcrypt.hashSync(reqBody.account.new_password, 10);
    }
    del reqBody.account.new_password;
    models.Post.findByIdAndUpdate(reqBody._id,$set:{account:reqBody.account}.post, { new: true }, (err, saved) => {
        // Handle any possible database errors
        if (err) {
            console.log("error");
            res.status(200).send({ error: true, success: false, data: null })
        } else {
            console.log("success");
            res.status(200).send({ error: false, success: true, admin: saved })
        }
    })
}
module.exports = update
