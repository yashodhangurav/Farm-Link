if(process.env.NODE_ENV != "production"){  //by this we can access environmental veriables if its is not on produc
    require("dotenv").config();
};


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const expressError = require("./utils/expressError.js");


// routers requiring
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views") );
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// session related
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");


// passport (authentication & autherization)
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); //we required user model to use it in passport authentication


// connect to the mongoAtlas

const dbUrl = process.env.ATLASDB_URL;
main()
.then(()=>{
    console.log("connected to DB ")
}).catch((err)=>{
    console.log(err)
});

async function main(){
    await mongoose.connect(dbUrl);
}


// to store sessions in mongo atlas
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600, //touchAfter means "is nothing changed in session then no need to update info, it will automatically update after 24 hour"
})

store.on("error", ()=>{
    console.log("ERROR IN MONGO SESSION STORE ", err)
});



//session configuration
const sessionOptions = {
    store, //we pass here store related info
    secret : process.env.SECRET, //this is used to sign the session ID cookie, can be any random string
    resave : false, //forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized : true, //forces a session that is "uninitialized" to be saved to the store
    cookie:{
        expire : Date.now() + 1000*60*60*24*7, //this is the time when the cookie will expire, here it is set to 1 week
        maxAge : 1000*60*60*24*7, //this is the maximum age of the cookie, here it is set to 1 week
        httpOnly : true //this means the cookie cannot be accessed via client-side javascript, it is a security measure to help prevent cross-site scripting (XSS) attacks
    }
};



// render responses to the page
// app.get("/", (req,res)=>{
//     res.send("Home page")
// });


//to use sessionoptions we have to use it as a middleware
app.use(session(sessionOptions) ); //this will add a "req.session" object to every incoming request
app.use(flash()); //this will add a "req.flash" object to every incoming request

// passport related implimention ( to impliment passport we need sessions)
app.use(passport.initialize());
app.use(passport.session()); //this will add a "req.user" object to every incoming request if the user is authenticated
passport.use(new LocalStrategy(User.authenticate())); //this is the strategy we are using to authenticate users, here we are using the authenticate method that is added to our User model by passport-local-mongoose

passport.serializeUser(User.serializeUser()); //user related info stored in the session called serializeUser
passport.deserializeUser(User.deserializeUser()); //user related info Unstored from the session called deserializeUser


// custom middleware to make flash messages available in all templates
app.use((req,res,next)=>{
    res.locals.success = req.flash("success"); //this will make the flash message available in all the templates
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user; //here we are creating locals to store userinfo in currUser (coz we cant directly access the req.user in .ejs files) , this will we used in signin login btn hinding when user logged in .
    next();
});


// ---------------------------------------------
// // adding demouser in userModel using userSchema
// app.get("/demouser", async(req,res)=>{
//     let fakeUser = await new User({
//         email: "student@gmail.com",
//         username: "yash"
//     })
//     let registeredUser = await User.register(fakeUser, "hello")  //register(user, password, cb) Convenience method to register a new user instance with a given password. Checks if username is unique.
//     res.send(registeredUser);
// });
// ---------------------------------------------



// ----------------------------------after using ROUTER we should use this line
app.use("/home", listingRouter);
app.use("/home/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);





// -----------------------------------------------------ERROR handling-------------------------------
// handle 404 err if no other route matches
app.all(/.*/, (req, res, next) => {
    next(new expressError(404, "Page Not Found"));
});


// error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong!"} = err; //here we are giving default value to statusCode and message and giving the values from "err" object if it exists.
    res.status(statusCode).render("error.ejs", {message}); //passing the message to error.ejs and rendering error.ejs page after detecting any error
})


// server connects
app.listen(3000, ()=>{
    console.log("server is listening to port 3000")
});