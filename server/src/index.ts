import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from 'cors';
import dashboardRoutes from "./routes/dashboardRoutes";
import productRoutes from "./routes/productRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// NOTE: ROUTES
app.get("/hello", (_, res) => { res.send("hello world 🌏"); })

app.use("/dashboard", dashboardRoutes);
app.use("/products", productRoutes);


// NOTE: SERVER
const port = process.env.PORT || 3002;
app.listen(port, (): void => {
  console.log(`🎙️%cindex.ts:19 - running on port ${port}`, 'font-weight:bold; background:#56a900;color:#fff;'); //DELETEME:
})
