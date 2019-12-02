let models = require("../../model/models");
const mongoose = require('mongoose');
module.exports = (reqBody, res) => {
    console.log("reqBody:");
    console.log(reqBody);
    reqBody.user = mongoose.Types.ObjectId(reqBody.user);
    reqBody.createdAt = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let post = new models.Post(reqBody);
    post.save()
        .then(result => {
            models.User.findByIdAndUpdate({ _id: reqBody.user }, { $push: { posts: result._id } }, { upsert: true },
                (error, success) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                })
            res.status(200).send({ error: false, success: true, data: result })
        })
        .catch(err => {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        });
}