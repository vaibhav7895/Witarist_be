const mongoose= require("mongoose")
const taskSchema= mongoose.Schema({
    taskname:String,
    description:String,
    status:String,
    date:String,
    priority:["Low","Medium","High"],
    category:["personal","work","study"],
  

})
const TaskModel=mongoose.model('task',taskSchema)
module.exports={TaskModel}