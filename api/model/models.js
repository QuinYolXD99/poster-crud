const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 var postSchema = new Schema({
    image: { type: String },
    imageName: { type: String, required: true },
    caption: { type: String, required: true },
    priority: { type: Boolean, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
}, {
    collection: "posts"
});
var profileSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    joined: { type: String, required: true }
})

var userSchema = new Schema({
    profile: profileSchema,
    posts: { type: [mongoose.Types.ObjectId], ref: 'Post', default:[] }
}, {
    collection: "users"
});
const Post = mongoose.model("Posts", postSchema);
const User = mongoose.model("Users", userSchema);
module.exports = { Post, User };