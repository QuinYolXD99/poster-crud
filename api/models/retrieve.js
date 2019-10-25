let models = require("../db.model");
module.exports = function (res) {
    models.Todos.find({}, (err, todos) => {
        if (err) {
            res.status(200).send({ error: { body: err, status: true }, success: false, data: null })
        } else {
            res.status(200).send({ error: false, success: true, data: todos })
        }
    }).catch(err => {
        if (err) {
            res.status(200).send({ error: { body: err, message:"service unavailable",status: true }, success: false, data: null })
        }
    });
}