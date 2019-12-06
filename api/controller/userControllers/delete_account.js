let models = require("../../model/models");
module.exports = (reqBody, res) => {
    models.User.remove({ _id: reqBody._id }, (err) => {
        if (err) {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        } else {
            console.log("test");
            res.status(200).send({ error: false, success: true })
        }
    })

}