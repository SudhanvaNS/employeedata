const express =require('express');
const cors= require('cors')
const cookie_parser=require('cookie-parser');
const path =require('path')
const app=express();
app.use(cookie_parser());
app.use(express.json());
app.use(cors());
// const studentRoutes =require("./routes/studentRoutes.js");
// const teacherRoutes= require("./routes/teacherRoutes.js");
app.set('view engine','ejs');

const publicDirectory = path.join(__dirname,'./public');
console.log(publicDirectory);
app.use(express.static(publicDirectory, {
    setHeaders: (res, filePath) => {
      const mimeType = express.static.mime.lookup(filePath);
      res.setHeader('Content-Type', mimeType);
    }
  }));
app.use(express.urlencoded({extended:false}));
  app.use('/',require('./routes/pages'))
app.use("/student" ,require('./routes/studentRoutes'));
app.use("/teacher",require('./routes/teacherRoutes'));
const port=3000;
app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}`);
})
