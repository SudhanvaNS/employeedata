const jwt =require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token=req.cookies.jwt;

    //check json web token existance and if valid
    if(token){
        jwt.verify(token,'pranesha',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}
module.exports={auth}