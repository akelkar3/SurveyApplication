const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const UserProfile = require('../controllers/profile');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

// profile
router.get("/profile",checkAuth, UserProfile.getProfile);

router.put("/profile/submit",checkAuth,UserProfile.saveResponse);

//to fetch user survey
router.post("/profile/showsurvey",UserProfile.getUserSurvey);

//admin profile: show user list
router.get("/profile/showusers",UserProfile.getUserList);

//add user response
router.put("/profile/postResponse",checkAuth,UserProfile.postSurveyResponse);

router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;
