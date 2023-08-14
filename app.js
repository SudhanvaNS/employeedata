const express =require('express');
const cors= require('cors')
const path =require('path')
const app=express();
app.use(express.json());
app.use(cors());
// const studentRoutes =require("./routes/studentRoutes.js");
// const teacherRoutes= require("./routes/teacherRoutes.js");
app.set('view engine','hbs');

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
// app.use("/api/student" ,require('./routes/studentRoutes'));

app.use("/teacher",require('./routes/teacherRoutes'));
const port=3000;
app.listen(port, ()=>{
    console.log(`listening on port http://localhost:${port}`);
})
