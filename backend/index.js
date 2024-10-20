import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

// responce lke api
app.get("/", (req, res) => {
    return res.status(200).json({
        massage:"Data from backend",
        success: true
    })
})


// middlewares
app.use(express.json());
app.use(cookieParser());// when send req for forntend then for better responce for backend
app.use(urlencoded({extended:true})); // Express.js application to parse incoming requests with URL-encoded payloads
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
} 
app.use(cors(corsOptions));



app.listen(PORT, ()=>{
    console.log(`Server listen at PORT ${PORT}`);
    
})