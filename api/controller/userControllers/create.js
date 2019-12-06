let models = require("../../model/models");
const mongoose = require('mongoose');
module.exports = (reqBody, res) => {
    reqBody.user = mongoose.Types.ObjectId(reqBody.user);
    reqBody.createdAt = {
        month: new Date().getMonth(),
        date: new Date().getDate(),
        year: new Date().getFullYear(),
    };
    let post = new models.Post(reqBody);
    post.save()
        .then(result => {
            models.User.findByIdAndUpdate({ _id: reqBody.user }, { $push: { posts: result._id } }, { new: true },
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