// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId;
// Setup schema

var regionSchema = mongoose.Schema({
  name:    {
                type: String,
                required: true
              },
countryId:    {
                type: ObjectId,
                required: true
              },
    status: {
                type: Boolean,
                default: 1
    },
    create_date: {
                type: Date,
                default: Date.now
    }
});

//Export USer Model
regionSchema.plugin(uniqueValidator);
var Region = module.exports = mongoose.model('region', regionSchema);

module.exports.get = function(callback,limit){
    Region.find(callback).limit(limit);
}