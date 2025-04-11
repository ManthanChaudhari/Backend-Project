import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

// Middleware to parse incoming JSON requests
// - `limit`: sets the maximum size of incoming JSON payloads (in this case, 16 kilobytes)
app.use(express.json({limit : "16kb"}));

// Middleware to parse incoming URL-encoded form data
app.use(express.urlencoded({extended : true , limit : "16kb"}));

// Middleware to serve static files from the "public" directory
// - For example, files like images, CSS, JavaScript, etc., can be accessed directly
app.use(express.static("public"))

// Middleware to parse cookies attached to the client request object
// - Makes cookies easily accessible via `req.cookies`
app.use(cookieParser())

// routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users" , userRouter);
export {app};