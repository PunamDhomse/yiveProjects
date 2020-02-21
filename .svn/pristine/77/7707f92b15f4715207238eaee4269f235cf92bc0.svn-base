// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// Setup schema

var countrySchema = mongoose.Schema({
    name:    {
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
countrySchema.plugin(uniqueValidator);
var Country = module.exports = mongoose.model('country', countrySchema);

module.exports.get = function(callback,limit){
    Country.find(callback).limit(limit);
}