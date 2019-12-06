let models = require("../../model/models");
module.exports = (filter, res) => {
    models.Post.aggregate([{
            $match: filter
        },
        {
            $group: {
                _id: {
                    location: "$location",
                    CATEGORY: "$category",

                },
                count: {
                    "$sum": 1
                },

            }
        },

        {
            $group: {
                _id: "$_id.location",
                reports: {
                    $push: {
                        category: "$_id.CATEGORY",
                        count: "$count",
                        month: "$_MONTH"
                    }
                },
                total: {
                    $sum: { $sum: "$count" }
                }
            }
        },
        {
            $project: {
                location: "$_id",
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
        console.log(data);

        res.send(data)
    })
}