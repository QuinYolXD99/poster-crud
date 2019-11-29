let models = require("../model/models");
let timestamp = require("./timestamp")
module.exports = (reqBody, res) => {
    reqBody = timestamp(reqBody)
    let post = new models.Post(reqBody);
    posts.save()
        .then(result => {
            console.log(result._id);    
            post.findByIdAndUpdate({ _id: result._id }, { $push: { posts: result._id } }, (err) => {
                if (err) {
                    res.status(200).send({ error: { body: err, status: true }, success: false })
                } else {
                    res.status(200).send({ error: false, success: true })
                }
            })
            res.status(200).send({ error: false, success: true, data: result })
        })
        .catch(err => {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        });
}





