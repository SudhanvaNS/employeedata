import express from "express";

import {
    createteacher,
    getAllteacher,
    updateteacher,
    deleteteacher,
} from "../controllers/teacherController.js";

const router = express.Router();

// Create a new cloth color
router.post("/", createteacher);


router.get("/getall", getAllteacher);


// Update a cloth color by color_id
router.put("/put/:teacher_id", updateteacher);

// Delete a cloth color by color_id
router.delete("/delete/:teacher_id", deleteteacher);

export default router;
