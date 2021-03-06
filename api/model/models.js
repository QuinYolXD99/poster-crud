const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postSchema = new Schema({
    images: { type: [String], required: true, default: [] },
    description: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    removed: { type: Boolean, required: true, default: false },
    createdAt: {
        month: { type: Number, required: true },
        date: { type: Number, required: true },
        year: { type: Number, required: true }
    },
    updatedAt: {
        month: { type: Number },
        date: { type: Number },
        year: { type: Number }
    },
    user: { type: mongoose.Types.ObjectId, ref: 'Users', required: true },
    location: { type: String, required: true }
}, { collection: "posts" });

var profileSchema = new Schema({
    avatar: { type: String, default: null },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    contact: { type: String, required: true },
    joined: { type: String, required: true },
    role: { type: String, required: true },
})

var userSchema = new Schema({
    disabled: { type: Boolean, required: true, default: false },
    account: profileSchema,
    posts: { type: [mongoose.Types.ObjectId], ref: 'Posts' }
}, {
    collection: "users"
});

const Post = mongoose.model("Posts", postSchema);
const User = mongoose.model("Users", userSchema, "users");
module.exports = { Post, User };