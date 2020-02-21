// Import user model
userProfile = require('../models/userProfileModel');
Business = require("../models/businessModel.js");
jwt = require('jsonwebtoken');
bcrypt = require('bcryptjs');
config = require('../config.json');
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Handle index actions
exports.index = function (req, res){
    userProfile.get(function (err, userProfileData){
            if(err){
                    res.json({
                                status: "error",
                                message: err
                        });
                   }
            res.json({
                        status: "success",
                        message: "Users Profile Info get successfully",
                        data: userProfileData
            });

        });
};

// Handle create New USER Info

exports.new = function (req, res) {
    
    var userinfo = new userProfile();
    userinfo.user_id = req.body.user_id;
    userinfo.dob = req.body.dob;
    userinfo.gender = req.body.gender;
    userinfo.phone = req.body.phone;
    userinfo.address = req.body.address;
    userinfo.city = req.body.city;
    userinfo.state = req.body.state;
    userinfo.country = req.body.country;
    userinfo.photo = req.body.photo;
    userinfo.linkedin = req.body.linkedin;
    userinfo.facebook = req.body.facebook;
    userinfo.twitter = req.body.twitter;
    userinfo.save(function (err) {
        if (err) {
                    console.log('this is errror')
                    res.status(500);
                    res.json(err);
        } else {
        res.json({
                    message: 'New user profile created!',
                    data: userinfo
                });
            }
        });
};

exports.view = function (req, res) {
    userProfile.findOne({user_id: req.params.userDetail_id}, function (err, userProfileData) {
                if (err){
                    res.status(500);
                    res.json(err);
                }
                else{
                res.json({
                    message: 'Business Info',
                    data: userProfileData
                });
            }
        });
    };


// Handle update User info
exports.update = async function (req, res) {
    let business=[];
    if(req.body.business_id){
        business = await Business.find({ _id:req.body.business_id });
    }  

        userProfile.findOne({user_id: ObjectId(req.params.userDetail_id)}, function (err, userProfileData) {
            if (err)
            {
                console.log('here is the error');
                res.status(500);
                return res.send(err);
            } else if(userProfileData) 
            {   
                console.log('here is the elseif', userProfileData);
                for (var profileDataKey in req.body) {
                if(profileDataKey != '_id')
                  userProfileData[profileDataKey] = req.body[profileDataKey];
                }
                if(req.file !== undefined){
                    userProfileData['photo'] = req.file.filename;
                }
                if(business.length > 0){
                    userProfileData['business_owner_id'] = business[0].business_owner_id;
                }
                userProfileData.save(function (err) {
                            if (err){
                                res.status(500)
                                res.json(err);
                            }else{
                            res.json({
                                message: 'User Profile Info updated',
                                data: userProfileData
                            });
                            }
                        });
            } else {
                console.log('here is the else');
                var userInfo = new userProfile();
                for (var profileDataKey in req.body) {
                  userInfo[profileDataKey] = req.body[profileDataKey];
                }
                if(req.file !== undefined){
                    userInfo['photo'] = req.file.filename;
                }
                if(business.length > 0){
                    userInfo['business_owner_id'] = business[0].business_owner_id;
                }
                userInfo.user_id = req.params.userDetail_id;
                userInfo.save(function (err) {
                            if (err){
                                res.status(500)
                                res.json(err);
                            } else {
                                res.json({
                                    message: 'User Profile Info updated',
                                    data: userInfo
                                });
                            }
                        });
            }
        });
    
    };
