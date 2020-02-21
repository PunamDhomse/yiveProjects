// Import Business model
Business = require("../models/businessModel.js");
User = require("../models/userModel.js");
jwt = require("jsonwebtoken");
config = require("../config.json");

let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Handle Business Index actions
exports.index = function (req, res) {
    Business.get(function (err, business) {
        if (err) {
            res.status(500);
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Businesses list successfully recieved",
            data: business
        });

    });
};

// Getting all business with User name from user table API's
exports.businessList = function (req, res) {
    console.log('I am here ');
    Business.aggregate([
        {
            $lookup:
            {
                from: 'users',
                localField: 'business_owner_id',
                foreignField: '_id',
                as: 'userData'
            }
        },
        {
            $lookup:
            {
                from: 'locations',
                localField: '_id',
                foreignField: 'business_id',
                as: 'locationData'
            }
        }

    ], function (err, businessdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'Business list and business owner name recieved successfully',
                data: businessdata
            });
        }
    });
};

// Getting all business with User name from user table API's
exports.businessListByOwner = function (req, res) {
    Business.find({ business_owner_id: ObjectId(req.params.owner_id) }, function (err, businessdata) {
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

// Getting COUNT OF all business : FOR BUSINESS USER
exports.countbusinessByUserId = function (req, res) {
    //console.log('I am here count business');
    Business.find({ business_owner_id: ObjectId(req.params.userid), "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) } }).then(function (err, businessdata) {
        res.json({
            message: 'Business list for owner recieved successfully',
            data: businessdata
        });
    }).catch(err=> {
        res.status(500);
        res.json(err);
    });
};


// Getting COUNT OF all business : FOR ADMIN
exports.countbusiness = function (req, res) {
    Business.find({ "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) } }).then(function (businessdata) {
        res.json({
            message: 'Business list for owner recieved successfully',
            data: businessdata
        });
    }).catch(err => {
        res.status(500);
        res.json(err);
    });
};

exports.add = function (req, res) {
    var businessInfo = new Business();
    businessInfo.business_owner_id = req.body.business_owner_id;
    businessInfo.business_name = req.body.business_name;
    businessInfo.status = req.body.status;
    businessInfo.save(function (err) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'New Business added!',
                data: businessInfo
            });
        }

    });

};

exports.view = function (req, res) {
    Business.findById(req.params.business_id, function (err, business) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'Business Info',
                data: business
            });
        }
    });
};


// BUSINESS AND BUSINESS LOCATION API's
exports.businessWithLocations = function (req, res) {
    console.log(req.params.business_id);
    Business.aggregate([
        { $match: { "_id": ObjectId(req.params.business_id) } },
        {
            $lookup:
            {
                from: 'locations',
                let: { uid: "$_id", status: true },
                pipeline: [{
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $eq: ["$status", "$$status"]
                                },
                                {
                                    $eq: ["$business_id", "$$uid"]
                                }
                            ]
                        }
                    }
                }],
                as: 'businessLocations'
            }
        },
        {
            $lookup:
            {
                from: 'users',
                localField: 'business_owner_id',
                foreignField: '_id',
                as: 'userData'
            }
        }
    ], function (err, businessdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'Business and their location recieved successfully',
                data: businessdata[0]
            });
        }
    });
};


// Handle update User info
exports.update = function (req, res) {
    Business.findById(req.params.business_id, function (err, businessInfo) {
        if (err)
            res.send(err);
        businessInfo.business_owner_id = req.body.business_owner_id ? req.body.business_owner_id : businessInfo.business_owner_id;
        businessInfo.business_name = req.body.business_name ? req.body.business_name : businessInfo.business_name;
        businessInfo.status = req.body.status ? req.body.status : businessInfo.status;

        // save the user and check for errors
        businessInfo.save(function (err) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.json({
                    message: 'Business Info is updated',
                    data: businessInfo
                });
            }
        });
    });
};


// Handle delete Business
exports.delete = function (req, res) {
    // for update multiple value use this: var newvalues = { $set: { } };
    var businessStatus = { status: "0" };
    Business.updateOne({ _id: req.params.business_id }, businessStatus, function (err, user) {
        if (err) {
            res.status(500);
            res.send(err);
        }
        else {
            res.json({
                status: "success",
                message: 'Business softly deleted'
            });
        }
    });
};