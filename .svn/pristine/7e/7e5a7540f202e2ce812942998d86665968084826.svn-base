Photo = require('../models/memberPhotoModel');
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.new = function (req, res) {
    if(req.file !== undefined){
        req.body['photo'] = req.file.filename;
    }
    Photo.create(req.body).then(data => {
        return res.json({
            message: 'New Photo Added!',
            data: data
        });
    }).catch(err => {
        res.status(500);
        return res.json(err);
    });
};

exports.updatePhoto = function (req, res) {
    if(req.file !== undefined){
        req.body['photo'] = req.file.filename;
    }
    Photo.updateOne({ _id: req.params.id }, req.body).then(data => {
        return res.json({
            message: 'Photo updated!',
            data: data
        });
    }).catch(err => {
        res.status(500);
        return res.json(err);
    });
};

exports.getPhotos = function (req, res) {
    Photo.aggregate([
        { $match: { member: ObjectId(req.params.id) } },
        {
            $lookup:
            {
                from: 'devices',
                localField: 'device',
                foreignField: '_id',
                as: 'device'
            }
        },
        {
            $unwind: "$device"
        },
        {
            $lookup:
            {
                from: 'locations',
                localField: 'location',
                foreignField: '_id',
                as: 'location'
            }
        },
        {
            $unwind: "$location"
        },
    ], function (err, data) {
        if (err) {
            res.status(500);
            return res.json(err);
        }
        else {
            return res.json({
                message: 'Data fetched',
                data: data
            });
        }
    });


};