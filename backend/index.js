import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import conectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.rout.js";

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 4000;

// responce lke api
app.get("/", (req, res) => {
  return res.status(200).json({
    massage: "Data from backend",
    success: true,
  });
});

// middlewares
app.use(express.json());
app.use(cookieParser()); // when send req for forntend then for better responce for backend
app.use(urlencoded({ extended: true })); // Express.js application to parse incoming requests with URL-encoded payloads
// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true,
// }
// app.use(cors(corsOptions));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// api here
app.use("/api/v1/user", userRoute);
// 'http.//localhost:8000/api/v1/user/resiter' it's our api working like this and show your browser screen
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, () => {
  conectDB();
  console.log(`Server listen at PORT ${PORT}`);
});
