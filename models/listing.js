const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Machine title is required"],
      trim: true,
      maxlength: 100,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
      min: 0,
      default: 0
    },
    
    imageUrl: {
      url: String,
      filename: String,
      
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    reviews: [
      {
        type:Schema.Types.ObjectId,
        ref:"Review", //here "Review" if model which we created in review.js (we re referencing that in listingSchema reviews section)
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User", // reference from "User" model 
    },
    
    availableFrom: {
      type: Date,
      default: Date.now,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    shareOnly: {
      type: Boolean,
      default: false,
    },
    community: {
      type: String,
      trim: true,
      default: "", 
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// middleware to delete all reviews related to the deleted listing (mongoose middleware), (ehenever the findByIdAndDelete called for any listing this middleware also execute as a middlwaare)
listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in : listing.reviews}}); //if id is equal to the perticular deleted listing then all the Reviews related tp that listing will delete automatically
  }
  
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
