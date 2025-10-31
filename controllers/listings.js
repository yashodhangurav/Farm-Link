const Listing = require("../models/listing.js")
const {listingSchema} = require("../schema.js");





module.exports.home = async(req,res)=>{
    res.render("listings/home.ejs")
}

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})
};

module.exports.guide = (req,res)=>{
    res.render("listings/guide.ejs");
};

module.exports.testimonial = (req,res)=>{
    res.render("listings/testimonials.ejs")
};

module.exports.new = (req,res)=>{ //isLoggedIn is middleware to check whether userLoggedin or not
    res.render("listings/new.ejs")
};

module.exports.show = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: {path : "author"}}) //populate is used to get the reviews from the review collection by using the reference in listing model
    .populate("owner"); //we are getting every owner related info
    
    if(!listing){
        req.flash("error", "Listing you requiested for does not exist !"); //if listing does not exist which we want to acess it will throw error in the form of flash
        return res.redirect("/home/listings");
    }
    res.render("listings/show.ejs", {listing})
};

module.exports.createListing = async(req,res)=>{
    let url = req.file.path;
    let filename = req.file.filename;
 
    const newListing = new Listing(req.body.listing);
    // below line will saying the person who created listing that person itself owner of the listing 
    newListing.owner = req.user._id; //for the "new listings" we storing the "currUser id" which is in the req.user._id
    newListing.imageUrl = {url, filename};
    await newListing.save();
    req.flash("success", "New listing is created !"); //after creating new "listing Card" we are using flash popup
    res.redirect("/home/listings");
};

module.exports.edit = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you requiested for does not exist !");
        return res.redirect("/home/listings");
    }
    res.render("listings/edit.ejs", {listing});
};


module.exports.update = async (req,res) => {
    let {id} = req.params;
     let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
     if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.imageUrl = {url, filename};
        await listing.save();
     }
     

    req.flash("success", "Listing Updated !"); //flash
    res.redirect(`/home/listings/${id}`);
};

module.exports.delete = async(req,res)=>{
    let {id} = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Listing Deleted !"); //flash
    res.redirect("/home/listings");
};


module.exports.chatbot = (req,res)=>{
    res.render("listings/chatbot.ejs")
};
