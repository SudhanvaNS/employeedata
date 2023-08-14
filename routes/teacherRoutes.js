const express= require( "express");
const teacher = require("../controllers/teacherController");
const router = express.Router();
router.post("/login", teacher.authenticateTeacher);
router.post("/register",teacher.createteacher );
module.exports=router;
