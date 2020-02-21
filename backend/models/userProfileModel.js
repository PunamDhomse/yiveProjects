// Calling Mongoose
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const ObjectId = mongoose.Types.ObjectId;
// Setup schema

var userProfileSchema = mongoose.Schema({
    user_id: {
                type: ObjectId,
                required: true
              },
    face_id: String,
    business_owner_id: ObjectId,
    business_id: ObjectId,
    location_id: ObjectId,
    dob: String,
    gender: String,
    phone: String,
    address: String,
    city: String,
    state: {
      type: ObjectId,
      required: false
    },
    country: {
      type: ObjectId,
      required: false
    },
    photo: String,
    linkedin: String,
    facebook: String,
    twitter: String,
    create_date: {
                type: Date,
                default: Date.now
    }
});

//Export USer Model
userProfileSchema.plugin(uniqueValidator);
var userProfile = module.exports = mongoose.model('user_profile', userProfileSchema);

module.exports.get = function(callback,limit){
  userProfile.find(callback).limit(limit);
}