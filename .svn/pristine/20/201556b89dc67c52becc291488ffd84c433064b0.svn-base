// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
// Setup schema

var userSchema = mongoose.Schema({
  firstname:    {
                type: String,
                required: true
              },
  lastname:      {
                type: String,
                required: true
              },
    email:    {
                type: String
              },
    username: {
                type: String,
                unique: true,
                required: true
              },
    password: String,
    role:{
                type: String,
                enum: ['admin', 'customer', 'businessOwner', 'businessManager', 'locationManager'],
                default: 'customer'
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

//Export USer Model
userSchema.plugin(uniqueValidator);
var User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function(callback,limit){
    User.find(callback).limit(limit);
}