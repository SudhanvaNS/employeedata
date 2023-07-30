import express from "express";
import {
    createstudent,
    getAllstudent,
    updatestudent,
    deletestudent,
} from "../controllers/studentController.js";

const router = express.Router();

// Create a new cloth color
router.post("/:teacher_id", createstudent);


router.get("/getall", getAllstudent);


// Update a cloth color by color_id
router.put("/put/:usn", updatestudent);

// Delete a cloth color by color_id
router.delete("/delete/:usn", deletestudent);

export default router;
