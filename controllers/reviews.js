const Review = require("../models/review.js");
const Listing = require("../models/listing.js"); 

module.exports.post = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = await Review(req.body.review);
    newReview.author = req.user._id; //assigning the author as the req.user.id

    listing.reviews.push(newReview); //basically we are pushing newReview created from show.js to the existing "reviews" array present in listing schema

    await newReview.save(); //saving new review in DB
    await listing.save(); //if we want to save anything in existing document in Db we need to use .save() function which is asynchronouse itself
    req.flash("success", "New Review Created !"); //flash
    res.redirect(`/home/listings/${listing._id}`);
};


module.exports.delete = async(req,res)=>{
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});      //pull operator is used to remove the reviewId from the reviews array in listing model
    await Review.findByIdAndDelete(reviewId);                                //deleting the review from the review collection
    req.flash("success", "Review Deleted !");  //after deleting review flash msg will occure
    res.redirect(`/home/listings/${id}`);
};