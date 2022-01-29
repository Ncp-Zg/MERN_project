const express = require("express");
const dotenv= require("dotenv")
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const ordersRoute = require("./Routes/ordersRoute");
const connectDB = require("./Config/db");
const cors = require("cors");
const customErrorHandler = require("./Middlewares/errorMiddleware");



const app = express();

app.use(cors({origin: true}));
app.use(express.json())
dotenv.config();
connectDB();
app.use("/api/users", userRoute );
app.use("/api/products", productRoute );
app.use("/api/orders", ordersRoute );

app.use(customErrorHandler);

const PORT = process.env.PORT
app.listen(PORT,console.log(`server is running on PORT ${PORT}`))
