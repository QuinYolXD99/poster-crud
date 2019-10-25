let models = require("../db.model");
module.exports = (reqBody, res)=> {
    models.Todos.findByIdAndRemove(ObjectId(reqBody.id), function (err) {
        if (err) {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        } else {
            res.status(200).send({ error: false, success: true })
        }
    })

}