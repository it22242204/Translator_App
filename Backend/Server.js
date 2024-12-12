const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const cors = require("cors")

// import routes
const taskRoutes = require('./routes/taskRoutes')
const router=require("./routes/BookMarkRoutes");
const noterouter=require('./routes/Noteroutes');
const quizRouter = require("./routes/quizgameroutes");

// Mddleware
app.use(cors())
app.use(express.json());

// app.get("/",(req,res) => {
//     res.send("Hello word");
// });

//db connection
app.use("/api/tasks",taskRoutes)
app.use("/BookMark",router);
app.use("/notes",noterouter);
app.use("/Backend/quiz",quizRouter);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB connected Successfully listening to " + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));

