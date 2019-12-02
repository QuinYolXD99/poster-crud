let models = require("../../model/models");

let retrieve_by_category = (req, res) => {
  models.Post.aggregate([
    {
      $group: {
        _id: {
          category: "$category"
        },
        count: {
          $sum: 1
        },
        $sort: { count: -1 }
      }
    }
  ]),
    (err, data) => {
      console.log(data);

      if (err) {
        res.send({
          error: { body: err, message: "no images", status: true },
          success: false,
          data: null
        });
      } else {
        res.send({ error: false, success: true, data: data });
      }
    };
};

module.exports = { retrieve_by_category };
