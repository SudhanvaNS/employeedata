// import { pool } from "../utils/connectDb.js";

// Create a new employee job
exports.createteacher = async (req, res) => {
  console.log(req.body) ;  
  res.send("form submitted");
  // try {
  //   const { teacher_id , name , password} = req.body;
  //  if ( !teacher_id || !name || !password) {
  //     return res
  //       .status(400)
  //       .json({ error: "please give all the information" });
  //   }
  //  const query =
  //     "INSERT INTO teacher (teacher_id , name , password ) VALUES (?,?,?)";
  //   await pool.query(query, [teacher_id , name , password]);

  //   return res.status(201).json({ message: "teacher added successfully" });
  // } catch (error) {
  //   console.error("Error adding teacher:", error);
  //   return res.status(500).json({ error: "Failed to add teacher" });
  // }
};

// Authenticate a teacher
exports.authenticateTeacher = async (req, res) => {
  const { teacher_id, password } = req.body;
  if(!teacher_id || !password)
    throw new Error("Enter all the details needed");
  
  try {
    // Query the database for the teacher with the given ID and password
    const q = "SELECT * FROM teacher WHERE teacher_id = ?";
    pool.query(query, [teacher_id],(error, results, fields) => {
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




   
