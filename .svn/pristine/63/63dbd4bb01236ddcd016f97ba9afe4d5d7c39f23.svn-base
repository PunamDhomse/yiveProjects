// Import user model
Country = require('../models/countryModel');
config = require('../config.json');
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
// Handle index actions
exports.index = function (req, res){
        Country.get(function (err, countries){
            if(err){
                    res.json({
                                status: "error",
                                message: err
                        });
                   }
            res.json({
                        status: "success",
                        message: "countries recieved",
                        data: countries
            });

        });
};

// Getting all regions with countryId from user table API's
exports.regions = function (req, res) {
    Country.aggregate([
        {$match:{'_id':ObjectId(req.params.countryId)}},
        { $lookup:
          {
            from: 'regions',
            localField: '_id',
            foreignField: 'countryId',
            as: 'regions'
          }
        }
      ], function (err, regionData) {
                if (err){
                    res.status(500);
                    res.json(err);
                }
                else{
                    res.json({
                        message: 'got regions list successfully',
                        data: regionData
                    });
                }
        });
    };

exports.new = function (req, res) {
    
    var countrylist = new Country();
    //console.log(userinfo);
    countrylist.name = req.body.name;

    countrylist.save(function (err) {
        if (err) {
            res.status(500);
            res.json(err);
        } else {
        res.json({
                    message: 'New country added successfully!',
                    data: countrylist
                });
            }
        });
};