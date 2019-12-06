let models = require("../../model/models");
module.exports = (reqBody, res) => {
    models.User.deleteOne({ _id: reqBody._id }, (err) => {
        if (err) {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        } else {
            res.status(200).send({ error: false, success: true })
        }
    })

}