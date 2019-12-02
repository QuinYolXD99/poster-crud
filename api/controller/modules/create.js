let models = require("../../model/models");
module.exports = (reqBody, res) => {
    reqBody.user = mongooseTypes.ObjectId(reqBody.user);
    reqBody.createdAt = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let post = new models.Post(reqBody);
    console.log(post);
    post.save()
        .then(result => {
            models.Post.findByIdAndUpdate({ _id: reqBody.user }, { $push: { posts: result._id } },
                (error, success) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
                })
            res.status(200).send({ error: false, success: true, data: result })
        })
        .catch(err => {
            res.status(200).send({ error: { body: err, status: true }, success: false })
        });
}