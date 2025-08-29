import express from "express";

// create express app
const app = express();

app.get("/",(req,res) => {
    res.send("Hello from the server");
});

app.post("/test",(req,res) => {
    res.send("Hello from the server");
});

export default app;