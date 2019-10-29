var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var photoSchema = new Schema({

    path: { type: String },
    caption: { type: String },
    priority: { type: Boolean },
    date: { type: String }

});

module.exports = mongoose.model('Photos', photoSchema);