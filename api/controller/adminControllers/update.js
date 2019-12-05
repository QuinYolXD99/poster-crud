let models = require("../../model/models");
let timestamp = require("./timestamp")
const update = (reqBody, res) => {
    console.log(reqBody);
    
    // models.Post.findByIdAndUpdate(reqBody._id, reqBody.post, { new: true }, (err, doc) => {
    //     console.log(reqBody.post);
    //     // Handle any possible database errors
    //     if (err) {
    //         console.log("error");
    //         res.status(200).send({ error: true, success: false, data: null })
    //     } else {
    //         console.log("success");
    //         res.status(200).send({ error: false, success: true, data: doc })
    //     }
    // })
}
module.exports = update