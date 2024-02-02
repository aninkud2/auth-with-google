const router=require("express").Router()
const{createUser,login,redirect}=require("../controller/userController")
const users=require("../model/usermodel")

router.get("/",async(req,res)=>{
  try {
    
    if (req.session.user) {
      const email=req.session.user.username            
const user=await users.findOne({email})  
if(!user){
 return res.json("user not registered")
}else{ res.json(` Helllo  ${user.firstname } ${user.lastname },. Welcometo my api`);}

       
      } else {
        res.status(401).json('You are not logged in,Kindly log in to perform this action');
      }  
  } catch (error) {
    res.json(error.message)
  }
     
})   
router.post("/signup",createUser) 

//login

router.get("/login",async(req,res)=>{ 
   res.redirect("http://localhost:4455/auth/google/")
})
  
  
router.get('/auth/google',login)

router.get('/auth/google/callback',redirect) 

router.get('/auth/google/success', async(req, res) => { 
  try {
    const username =req.user.emails[0].value  
   const check=  await users.findOne({email:username})
if(!check){
  return res.json("This email is not registered with us")
}
    req.session.user={ username}
        res.json("User authenticated with google");   
  } catch (error) {
    res.redirect("/")
   // res.json(error.message)
  }
   
 
  });  
    

//sign up

  router.get("/logout",(req,res)=>{
    req.session.destroy()
    res.json("log out successful")
  })
module.exports=router