const express =require ("express");
const {
    createstudent,
    getAllstudent,
    updatestudent,
    deletestudent,
}= require ("../controllers/studentController.js");

const router = express.Router();

// Create a new cloth color
router.post("/", createstudent);


router.get("/getall/:teacher_id", getAllstudent);


// Update a cloth color by color_id
router.put("/put/:usn", updatestudent);

// Delete a cloth color by color_id
router.delete("/delete/:usn", deletestudent);

module.exports=router;
