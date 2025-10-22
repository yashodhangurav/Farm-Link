const express = require("express");
const router = express.Router(); 
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")


const userController = require("../controllers/users.js");


// signin form

router.get("/signup", userController.renderSignupForm );

router.post("/signup", wrapAsync(userController.signup));



// login form

router.get("/login", userController.renderLoginForm);

router.post("/login", 
    saveRedirectUrl, //(middleware) save the in session info about user before the loggedin in locals (this is just for user convinience)
    passport.authenticate('local', { 
    failureRedirect: '/login',  
    failureFlash: true }
), userController.login);


// logout

router.get("/logout", userController.logout )

module.exports = router;
