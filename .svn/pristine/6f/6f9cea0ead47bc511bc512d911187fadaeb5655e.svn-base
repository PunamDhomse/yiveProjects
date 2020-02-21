Device = require('../models/deviceModel');
jwt = require('jsonwebtoken');
bcrypt = require('bcryptjs');
config = require('../config.json');
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.index = function (req, res) {
    Device.aggregate([
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'business_id',
                foreignField: '_id',
                as: 'business'
            }
        }
    ], function (err, userdata) {
        if (err) {
            res.status(500);
            return res.json(err);
        }
        else {
            return res.json({
                message: 'Devices info',
                data: userdata
            });
        }
    });
};


exports.listby = function (req, res) {
    Device.aggregate([
        { $match: { "business_id": ObjectId(req.params.business_id) } },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'business_id',
                foreignField: '_id',
                as: 'business'
            }
        }
    ], function (err, userdata) {
        if (err) {
            res.status(500);
            return res.json(err);
        }
        else {
            return res.json({
                message: 'Devices info',
                data: userdata
            });
        }
    });
};

exports.new = function (req, res) {
    Device.create(req.body).then(userinfo => {
        return res.json({
            message: 'New device created!',
            data: userinfo
        });
    }).catch(err => {
        res.status(500);
        return res.json(err);
    });
};

exports.deviceData = function (req, res) {
    Device.aggregate([
        { $match: { _id: ObjectId(req.params.id) } },
        {
            $lookup:
            {
                from: 'businesses',
                localField: 'business_id',
                foreignField: '_id',
                as: 'business'
            }
        }
    ], function (err, userdata) {
        if (err) {
            res.status(500);
            return res.json(err);
        }
        else {
            return res.json({
                message: 'Device and business fetched successfully',
                data: userdata[0]
            });
        }
    });
};


exports.update = function (req, res) {
    Device.updateOne({ _id: req.params.id }, { $set: req.body }).then(() => {
        return res.json({
            message: 'Device updated successfully',
            data: req.body
        });
    }).catch(err => {
        res.status(500);
        return res.json(err);
    });
};


exports.delete = function (req, res) {
    var newvalue = { status: "0" };
    Device.updateOne({ _id: req.params.id }, newvalue, function (err, user) {
        if (err) {
            res.status(500)
            return res.send(err);
        }
        else {
            res.json({
                status: "success",
                message: 'Device deleted'
            });
        }
    });
};