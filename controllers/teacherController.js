const { pool } = require("../utils/connectDb.js");
const mysql=require("mysql");
const jwt= require("jsonwebtoken");
const bcrypt =require("bcryptjs"); 
const passport = require("passport");
const localStratergy=require("passport-local").Strategy;
// Create a new employee job
exports.createteacher = async (req, res) => {
  try {
    const { teacher_id , name , password,confirmpassword} = req.body;
    if ( !teacher_id || !name || !password || !confirmpassword ) {
      return res
        .status(400)
        .json({ error: "please give all the information" });
    }
   const q='SELECT teacher_id from teacher where teacher_id= ? ';
     pool.query(q,[teacher_id],(error, results)=>{
        if(error){
          console.log(error);
        }else if(results.length>0){
            return res.render('register',{
              message:'teacher already exists'
            })
        }else if(password!=confirmpassword){
          return res.render('register',{
            message:'passwords do not match'
          })
        }
     });
     let handlePassword = await bcrypt.hash(password,8)
      console.log(handlePassword);
     pool.query('INSERT into teacher SET ?', {teacher_id: teacher_id , name : name , password : handlePassword},(error,results)=>{
      if(error){
        console.log(error);
      }else{
        return res.render("login" ,{
        message : "teacher registered successfully"
        })
      }
     })
    } catch (error) {
    console.error("Error adding teacher:", error);
    return res.status(500).json({ error: "Failed to add teacher" });
  }
};
// Authenticate a teacher

exports.authenticateTeacher = async (teacher_id, password,done ) => {
    const user=getUserByEmail(teacher_id)
    if(user==null){
      return done(null,false,{message:"No Teacher Found"})
    }
    try{
      if( await bcypt.compare(password,user.password)){
        return done(null,user)
      }
    }catch(e){
      console.log(e);
      return done(e);
    }
    passport.use(new localStratergy({usernameField:'teacher_id'}))
    passport.serializeUser((user,done)=>{})
    passport.serializeUser((id,done)=>{})
};
