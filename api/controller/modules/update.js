let models = require("../../model/models");
const update = (reqBody, res) => {
    reqBody.updatedAt = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    models.Post.findByIdAndUpdate(reqBody.id, reqBody.post, { new: true }, (err, doc) => {
        if (err) {
            console.log("error");
            res.status(200).send({ error: true, success: false, data: null })
        } else {
            console.log("success");
            res.status(200).send({ error: false, success: true, data: doc })
        }
    })
}
module.exports = update;