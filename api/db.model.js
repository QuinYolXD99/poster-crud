const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Post
// let TodoItem = new Schema({
//     name: {
//         type: String
//     }, date_added: {
//         type: Date
//     },
//     date_done: {
//         type: Date
//     }, done: {
//         type: Boolean
//     }
// }, {
//     collection: "Todos"
// });


var photoSchema = new Schema({

    image: { type: String },
    caption: { type: String }
}, { collection: "posts" });

const Post = mongoose.model("Posts", photoSchema);
module.exports = { Post };