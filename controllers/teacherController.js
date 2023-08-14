const { pool } = require("../utils/connectDb.js");
const mysql=require("mysql");
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
  } catch (error) {
    console.error("Error adding teacher:", error);
    return res.status(500).json({ error: "Failed to add teacher" });
  }
};
// Authenticate a teacher
exports.authenticateTeacher = async (req, res) => {
  const { teacher_id, password } = req.body;
  if(!teacher_id || !password)
    throw new Error("Enter all the details needed");
  
  try {
    // Query the database for the teacher with the given ID and password
    const q = "SELECT teacher_id FROM teacher WHERE teacher_id = ?";
    pool.query(q, [teacher_id],(error, results, fields) => {
      if (error) {
          console.error("authentication unsuccessful:", error);
          return res.status(500).json({ error: "authentication unsuccessful" });
      } else {
          console.log("RESULTS", results);
          return res.status(200).json(results);
      }
  });
} catch (error) {
  console.error("Error retrieving departments:", error);
  return res.status(500).json({ error: "Failed to retrieve departments." });
}
};