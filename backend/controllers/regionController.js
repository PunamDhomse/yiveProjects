    // Import Business model
Region = require("../models/regionModel.js");
jwt = require("jsonwebtoken");
config = require("../config.json");

let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.add = function(req, res){
    var region = new Region();
    region.name = req.body.name;
    region.countryId = req.body.country_id;
    region.save(function(err){
                            if(err){
                                res.status(500);
                                res.json(err);
                            }
                            else{
                                res.json({
                                    message: 'New region added!',
                                    data: region
                                });  
                            }
                           
    });

};
