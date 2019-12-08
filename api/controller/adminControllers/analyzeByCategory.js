let models = require("../../model/models");
module.exports = (res) => {
    models.Post.aggregate([{
            $group: {
                _id: "$category",
                count: {
                    "$sum": 1
                },
                locations: {
                    $push: "$location",

                },

            }
        },
        {
            $project: {
                category: "$_id",
                total: "$count",
                locations: 1,
                _id: 0

            }
        },
        { $sort: { count: -1 } }

    ], (err, data) => {
        if (err) {
            return res.send(err)
        }
        console.log(data);
        res.send(data)
    })
}