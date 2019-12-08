let models = require("../../model/models");
module.exports = (res) => {
    models.Post.aggregate([{
            $group: {
                _id: {
                    month: "$createdAt.month",
                    CATEGORY: "$category",

                },
                count: {
                    "$sum": 1
                },

            }
        },

        {
            $group: {
                _id: "$_id.month",
                reports: {
                    $push: {
                        category: "$_id.CATEGORY",
                        count: "$count",
                    }
                },
                total: {
                    $sum: { $sum: "$count" }
                }
            }
        },
        {
            $project: {
                month: "$_id",
                reports: 1,
                total: 1,
                _id: 0

            }
        },
        { $sort: { total: -1 } }

    ], (err, data) => {
        if (err) {
            return res.send(err)
        }
        res.send(data)
    })
}