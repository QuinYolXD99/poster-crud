let models = require("../db.model");
module.exports  =  (reqBody, res)=> {
    models.Post.findOneAndUpdate({ "_id": reqBody.id },
        {
            "$set": {
                image: reqBody.post.image,
                caption: reqBody.post.caption,

            }

        }, {new: true, useFindAndModify: false}).then(post => {
            console.log(post);
            
            res.status(200).send({ error: false, success: true, data: post })
        }).catch(err => {
            res.status(200).send({ error: true, success: false, data: null })
        })
}
