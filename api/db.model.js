const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var photoSchema = new Schema({

    image: { type: String },
    caption: { type: String },
    tag: { type: String },
    priority: { type: Boolean },
    createdAt: { type: String },
    updatedAt: { type: String }
}, { collection: "posts" });

const Post = mongoose.model("Posts", photoSchema);
module.exports = { Post };