let models = require("../../model/models");
module.exports = (reqBody, res) => {
    models.User.remove({ _id: reqBody._id }, (err) => {
        if (err) {
            console.log(err);
            res.status(200).send({ error: { body: err, status: true }, success: false })
        } else {
            res.status(200).send({ error: false, success: true })
        }
    })

}