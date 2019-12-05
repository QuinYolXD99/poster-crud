const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postSchema = new Schema({
    images: { type: [String], required: true, default: [] },
    description: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: {
        month: { type: Number, required: true },
        date: { type: Number, required: true },
        year: { type: Number, required: true }
    },
    updateAt: {
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
    joined: { type: String, required: true }
})

var userSchema = new Schema({
    account: profileSchema,
    posts: { type: [mongoose.Types.ObjectId], ref: 'Post' }
}, {
    collection: "users"
});

var adminSchema = new Schema({
    account: profileSchema,
    role: { type: String, required: true }
}, {
    collection: "admin"
});





// userSchema.plugin(uniqueValidator, { message: 'User must be unique' });
// adminSchema.plugin(uniqueValidator, { message: 'Admin must be unique' });

const Post = mongoose.model("Posts", postSchema);
const User = mongoose.model("Users", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Post, User, Admin };