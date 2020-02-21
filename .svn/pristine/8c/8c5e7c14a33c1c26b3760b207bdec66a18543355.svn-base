// Import Business model
Visitor = require("../models/visitorModel.js");
Business = require("../models/businessModel.js");
User = require("../models/userModel.js");
jwt = require("jsonwebtoken");
config = require("../config.json");

let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Handle Business Index actions
exports.index = function (req, res) {
    Visitor.aggregate([
        {
            $match: {
                "business_owner_id": ObjectId(req.params.id),
                "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) }
            }
        },
        { $sort: { "_id": -1 } },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'business_id',
                foreignField: '_id',
                as: 'BusinessInfo'
            }
        },
        {
            $lookup:
            {
                from: 'locations',
                localField: 'location_id',
                foreignField: '_id',
                as: 'locationInfo'
            }
        }
        ,
        {
            $lookup:
            {
                from: 'users',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customerInfo'
            }
        }
    ], function (err, businessdata) {
        //console.log(businessdata,'dasdasdasdas')
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'Visitor list and their information recieved successfully',
                data: businessdata
            });
        }
    });
};


exports.listbyLocationId = function (req, res) {
    let query = {
            "location_id": ObjectId(req.params.locationid),
            "business_id": ObjectId(req.params.businessid)
    }
    if(req.params.startDate && req.params.endDate){
        query = {
            "location_id": ObjectId(req.params.locationid),
            "business_id": ObjectId(req.params.businessid),
            "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) }
    }
    }
    Visitor.aggregate([
        {
            $match: query
        },
        { $sort: { "_id": -1 } },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'business_id',
                foreignField: '_id',
                as: 'BusinessInfo'
            }
        },
        {
            $lookup:
            {
                from: 'locations',
                localField: 'location_id',
                foreignField: '_id',
                as: 'locationInfo'
            }
        },
        {
            $lookup:
            {
                from: 'users',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customerInfo'
            }
        },
        {
            $lookup:
            {
                from: 'user_profiles',
                localField: 'customer_id',
                foreignField: 'user_id',
                as: 'customerProfile'
            }
        }
    ], function (err, businessdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'Visitor list and their information recieved successfully',
                data: businessdata
            });
        }
    });
};


// Getting all business with User name from user table API's
exports.allvisitorList = function (req, res) {
    Visitor.aggregate([
        {
            $match: {
                "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) }
            }
        },
        { $sort: { "_id": -1 } },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'business_id',
                foreignField: '_id',
                as: 'BusinessInfo'
            }
        },
        {
            $lookup:
            {
                from: 'locations',
                localField: 'location_id',
                foreignField: '_id',
                as: 'locationInfo'
            }
        }
        ,
        {
            $lookup:
            {
                from: 'users',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customerInfo'
            }
        }
    ], function (err, businessdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'Visitor list and their information recieved successfully',
                data: businessdata
            });
        }
    });
};

// COUNT ALL VISITOR
exports.countvisitor = function (req, res) {
    Visitor.find({ "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) } }).count(function (err, user) {
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



// COUNT ALL VISITOR
exports.countvisitorbydate = function (req, res) {
    console.log("MEIN AA GYAAAAA");
    console.log("BY DATE", req.params);
    Visitor.find({ create_date: { $gte: req.params.startDatee, $lt: req.params.endDatee } }), function (err, user) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'ALL VISTOR DATA',
                data: user
            });
        }
    };
};


// COUNT ALL VISITOR
exports.countvisitorbyuserid = function (req, res) {
    console.log("I am Innnnnnnnn");
    Visitor.find({ business_owner_id: ObjectId(req.params.userid), "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) } }).count(function (err, user) {
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


// Getting COUNT OF a business location : FOR location manager
exports.countvisitorByLocationId = function (req, res) {
    Visitor.aggregate([
        {
            $match: {
                "location_id": ObjectId(req.params.locationid),
                "business_id": ObjectId(req.params.businessid),
                "create_date": { $gte: new Date(req.params.startDate), $lte: new Date(req.params.endDate) }
            }
        },
        { $sort: { "_id": -1 } },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'business_id',
                foreignField: '_id',
                as: 'BusinessInfo'
            }
        },
        {
            $lookup:
            {
                from: 'locations',
                localField: 'location_id',
                foreignField: '_id',
                as: 'locationInfo'
            }
        }
        ,
        {
            $lookup:
            {
                from: 'users',
                localField: 'customer_id',
                foreignField: '_id',
                as: 'customerInfo'
            }
        }
    ], function (err, user) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'COUNT ALL VISITOR SUCCESSFULLY',
                data: user.length
            });
        }
    });
};

// ADD NEW VISITOR SERVICE
exports.add = function (req, res) {
    //console.log("I am Innnnnnnnn");
    //console.log( req.body);
    Business.find({ _id: req.body.business_id }).then(business => {
        var visitorInfo = new Visitor();
        visitorInfo.business_id = req.body.business_id;
        visitorInfo.location_id = req.body.location_id;
        visitorInfo.customer_id = req.body.customer_id;
        visitorInfo.type = req.body.type;
        visitorInfo.desc = req.body.desc;
        visitorInfo.business_owner_id = business[0].business_owner_id;
        visitorInfo.save(function (err) {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.json({
                    message: 'New Visitor added!',
                    data: visitorInfo
                });
            }

        });
    }).catch(er => {
        res.json(er);
    });

};

// Handle delete Business
exports.delete = function (req, res) {
    // for update multiple value use this: var newvalues = { $set: { } };
    var visitorStatus = { status: "0" };
    Visitor.deleteOne({ _id: req.params.visitor_id }, visitorStatus, function (err, user) {
        if (err) {
            res.status(500);
            res.send(err);
        }
        else {
            res.json({
                status: "success",
                message: 'Visitor deleted permanently'
            });
        }
    });
};



exports.getByCustomerId = function (req, res) {
    Visitor.aggregate([
        {
            $match: {
                "customer_id": ObjectId(req.params.id)
            }
        },
        { $sort: { "create_date": -1 } },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'business_id',
                foreignField: '_id',
                as: 'BusinessInfo'
            }
        },
        {
            $unwind: "$BusinessInfo"
        },
        {
            $lookup:
            {
                from: 'locations',
                localField: 'location_id',
                foreignField: '_id',
                as: 'locationInfo'
            }
        },
        {
            $unwind: "$locationInfo"
        }
    ], function (err, businessdata) {
        if (err) {
            res.status(500);
            res.json(err);
        }
        else {
            res.json({
                message: 'Visitor list and their information recieved successfully',
                data: businessdata
            });
        }
    });
};
