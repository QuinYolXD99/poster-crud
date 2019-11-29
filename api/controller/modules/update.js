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
<<<<<<< HEAD:api/modules/update.js
const like = (reqBody, res) => {
    models.Post.findOne({ _id: reqBody.id }, function(err, post) {
        post.priority = !post.priority
        post.updatedAt = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
        post.save(function(err, post) {
            if (err) {
                res.status(200).send({ error: true, success: false })
            } else {
                res.status(200).send({ error: false, success: true })
            }
        });
    });
}
module.exports = { update, like }
=======
module.exports = update
>>>>>>> cbc1aebe14071309e0955c4faaaea7443eb65e4f:api/controller/modules/update.js
