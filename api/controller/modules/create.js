let models = require("../../model/models");
module.exports = (reqBody, res) => {
    req.body.createdAt = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let post = new models.Post(reqBody);
    post.save()
        .then(result => {
            res.status(200).send({ error: false, success: true, data: result })
        })
        .catch(err => {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        });
}