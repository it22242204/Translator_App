const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require("cors")
const taskRoutes = require('./routes/taskRoutes')

app.use(express.json());

// app.get("/",(req,res) => {
//     res.send("Hello word");
// });

//db connection
app.use(cors())
app.use("/api/tasks",taskRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB connected Successfully listening to " + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));

