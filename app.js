import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import bodyParser from "body-parser";
const app=express();
app.use(express.json());
app.use(cors());
app.use("/api/student" ,studentRoutes);
app.use("/api/teacher",teacherRoutes);
const port=3000;
app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}`);
})
