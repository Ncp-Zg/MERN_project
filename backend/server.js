const express = require("express");
const dotenv= require("dotenv")
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const connectDB = require("./Config/db");
const cors = require("cors");



const app = express();

app.use(cors({origin: true}));
app.use(express.json())
dotenv.config();
connectDB();
app.use("/api/users", userRoute );
app.use("/api/products", productRoute );

const PORT = process.env.PORT
app.listen(PORT,console.log(`server is running on PORT ${PORT}`))
