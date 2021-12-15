const express = require("express");
const dotenv= require("dotenv")
const userRoute = require("./Routes/userRoute");
const connectDB = require("./Config/db");

const app = express();
app.use(express.json())
dotenv.config();
connectDB();
app.use("/api/users", userRoute );

const PORT = process.env.PORT
app.listen(PORT,console.log(`server is running on PORT ${PORT}`))
