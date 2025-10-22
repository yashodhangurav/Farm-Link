const Listing = require("./models/listing.js");
const expressError = require("./utils/expressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");



module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){     //"req.isAuthenticate()" is a default method of passport which check is user loggedin or not,   when the user loggedin that info stored in "req.user" if we print console.log(req.user) it will print user related info (session stores the user info and that info checked by this "isAuthenticate()"method, )
        req.session.redirectUrl = req.originalUrl; //this used for  user convienience (user accesed path before loggedin saved and redirects after loggedin), and we should save this variable in "locals" becouse passport is unable to save this info
        req.flash("error", "You must be logged In to post someting !");
        return res.redirect("/login");
    }
    next();
};

// storing redirectUrl in locals (middleware)
module.exports.saveRedirectUrl = ((req,res,next)=>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
});

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this post !");
        return res.redirect(`/home/listings/${id}`);
    }
    next();
};


// validateListing Middleware
module.exports.validateListing = (req,res,next)=>{  
    let {error} = listingSchema.validate(req.body); 
    if(error){              
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new expressError(400, errMsg);
    } else{
        next(); //if there is no error then we are calling next() to proceed to the next middleware or route handler
    }
};


// validateReview Middleware

module.exports.validateReview = (req,res,next)=>{  
    let {error} = reviewSchema.validate(req.body); 
    if(error){              
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new expressError(400, errMsg);
    } else{
        next(); //if there is no error then we are calling next() to proceed to the next middleware or route handler
    }
};


// isAuther

module.exports.isReviewAuthor = async (req,res,next) => {
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this review !");
        return res.redirect(`/home/listings/${id}`);
    }
    next();
};