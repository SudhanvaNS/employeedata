import { pool } from "../utils/connectDb.js";

// Create a new employee job
export const createstudent = async (req, res) => {
  try {
    const { usn , name , phone, gender} = req.body;
    console.log(usn);
    const { teacher_id }=req.params;
    if ( !usn || !name || !phone|| !gender) {
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
  
    export const getAllstudent = async (req, res) => {
      const query = "SELECT * FROM employee_jobs";
   
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
export const updatestudent = async (req, res) => {
  try {
    const {employee_role, employee_login, employee_logout } = req.body;
    const {employee_id} = req.params;

    const query =
      "UPDATE employee_jobs SET employee_role = ? WHERE employee_id = ? AND employee_login = ? AND employee_logout = ?";
    await pool.query(query, [employee_role, employee_id, employee_login, employee_logout]);

    return res.status(200).json({ message: "Employee job updated successfully" });
  } catch (error) {
    console.error("Error updating employee job:", error);
    return res.status(500).json({ error: "Failed to update employee job" });
  }
};

// Delete an employee job
export const deletestudent = async (req, res) => {
  const { employee_id } = req.params;
  console.log( employee_id );

  try {
      const deleteQuery = "DELETE FROM employee_jobs WHERE employee_id = ?";
      const result = await pool.query(deleteQuery, [ employee_id ]);
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

   
