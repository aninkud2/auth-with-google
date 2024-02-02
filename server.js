const express =require("express")
require("dotenv").config()
const db=require("./db/db")
const router=require("./router/router")
const session=require("express-session")
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const port=process.env.port
const app=express()
app.use(express.json())
app.use(session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: false 

}))
const myModel=require("./model/usermodel")

app.use(passport.initialize());    
app.use(passport.session()); 
passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL, 
  
},
async(accessToken, refreshToken, profile, done) => { 
 
  const checkUser=await myModel.findOne({email: profile.emails[0].value
  })

  if(checkUser){
    console.log(profile)
    return done(null, profile);
  }
else{
  
const createdUser=await myModel.create({
firstname:profile.name.familyName,
lastname:profile.name.givenName,
email:profile.emails[0].value
}
)

return done(null, createdUser);

}
 


}));


passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use(router) 
 
app.listen(port,()=>{
    console.log("server is running on port "+ port)
})
