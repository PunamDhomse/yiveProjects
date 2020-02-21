// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId;

// Setup schema
var businessSchema = mongoose.Schema({
    business_owner_id:    {
                type: ObjectId,
                required: true
              },
    business_name: {
                type: String,
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
businessSchema.plugin(uniqueValidator);
var Business = module.exports = mongoose.model('business', businessSchema);

module.exports.get = function(callback,limit){
  Business.find(callback).limit(limit);
}