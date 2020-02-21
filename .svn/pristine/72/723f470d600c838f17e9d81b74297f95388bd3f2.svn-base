// Import user model
businessLocation = require('../models/businessLocationModel');
jwt = require('jsonwebtoken');
bcrypt = require('bcryptjs');
config = require('../config.json');
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Handle index actions
exports.index = function (req, res) {
    businessLocation.get(function (err, location) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Users Business location Info successfully recieved",
            data: location
        });

    });
};


exports.getMultiple = (req, res) => {
    if (req.body.field == 'business_id') {
        businessLocation.find({ business_id: req.body.id }).then(data => {
            return res.send(data);
        }).catch(err => {
            res.json({
                status: "error",
                message: err
            });
        });
    } else {
        businessLocation.find({ _id: req.body.id }).then(data => {
            return res.send(data);
        }).catch(err => {
            res.json({
                status: "error",
                message: err
            });
        });
    }
}

// Handle create New USER Info

exports.add = function (req, res) {
    var businessLocationInfo = new businessLocation();
    businessLocationInfo.business_id = req.body.business_id;
    businessLocationInfo.name = req.body.name;
    businessLocationInfo.address = req.body.address;
    businessLocationInfo.city = req.body.city;
    businessLocationInfo.state = req.body.state;
    businessLocationInfo.country = req.body.country;
    businessLocationInfo.status = req.body.status;
    businessLocationInfo.save(function (err) {
        if (err) {
            res.status(500)
            res.json(err);
        } else {
            res.json({
                message: 'New business location created!',
                data: businessLocationInfo
            });
        }
    });
};

exports.view = function (req, res) {
    businessLocation.find({ business_id: req.params.business_id })
    .then(businessLocationData => {
        res.json({
            message: 'Business location Info',
            data: businessLocationData
        });
    }).catch(err => {
        res.status(500);
        res.json(err);
    });
};

// Handle update User info
exports.updateBusinessLocation = function (req, res) {
    if (req.body._id) {
        businessLocation.updateOne({ business_id: ObjectId(req.params.business_id), _id: ObjectId(req.body._id) }, req.body, function (err, doc) {
            if (err) return res.status(500).json(err);
            res.json({
                message: 'Business location Info updated',
                data: {}
            });
        });
    } else {
        businessLocation.create(req.body, function (err, doc) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message: 'Business location Info updated',
                data: {}
            });
        });
    }
    // businessLocation.findOne({business_id:ObjectId(req.params.business_id), _id:ObjectId(req.body._id)}, function (err, locationData) {
    //             if (err){
    //                 res.status(500);
    //                 res.send(err);
    //             }
    //             else{
    //             locationData.name = req.body.name ? req.body.name : locationData.name;
    //             locationData.address = req.body.address ? req.body.address : locationData.address;
    //             locationData.city = req.body.city ? req.body.city : locationData.city;
    //             locationData.state = req.body.state ? req.body.state : locationData.state;
    //             locationData.country = req.body.country ? req.body.country : locationData.country;
    //             locationData.postalcode = req.body.postalcode ? req.body.postalcode : locationData.postalcode;
    //              locationData.save(function (err) {
    //                     if (err){
    //                         res.status(500)
    //                         res.json(err);
    //                     } else {
    //                         res.json({
    //                             message: 'Business location Info updated',
    //                             data: locationData
    //                         });
    //                     }
    //                 });
    //             }
    //         });
};

// Handle update User info
exports.update = function (req, res) {
    businessLocation.findById(req.params.location_id, function (err, locationData) {
        if (err)
            res.send(err);

        locationData.business_id = req.body.business_id ? req.body.business_id : locationData.business_id;
        locationData.name = req.body.name ? req.body.name : locationData.name;
        locationData.address = req.body.address ? req.body.address : locationData.address;
        locationData.city = req.body.city ? req.body.city : locationData.city;
        locationData.state = req.body.state ? req.body.state : locationData.state;
        locationData.country = req.body.country ? req.body.country : locationData.country;
        locationData.status = req.body.status ? req.body.status : locationData.status;
        //user = req.body;
        // save the user and check for errors
        locationData.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Business location Info updated',
                data: locationData
            });
        });
    });
};


// Handle delete User
exports.delete = function (req, res) {
    // for update multiple value use this: var newvalues = { $set: { } };
    var newvalue = { status: "0" };
    User.updateOne({ _id: req.params.location_id }, newvalue, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Business location deleted'
        });
    });
};