let models = require("../../model/models");
module.exports = (res) => {
    // model.Post.find({}, (err, data) => {
    //     res.send(data);

    // })

    models.Post.aggregate([{
        $group: {
            _id: {
                location: "$location",
                CATEGORY: "$category"
            },
            count: {
                "$sum": 1
            },
            total: { "$sum": 1 }

        }
    }, {
        $group: {
            _id: "$_id.location",
            reports: {
                $push: {
                    category: "$_id.CATEGORY",
                    "count": "$count",
                }
            }
        }
    }, {
        $project: {
            location: "$_id",
            reports: 1,
            _id: 0

        }
    }], (err, data) => {
        if (err) {
            return res.send(err)
        }
        res.send(data)
    })
}