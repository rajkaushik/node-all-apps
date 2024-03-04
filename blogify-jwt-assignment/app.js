const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const { userRouter } = require("./routes/userRoutes");
const { blogRouter } = require("./routes/blogRoutes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const port = 9000 | process.env.port;

mongoose.connect("mongodb://localhost:27017/blogsDB");
mongoose.connection.once("open", () => {
  console.log(`Mongodb connected`);
});

app.use("/auth", userRouter);
app.use("/api", blogRouter);
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
