let models = require("../../model/models");
module.exports = (id, res) => {
    models.User.findByIdAndUpdate(id, { $set: { disabled: true } }, { new: true }, (err, saved) => {
        if (err) {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        } else {
            if (saved) {
                res.status(200).send({ error: false, success: true })
            } else {
                res.status(200).send({ error: { body: err, status: true }, success: false })
            }
        }
    })

}