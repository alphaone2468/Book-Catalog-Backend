const express=require("express");
const app=express();
const bookRoutes = require("./routes/book.routes");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();
require("./config/db");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);


app.listen(process.env.PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
});