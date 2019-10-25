const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Post
let TodoItem = new Schema({
    name: {
        type: String
    }, date_added: {
        type: Date
    },
    date_done: {
        type: Date
    }, done: {
        type: Boolean
    }
}, {
    collection: "Todos"
});


var photoSchema = new Schema({

    path: { type: String },

    caption: { type: String }
},{ collection: "posts"});

const Todos = mongoose.model("TodoItem", TodoItem);
module.exports = { Todos };