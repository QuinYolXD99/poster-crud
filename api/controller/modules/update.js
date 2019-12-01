let models = require("../../model/new_models");
let timestamp = require("./timestamp")


const update = (reqBody, res) => {
    reqBody = timestamp(reqBody)
    models.Post.findByIdAndUpdate(reqBody.id, reqBody.post, { new: true }, (err, doc) => {
        console.log("update done!");
        // Handle any possible database errors
        if (err) {
            console.log("error");
            res.status(200).send({ error: true, success: false, data: null })
        } else {
            console.log("success");
            res.status(200).send({ error: false, success: true, data: doc })
        }
    })
}
module.exports = update