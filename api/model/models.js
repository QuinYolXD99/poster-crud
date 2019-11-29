const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")
var photoSchema = new Schema({

    image: { type: String },
    imageName: { type: String },
    caption: { type: String },
    tag: { type: String },
    priority: { type: Boolean },
    createdAt: { type: String },
    updatedAt: { type: String },
    userId: { type: String },
    username: { type: String }
}, { collection: "posts" });

var userSchema = new Schema({
    username: { type: String },
    password: { type: String }
}, {
        collection: "users"
    })

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});
const Post = mongoose.model("Posts", photoSchema);
const User = mongoose.model("Users", userSchema);
module.exports = { Post, User };