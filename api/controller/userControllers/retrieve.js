let models = require("../../model/models");
let mongoose = require('mongoose')
let retrieveOwn = (id, res) => {
    models.Post
        .find({ user: mongoose.Types.ObjectId(id), removed: false })
        .exec((err, images) => {
            if (err) {
                res.status(200).send({ error: { body: err, message: "no images", status: true }, success: false, data: null })
            } else {
                res.status(200).send({ error: false, success: true, data: images })
            }
        })
}
let retrieveAll = (query, res) => {
    models.Post
        .find(query, { __v: false })
        .populate('user', '-posts -profile.password -profile._id -__v')
        .exec((err, images) => {
            if (err) {
                res.status(200).send({ error: { body: err, message: "no images", status: true }, success: false, data: null })
            } else {
                res.status(200).send({ error: false, success: true, data: images })
            }
        })
}
module.exports = { retrieveOwn, retrieveAll }