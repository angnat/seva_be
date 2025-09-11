import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize"; // Keep this import
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import routes from "./routes/index.js";

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

// --- Core Body Parsers (always first for body parsing) ---
// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body (for form data)
app.use(express.urlencoded({ extended: true}));

// --- FIX START: Move express-mongo-sanitize here ---
// Place mongoSanitize immediately after body parsers.
// This ensures it sanitizes req.body and req.query *before* other
// middleware might interact with them in conflicting ways.
//app.use(mongoSanitize());
// --- FIX END ---

// Conditional fileUpload middleware (as discussed previously)
app.use((req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
        fileUpload({ useTempFiles: true })(req, res, next);
    } else {
        next();
    }
});


// Enable Cookie Parser (cookies are usually parsed after body and query)
app.use(cookieParser());

//gzip compression
app.use(compression());

// cors
app.use(cors());


// app.post("/test",(req,res) => {
//     res.send(req.body);
// });

//api v1 routes
app.use("/api/v1", routes);

app.use(async (req, res, next) => {
  next(createHttpError.NotFound("This route does not exist."));
});

//error handling
app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;