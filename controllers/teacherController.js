import { pool } from "../utils/connectDb.js";

// Create a new employee job
export const createteacher = async (req, res) => {
  try {
    const { teacher_id , name , password} = req.body;
   if ( !teacher_id || !name || !password) {
      return res
        .status(400)
        .json({ error: "please give all the information" });
    }
   const query =
      "INSERT INTO teacher (teacher_id , name , password ) VALUES (?,?,?)";
    await pool.query(query, [teacher_id , name , password]);

    return res.status(201).json({ message: "teacher added successfully" });
  } catch (error) {
    console.error("Error adding teacher:", error);
    return res.status(500).json({ error: "Failed to add teacher" });
  }
};

// Retrieve all employee jobs
  
    export const getAllteacher = async (req, res) => {
      const query = "SELECT * FROM teacher";
   
      pool.query(query,(error,results,fields)=>{
        if(error)
        {console.error("error: ",error);}
        else{
          console.log("RESULTS",results);
              return res.status(200).json(results);
  
        }
      });
   
    };

// Update an employee job
export const updateteacher = async (req, res) => {
  try {
    const {password} = req.body;
    const {teacher_id} = req.params;

    const query =
      "UPDATE teacher SET password = ? WHERE teacher_id = ?";
    await pool.query(query, [password,teacher_id]);

    return res.status(200).json({ message: "Employee job updated successfully" });
  } catch (error) {
    console.error("Error updating employee job:", error);
    return res.status(500).json({ error: "Failed to update employee job" });
  }
};

// Authenticate a teacher
export const authenticateTeacher = async (req, res) => {
  const { teacher_id, password } = req.body;

  try {
    // Query the database for the teacher with the given ID and password
    const query = "SELECT * FROM teacher WHERE teacher_id = ? AND password = ?";
    const result = await pool.query(query, [teacher_id, password]);

    if (result.length === 0) {
      // Teacher with the provided ID and password not found
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Teacher found with matching ID and password, authentication successful
    return res.status(200).json({ message: "Authentication successful" });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ error: "Failed to authenticate" });
  }
};


// Delete an employee job
export const deleteteacher = async (req, res) => {
  const { teacher_id } = req.params;

  try {
      const deleteQuery = "DELETE FROM teacher WHERE teacher_id = ?";
      const result = await pool.query(deleteQuery, [ teacher_id ]);
      // Log the result object to see if there are any messages or details from the database.

      if (result.rowCount === 0) {
          // If no rows were affected by the DELETE operation, it means the color_id was not found in the database.
          return res.status(404).json({ error: " employee not found." });
      }

      return res.status(200).json({ message: " employee_job deleted successfully." });
  } catch (error) {
      console.error("Error deleting  employee_id :", error);
      return res.status(500).json({ error: "Failed to delete  employee_id ." });
  }
  

};

   
