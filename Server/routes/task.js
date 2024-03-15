const express = require("express");
const { TaskModel } = require("../model/taskmodel");

const taskRouter = express.Router();


taskRouter.post("/add", async (req, res) => {
    try {
        const task = new TaskModel(req.body);
        await task.save();
        res.send(task);
        console.log(`Task created ${task}`);
    } catch (err) {
        console.log("Task not created");
    }
});


taskRouter.get("/", async (req, res) => {
    try {
        let query = {};
        
     
        if (req.query.priority && ['low', 'medium', 'high'].includes(req.query.priority.toLowerCase())) {
            query.priority = req.query.priority;
        }
        
        
        if (req.query.category && ['work', 'personal', 'study'].includes(req.query.category.toLowerCase())) {
            query.category = req.query.category.toLowerCase();
        }
        
        const tasks = Object.keys(query).length ? await TaskModel.find(query) : await TaskModel.find();
        
        res.send(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});


taskRouter.put("/update/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).send("Task not found");
        }
        console.log(`Task updated: ${updatedTask}`);
        res.send(updatedTask);
    } catch (err) {
        console.log("Error updating task:", err);
        res.status(500).send("Internal Server Error");
    }
})
taskRouter.delete("/delete/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).send("Task not found");
        }
        console.log(`Task deleted: ${deletedTask}`);
        res.send(deletedTask);
    } catch (err) {
        console.log("Error deleting task:", err);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = { taskRouter };
