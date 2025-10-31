const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const {listingSchema} = require("../schema.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");

const upload = multer({ storage }); //multer will store files in cloudinary storage


// home route
router.get("/", validateListing,wrapAsync(listingController.home));

// index route
router.get("/listings", validateListing,wrapAsync(listingController.index));

// guide route
router.get("/guide", listingController.guide);

// testimonial route
router.get("/testimonials", listingController.testimonial );

// New route
router.get("/listings/new", isLoggedIn, listingController.new )

//   chatbot route-------------------------------------------------------------------------------chatbot
router.get("/chatbot", listingController.chatbot );

// show route
router
.get("/listings/:id", validateListing, wrapAsync(listingController.show))


// create route
router.post("/listings", 
    isLoggedIn, 
    upload.single('listing[imageUrl]'),
    validateListing, //joivalidation
    wrapAsync(listingController.createListing));




// edit route
router.get("/listings/:id/edit", 
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.edit));


// update route
router.put("/listings/:id", 
    isLoggedIn,
    isOwner, 
    upload.single('listing[imageUrl]'),
    validateListing,
    wrapAsync (listingController.update));

// Delete route

router.delete("/listings/:id", 
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.delete));
    

   

module.exports = router;