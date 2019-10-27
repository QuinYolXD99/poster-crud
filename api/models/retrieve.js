let models = require("../db.model");
module.exports =  (res)=> {
    models.Post.find({}, (err, images) => {
        
        if (err) {
            res.status(200).send({ error: { body: err, message:"no images",status: true }, success: false, data: null })
        } else {
            res.status(200).send({ error: false, success: true, data: images })
        }
    }).catch(err => {
        if (err) {
            res.status(200).send({ error: { body: err, message:"service unavailable",status: true }, success: false, data: null })
        }
    });
}