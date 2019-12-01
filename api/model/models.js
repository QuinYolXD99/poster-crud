const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

var postSchema = new Schema({
    images: { type: [String], required: true, default: [] },
    description: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, default: null },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
}, { collection: "posts" });

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
    posts: { type: [mongoose.Types.ObjectId], ref: 'Post' }
}, {
    collection: "users"
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

module.exports = { Post, User };