// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId;
// Setup schema

var visitorSchema = mongoose.Schema({
  business_owner_id: {
    type: ObjectId,
    required: true
  },
  business_id: {
    type: ObjectId,
    required: true
  },
  location_id: {
    type: ObjectId,
    required: true
  },
  customer_id: {
    type: ObjectId,
    required: true
  },
  type: {
    type: String,
    enum: ['Manual', 'Automatic'],
    required: true
  },
  desc: String,
  status: {
    type: Boolean,
    default: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});


//Export Visitor Model
visitorSchema.plugin(uniqueValidator);
var Visitor = module.exports = mongoose.model('visitor', visitorSchema);

module.exports.get = function (callback, limit) {
  Visitor.find(callback).limit(limit);
}