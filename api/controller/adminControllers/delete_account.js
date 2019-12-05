let models = require("../../model/models");
module.exports = (id, res) => {
    models.Admin.deleteOne({ _id: id }, (err) => {
        if (err) {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        } else {
            res.status(200).send({ error: false, success: true })
        }
    })

}

