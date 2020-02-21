// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId;
// Setup schema

var photoSchema = mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    device: {
        type: ObjectId,
        required: true
    },
    location: {
        type: ObjectId,
        required: true
    },
    member: {
        type: ObjectId,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

//Export memberphotos Model
photoSchema.plugin(uniqueValidator);
var Photo = module.exports = mongoose.model('memberphotos', photoSchema);

module.exports.get = function (callback, limit) {
    Photo.find(callback).limit(limit);
}