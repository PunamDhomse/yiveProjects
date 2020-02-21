// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId;
// Setup schema

var locationSchema = mongoose.Schema({
  business_id:  {
                type: ObjectId,
                required: true
              },
    name: String,
    address: String,
    city: String,
    state: ObjectId,
    country: ObjectId,
    postalcode: String,
    status: {
                type: Boolean,
                default: true
    },
    create_date: {
                type: Date,
                default: Date.now
    }
});

//Export USer Model
locationSchema.plugin(uniqueValidator);
var businessLocation = module.exports = mongoose.model('location', locationSchema);

module.exports.get = function(callback,limit){
    businessLocation.find(callback).limit(limit);
}