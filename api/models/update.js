let models = require("../db.model");
var updateTodo = function (reqBody, res) {
    models.Todos.findOneAndUpdate({ "_id": reqId },
        {
            "$set": {
                name: reqBody.name,
                date_added: reqBody.date_added,
                date_done: reqBody.date_done,
                done: reqBody.done
            }

        }).exec(function (err, todos) {
            if (err) {
                res.status(200).send({ error: { body: err, status: true }, success: false, data: null })
            } else {
                res.status(200).send({ error: false, success: true, data: todos })
            }

        })
}

var markTodo = function (reqBody, res) {
    models.Todos.findOneAndUpdate({ "_id": reqId },
        {
            "$set": {
                date_done: reqBody.date_done,
                done: reqBody.done
            }

        }).exec(function (err, todos) {
            if (err) {
                res.status(200).send({ error: { body: err, status: true }, success: false, data: null })
            } else {
                res.status(200).send({ error: false, success: true, data: todos })
            }

        })
}

module.exports = {updateTodo,markTodo}