const express = require("express");
const dotenv= require("dotenv")
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const ordersRoute = require("./Routes/ordersRoute");
const paymentRoute = require("./Routes/paymentRoute");
const connectDB = require("./Config/db");
const cors = require("cors");
const customErrorHandler = require("./Middlewares/errorMiddleware");
const path = require("path");



const app = express();

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json())
dotenv.config();
connectDB();
app.use("/api/users", userRoute );
app.use("/api/products", productRoute );
app.use("/api/orders", ordersRoute );
app.use("/api/payment", paymentRoute );

app.use(customErrorHandler);

const PORT = process.env.PORT
app.listen(PORT,console.log(`server is running on PORT ${PORT}`))

