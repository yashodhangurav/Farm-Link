const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//  connect to the mongoose
const MONGO_URL = "mongodb://127.0.0.1:27017/farmlink";
main()
.then(()=>{
    console.log("connected to DB ")
}).catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(MONGO_URL);
}



// inserting sample data into the DB
const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => { return { ...obj, owner: "68f86aa50f6347a871356f11" }; }); //to add owner to every listings
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();