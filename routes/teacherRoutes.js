const express= require( "express");
const teacherController = require("../controllers/teacherController.js");
const router = express.Router();
router.post("/login", teacherController.authenticateTeacher);
router.post("/register",teacherController.createteacher );
module.exports=router;
