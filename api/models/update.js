let models = require("../db.model");
module.exports = (reqBody, res) => {
    console.log(reqBody);
    
    models.Post.findByIdAndUpdate(reqBody.id, reqBody.post, { new: true }, (err, doc) => {
        console.log(doc);
        console.log(err);
        
        // Handle any possible database errors
        if (err) return res.status(200).send({ error: true, success: false, data: null })
        return res.status(200).send({ error: false, success: true, data: doc })
    })
    // models.Post.findOneAndUpdate({ "_id": reqBody.id }, reqBody.post, (err, post) => {
    //     console.log(err);
    //     console.log(post);

    //     if (err) return res.status(200).send({ error: true, success: false, data: null })
    //     return res.status(200).send({ error: false, success: true, data: post })
    // });
}
