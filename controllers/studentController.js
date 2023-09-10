const { pool } =require("../utils/connectDb.js");
// Create a new employee job
exports.createstudent = async (req, res) => {
  try {
    const { usn , name , phone, gender,teacher_id} = req.body;
    // console.log(usn);
    if ( !usn || !name || !phone|| !gender|| !teacher_id) {
      return res
        .status(400)
        .json({ error: "please give all the information" });
    }
   const query =
      "INSERT INTO students (usn, name, phone, gender, teacher_id ) VALUES (?,?,?,?,?)";
    await pool.query(query, [usn, name,phone,gender,teacher_id]);

    return res.status(201).json({ message: "student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({ error: "Failed to add student" });
  }
};

// Retrieve all employee jobs
  
    exports.getAllstudent = async (req, res) => {
      const {teacher_id}=req.params;
      // console.log(req.params);
      const query = "SELECT * FROM students where teacher_id = ?";
   
      pool.query(query,[teacher_id],(error,results,fields)=>{
        if(error)
        {console.error("error: ",error);}
        else{
          // console.log("RESULTS: ",results);
              return res.status(200).json(results);
  
        }
      });
   
    };

// Update an employee job
exports.updatestudent = async (req, res) => {
  try {
    const {teacher_id } = req.body;
    const {usn} = req.params;

    const query =
      "UPDATE students SET teacher_id = ? WHERE usn = ?";
    await pool.query(query, [teacher_id,usn]);

    return res.status(200).json({ message: "student information updated successfully" });
  } catch (error) {
    console.error("Error updating student information:", error);
    return res.status(500).json({ error: "Failed to update student information" });
  }
};

// Delete an employee job
exports.deletestudent = async (req, res) => {
  const { usn } = req.params;
  try {
      const deleteQuery = "DELETE FROM students WHERE usn = ?";
      const result = await pool.query(deleteQuery, [ usn ]);
      // Log the result object to see if there are any messages or details from the database.

      if (result.rowCount === 0) {
          // If no rows were affected by the DELETE operation, it means the color_id was not found in the database.
          return res.status(404).json({ error: " student not found." });
      }

      return res.status(200).json({ message: " student deleted successfully." });
  } catch (error) {
      console.error("Error deleting  student :", error);
      return res.status(500).json({ error: "Failed to delete  student ." });
  }
  

};

   
