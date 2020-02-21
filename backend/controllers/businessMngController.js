// Import user model
User = require('../models/userModel');
userProfile = require('../models/userProfileModel');
jwt = require('jsonwebtoken');
bcrypt = require('bcryptjs');
config = require('../config.json');
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


// Handle index actions
exports.index = function (req, res) {
    let query = { "role": "businessManager" };
    if (req.body.search) {
        query = {
            $and: [
                { "role": "businessManager" },
                { "firstname": { "$regex": req.body.search, "$options": 'i' } }
            ]
        }
    }
    User.aggregate([
        { $match: query },
        {
            $lookup:
            {
                from: 'user_profiles',
                localField: '_id',
                foreignField: 'user_id',
                as: 'userprofileData'
            }
        },
        {
            $unwind: "$userprofileData"
        },
        {
            $lookup:
            {
                from: 'visitors',
                localField: '_id',
                foreignField: 'customer_id',
                as: 'visitorData'
            }
        },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'userprofileData.business_id',
                foreignField: '_id',
                as: 'business'
            }
        }
    ], function (err, userdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'User Info updated',
                data: userdata
            });
        }
    });
};


exports.listby = function (req, res) {
    let query = { "role": "businessManager" };
    if (req.body.search) {
        query = {
            $and: [
                { "role": "businessManager" },
                {
                    $or: [
                        { "firstname": { "$regex": req.body.search, "$options": 'i' } }
                    ]
                }]
        }
    }
    User.aggregate([
        { $match: query },
        {
            $lookup:
            {
                from: 'user_profiles',
                let: { owner_id: ObjectId(req.params.byId), uid: "$_id" },
                pipeline: [{
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $eq: [`$${req.params.getby}`, "$$owner_id"]
                                },
                                {
                                    $eq: ["$user_id", "$$uid"]
                                }
                            ]
                        }
                    }
                }],
                as: 'userprofileData'
            }
        },
        {
            $unwind: "$userprofileData"
        },
        {
            $lookup:
            {
                from: 'visitors',
                let: { uid: "$_id" },
                pipeline: [{
                    $match: {
                        $expr:
                        {
                            $eq: ["$customer_id", "$$uid"]
                        }
                    }
                }],
                as: 'visitorData'
            }
        },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'userprofileData.business_id',
                foreignField: '_id',
                as: 'business'
            }
        },
    ], function (err, userdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'User Info updated',
                data: userdata
            });
        }
    });
};

exports.new = function (req, res) {

    var userinfo = new User();
    //console.log(userinfo);
    userinfo.firstname = req.body.firstname;
    userinfo.lastname = req.body.lastname;
    userinfo.email = req.body.email;
    userinfo.username = req.body.username;
    let password = req.body.password ? req.body.password : Math.random().toString(36).substring(7);
    userinfo.password = bcrypt.hashSync(password, 10);
    userinfo.role = req.body.role;
    userinfo.save(function (err) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
            res.json({
                message: 'New user created!',
                data: userinfo
            });
        }
    });
};

// get user and user profile info by user ID
// Handle index actions
exports.userData = function (req, res) {
    User.aggregate([
        { $match: { _id: ObjectId(req.params.user_id), "role": "businessManager" } },
        {
            $lookup:
            {
                from: 'user_profiles',
                localField: '_id',
                foreignField: 'user_id',
                as: 'userprofileData'
            }
        }
    ], function (err, userdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'User and user profile Info fetched successfully',
                data: userdata[0]
            });
        }
    });
};



// Handle update User info
exports.update = function (req, res) {
    console.log('userid in request is', req.body);
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.status(500);
            res.send(err);
        }
        else {
            //console.log('db user record', user);
            user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
            user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? bcrypt.hashSync(req.body.password, 10) : user.password;
            user.email = req.body.email ? req.body.email : user.email;
            user.role = req.body.role ? req.body.role : user.role;
            user.status = req.body.status ? req.body.status : user.status;
            user.save(function (err) {
                if (err) {
                    res.status(500)
                    res.json(err);
                } else {
                    res.json({
                        message: 'User Info updated',
                        data: user
                    });
                }
            });
        }
    });
};


// COUNT ALL CUSTOMER
exports.countcustomer = function (req, res) {
    User.find({ "role": "customer", "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) } }).count(function (err, user) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'COUNT ALL CUSTOMER SUCCESSFULLY',
                data: user
            });
        }
    });
};

// Getting COUNT OF all business : FOR BUSINESS USER
exports.countcustomerByUserId = function (req, res) {
    //console.log('I am here count business');
    userProfile.find({ business_owner_id: ObjectId(req.params.userid), "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) } }).count(function (err, businessdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'Business list for owner recieved successfully',
                data: businessdata
            });
        }
    });
};


exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'User Info updated',
                data: user
            });
        }
    });
};


// Handle delete User
exports.delete = function (req, res) {
    // for update multiple value use this: var newvalues = { $set: { } };
    var newvalue = { status: "0" };
    User.updateOne({ _id: req.params.user_id }, newvalue, function (err, user) {
        if (err) {
            res.status(500)
            res.send(err);
        }
        else {
            res.json({
                status: "success",
                message: 'User deleted'
            });
        }
    });
};