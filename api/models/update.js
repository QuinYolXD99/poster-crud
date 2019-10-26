let models = require("../db.model");
var updatePost = function (reqBody, res) {
    models.Post.findOneAndUpdate({ "_id": reqId },
        {
            "$set": {
                name: reqBody.name,
                date_added: reqBody.date_added,
                date_done: reqBody.date_done,
                done: reqBody.done
            }

        }).exec(function (err, todos) {
            if (err) {
                res.status(200).send({ error: { body: err, status: true }, success: false, data: null })
            } else {
                res.status(200).send({ error: false, success: true, data: todos })
            }

        })
}

module.exports = {updatePost}