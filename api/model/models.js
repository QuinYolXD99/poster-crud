const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postSchema = new Schema({
    images: { type: [String], required: true, default: [] },
    description: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, default: null },
    user: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
    location: { type: String, required: true }
}, { collection: "posts" });

var profileSchema = new Schema({
    avatar: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    contact: { type: String, required: true },
    joined: { type: String, required: true }
})

var userSchema = new Schema({
    profile: profileSchema,
    posts: { type: [mongoose.Types.ObjectId], ref: 'Posts' }
}, {
    collection: "users"
});

const Post = mongoose.model("Posts", postSchema);
const User = mongoose.model("Users", userSchema);

module.exports = { Post, User };