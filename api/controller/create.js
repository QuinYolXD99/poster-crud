let models = require("../model/models");
let timestamp = require("./timestamp")
module.exports = (reqBody, res) => {
    reqBody = timestamp(reqBody)
    
    let post = new models.Post(reqBody);
    // console.log(post);
    post.save()
        .then(result => {
            res.status(200).send({ error: false, success: true, data: result })
        })
        .catch(err => {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        });
}





