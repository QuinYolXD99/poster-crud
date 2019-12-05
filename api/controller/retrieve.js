let models = require("../model/models");
let retrieveOwn = (id, res) => {
    models.Post.find({ userId: id }, (err, images) => {
        if (err) {
            res.status(200).send({ error: { body: err, message: "no images", status: true }, success: false, data: null })
        } else {
            res.status(200).send({ error: false, success: true, data: images })
        }
    }).catch(err => {
        if (err) {
            res.status(200).send({ error: { body: err, message: "service unavailable", status: true }, success: false, data: null })
        }
    });
}
let retrieveAll = (res) => {
    models.Post.find({}, (err, images) => {

        if (err) {
            res.status(200).send({ error: { body: err, message: "no images", status: true }, success: false, data: null })
        } else {
            res.status(200).send({ error: false, success: true, data: images })
        }
    }).catch(err => {
        if (err) {
            res.status(200).send({ error: { body: err, message: "service unavailable", status: true }, success: false, data: null })
        }
    });
}

function findId(idy) {
        models.User.findOne({ id: idy }, (err, res) => {
            if (err) {
                res.status(200).send({ error: { body: err, message: "no data found", status: true }, success: false, data: null })
            } else {
                console.log("mao ni res "+res);
                res.status(200).send({ error: false, success: true, data: {username} })
            }
        
    }).catch(err => {
        if (err) {
            res.status(200).send({ error: { body: err, message: "service unavailable", status: true }, success: false, data: null })
        }
    });
}

module.exports = { retrieveOwn, retrieveAll,findId }