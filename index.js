const express = require("express");
const app = express();
const connection  = require("./config/db");
const cors=require("cors")
require("dotenv").config()

const {taskRouter} = require("./routes/task");

app.use(cors())
app.use(express.json());
app.use("/taskRouter", taskRouter);



app.listen(3000, async () => {
    try {
        await connection;
        console.log("Connected to the database");
        
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
    console.log("Server started on port 3000");
});

