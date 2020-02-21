// Import user model
Location = require('../models/businessLocationModel');
userProfile = require('../models/userProfileModel');
jwt = require('jsonwebtoken');
bcrypt = require('bcryptjs');
config = require('../config.json');
let mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


// Handle index actions
exports.index = function (req, res) {
  let childQuery = {
    from: 'visitors',
    localField: '_id',
    foreignField: 'location_id',
    as: 'visitorData'
  };
  if(req.body.filters['business_id']){
    req.body.filters['business_id'] = ObjectId(req.body.filters['business_id']);
  }
  if(req.body.filters['_id']){
    req.body.filters['_id'] = ObjectId(req.body.filters['_id']);
  }
  if(req.body.date !== null){
    childQuery = {
      "from": "visitors",
      "let": { "challengeId": "$_id", "startDate": new Date(req.body.date.start), "endDate": new Date(req.body.date.end) },
      "pipeline": [
        { "$match": {
          "$expr": {
            "$and": [
              { "$eq": [ "$location_id", "$$challengeId" ] },
              { "$gte": [ "$create_date", "$$startDate" ] },
              { "$lt": [ "$create_date", "$$endDate" ] }
            ]
          }
        }}
      ],
      "as": "visitorData"
    }
  }
  Location.aggregate([
    { $match: req.body.filters },
    {
      $lookup:
      {
        from: 'businesses',
        localField: 'business_id',
        foreignField: '_id',
        as: 'businessData'
      }
    },
    {
      $unwind: "$businessData"
    },
     {
        $lookup: childQuery
      },
    {
      $lookup:
      {
        from: 'users',
        localField: 'businessData.business_owner_id',
        foreignField: '_id',
        as: 'user'
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
  let childQuery = {
    from: 'visitors',
    localField: '_id',
    foreignField: 'location_id',
    as: 'visitorData'
  };
  if(req.body.filters['business_id']){
    req.body.filters['business_id'] = ObjectId(req.body.filters['business_id']);
  }
  if(req.body.filters['_id']){
    req.body.filters['_id'] = ObjectId(req.body.filters['_id']);
  }
  if(req.body.date !== null){
    childQuery = {
      "from": "visitors",
      "let": { "challengeId": "$_id", "startDate": new Date(req.body.date.start), "endDate": new Date(req.body.date.end) },
      "pipeline": [
        { "$match": {
          "$expr": {
            "$and": [
              { "$eq": [ "$location_id", "$$challengeId" ] },
              { "$gte": [ "$create_date", "$$startDate" ] },
              { "$lt": [ "$create_date", "$$endDate" ] }
            ]
          }
        }}
      ],
      "as": "visitorData"
    }
  }
  Location.aggregate([
    { $match: req.body.filters },
    {
      $lookup:
      {
        from: 'businesses',
        let: { owner_id: ObjectId(req.params.byId), uid: "$business_id" },
        pipeline: [{
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [`$${req.params.getby}`, "$$owner_id"]
                },
                {
                  $eq: ["$_id", "$$uid"]
                }
              ]
            }
          }
        }],
        as: 'businessData'
      }
    },
    {
      $unwind: "$businessData"
    },
    {
      $lookup: childQuery
    },
    {
      $lookup:
      {
        from: 'users',
        localField: 'businessData.business_owner_id',
        foreignField: '_id',
        as: 'user'
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

