var mongoose = require('mongoose');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//get User profile
module.exports.getProfile = function(req, res){
  const id=req.userData.userId;
  if (!id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(id)
      .exec(function(err, user) {
        res.status(200).json(
        user
        )
      });
  }
};

//submit and save response to questions for each user
module.exports.saveResponse = function(req,res){
  const id=req.userData.userId;
  User.findByIdAndUpdate(
    id,
    {
      $set:{
        survey:req.body.survey,
        score: 22
      }
    },
    {new: true},
    function(err,result){
    if(err){
      console.log(err);
      res.status(500).json({
        error:err,
        status:500
      });
    }else{
      console.log(result);
      res.status(200).json(
    //  message:"Request successful",
      result
      //status:200
      );
     // console.log(result);
    }
    });

};

//get User survey result
module.exports.getUserSurvey = function(req, res){
   
    User.find({_id:req.body._id,surveyId:req.body.surveyId},'answers',function(err, user) 
     {
      if(err)
       {
        res.status(200).json({
          error:err,
          message:"Request unsuccessful",
          status:500
        });
      }else{
          res.status(200).json({
          message:"Request successful",
          user,
          status:200
          });
          
      }
    });
  };



//fetch all user list for admin to see in profile landing page
module.exports.getUserList = function(req,res){
  User.find({},['surveyId','score'],function(err,users){
    if(err){
      console.log(err);
      res.status(500).json({
        error:err,
        message:"Request unsuccessful",
        status:500
      });
    }else{
      //console.log(users);
      res.status(200).json({
      message:"Request successful",
      users,
      status:200
      });
    }
    });

};




module.exports.postSurveyResponse = function(req,res){
  const id=req.userData.userId;
 
  User.findByIdAndUpdate(
    id,
    {
      $set:{
        name:req.body.name,
        surveyId:new mongoose.Types.ObjectId(),
        role:req.body.role,
        score:req.body.score,
        answers:req.body.answers
      }
    },
    {new: true},
    function(err,result){
    if(err){
      console.log(err);
      res.status(500).json({
        error:err,
        message:"Request unsuccessful",
        status:500
      });
    }else{
     // console.log("survey saved:"+survey);
      console.log(result);
      res.status(200).json({
       message:"Request successful",
       status:200
     } );
     // console.log(result);
    }
    });

};
