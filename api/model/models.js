const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")
var uniqueValidator = require('mongoose-unique-validator');

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
    username: { type: String , unique: true, required: true},
    password: { type: String , required: true},
    fname: { type: String, required: true},
    lname: { type: String, required: true },
    contact: { type: String, required: true },
    joined: {type: String , required: true}
},
{
    collection: "users"
})

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.plugin(uniqueValidator, { message: 'User must be unique' });
const Post = mongoose.model("Posts", photoSchema);
const User = mongoose.model("Users", userSchema);

module.exports = { Post, User };