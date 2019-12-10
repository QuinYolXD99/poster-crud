let models = require("../../model/models");
module.exports = (reqBody, res) => {
    models.Post.findByIdAndUpdate({ _id: reqBody }, { $set: { removed: true } }, (err) => {
        if (err) {
            res.status(500).send({ error: { body: err, status: true }, success: false })
        } else {
            res.status(200).send({ error: false, success: true })
        }
    })
}