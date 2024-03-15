const express = require("express");
const connection  = require("./db");
const cors=require("cors")
require("dotenv").config()

const {taskRouter} = require("./routes/task");
const app = express();
app.use(cors())
app.use(express.json());
app.use("/taskRouter", taskRouter);



app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to the database");
        console.log("Server is running on port 3000");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
});
