// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId;
// Setup schema

var deviceSchema = mongoose.Schema({
    business_id: {
        type: ObjectId,
        required: true
    },
    name: String,
    serial: String,
    area: String,
    password: String,
    communicationtype: String,
    connectionmode: String,
    ipaddress: String,
    parameter: String,
    model: String,
    version: String,
    register: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    activitystatus: {
        type: String,
        enum: ['online', 'disable', 'offline'],
        default: 'online'
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// deviceSchema.plugin(uniqueValidator);
var device = module.exports = mongoose.model('device', deviceSchema);

module.exports.get = function (callback, limit) {
    device.find(callback).limit(limit);
}