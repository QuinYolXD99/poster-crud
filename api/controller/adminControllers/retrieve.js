let models = require("../../model/models");

let retrieveAllPosts = (req, res) => {
  models.Post.find({})
    .populate("userId")
    .exec((err, images) => {        
      if (err) {
        res.send({
          error: { body: err, message: "no images", status: true },
          success: false,
          data: null
        });
      } else {
        res.send({ error: false, success: true, data: images });
      }
    });
};

let retrieveOwnPosts = (id, res) => {
    models.Post
        .find({ userId: id })
        .populate('userId')
        .exec((err, images) => {
            console.log(images);
            if (err) {
                res.status(200).send({ error: { body: err, message: "no images", status: true }, success: false, data: null })
            } else {
                res.status(200).send({ error: false, success: true, data: images })
            }
        })
}

module.exports = { retrieveAllPosts, retrieveOwnPosts };
