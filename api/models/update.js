let models = require("../db.model");
let timestamp = require("./timestamp")


const update = (reqBody, res) => {
    reqBody = timestamp(reqBody)
    console.log("updating....");

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
const like = (reqBody, res) => {
    models.Post.findOne({ _id: reqBody.id }, function (err, post) {
        post.priority = !post.priority
        post.updatedAt = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
        post.save(function (err, post) {
            if (err) {
                res.status(200).send({ error: true, success: false })
            } else {
                res.status(200).send({ error: false, success: true })
            }
        });
    });
}
module.exports = { update, like }
        // models.Post.findOneAndUpdate({ "_id": reqBody.id }, reqBody.post, (err, post) => {
        //     console.log(err);
        //     console.log(post);

        //     if (err) return res.status(200).send({ error: true, success: false, data: null })
        //     return res.status(200).send({ error: false, success: true, data: post })
        // });

