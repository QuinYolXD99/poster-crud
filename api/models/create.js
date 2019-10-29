let models = require("../db.model");
module.exports = (reqBody, res) => {
    console.log(reqBody);

    let post = new models.Post(reqBody);
    post.save()
        .then(result => {
            res.status(200).send({ error: false, success: true, data: result })
        })
        .catch(err => {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        });
}