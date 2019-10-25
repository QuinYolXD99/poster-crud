let models = require("../db.model");
module.exports = (reqBody, res) => {
    console.log(reqBody);
    res.end()
    // let todo_item = new models.Todos(reqBody);
    // todo_item.save()
    //     .then(res => {
    //         res.status(200).send({ error: false, success: true })
    //     })
    //     .catch(err => {
    //         res.status(200).send({ error: { body: err, status: true }, success: false })

    //     });
}
