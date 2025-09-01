import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

//dotenv
dotenv.config();

// create express app
const app = express();

//Morgan
if(process.env.NODE_ENV !== "production")
{
    app.use(morgan("dev"));
}

app.use(helmet());

app.get("/",(req,res) => {
    res.send("Hello from the server");
});

// Parse request Json body
app.use(express.json());

// Sanitize request data
app.use(mongoSanitize());

// Enable Cookie Parser
app.use(cookieParser());

//gzip compression
app.use(compression());

// cors
app.use(cors({
    origin : "http://localhost:3000"
}));

//file upload
app.use(
    fileUpload(
        {
            useTempFiles: true
        }
    )
);

// Parse json request body
app.use(express.urlencoded({ extended: true}));

app.post("/test",(req,res) => {
    res.send(req.body);
});

export default app;