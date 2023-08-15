const { pool } = require("../utils/connectDb.js");
const mysql=require("mysql");
const jwt= require("jsonwebtoken");
const bcrypt =require("bcryptjs");
const uuid = require('uuid'); 

const JWT_SECRET = "pranesha";
//supporting functions
const generateTokenAuth = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};
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
exports.authenticateTeacher= async(req,res) => {
  if (!req.body.teacher_id || !req.body.password)
    throw new Error("Enter all the details needed");
  const {teacher_id,password}=req.body;
  const querry='SELECT * from teacher where teacher_id= ?';
  pool.getConnection(function (err, db) {
    if (err) return res.json(err);
    db.query(querry, [teacher_id], (err, data) => {
      if (err) {
        return res.json({ err });
      }
      const teacher_password = req.body.password;
      if (data.length === 0) {
        db.release();
        return res
          .status(404)
          .json("Email hasn't register Please register first");
      }
      // compare password
      if (teacher_password) {
        const isPasswordCorrect = bcrypt.compareSync(
          teacher_password,
          data[0].password
        ); // true;

        if (!isPasswordCorrect) {
          db.release();
          return res.status(404).json("Either Password or phone is wrong");
        }
        return res.status(201).json({
          message:"login successful"
        });
      }
    });
  });
}
  