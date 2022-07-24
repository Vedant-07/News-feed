const jwt=require('jsonwebtoken')
const User=require('./../model/userSchema')

const Authenticate=async (req,res,next)=>{
try{
    const token=req.cookies.jwtoken;
   // console.log('token mil bhi rha hai ki nhi  XXXXXXXXXXXXXXXXXXX');
   // console.log(token);
   // console.log(process.env.SECRET);
    const verifyToken=jwt.verify(token,process.env.SECRET)
    const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
    //console.log('verifying the id here ?????? ',verifyToken._id);
    if(!rootUser)
    throw new Error('User not found')//omitting ek=lse
    
        req.token=token;
        req.rootUser=rootUser
        req.userId=rootUser._id

        next()
    
}
catch(err){
    
console.log('error from middleware XXXXXXXXXXXXXXX ',err)
res.status(401).send('unauthorized no token provided')
}
}

module.exports=Authenticate