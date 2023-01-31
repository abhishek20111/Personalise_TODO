const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const todoSchema = mongoose.Schema({
    todo: {
        type: String,
        require: true
    },
    todoBy: {
        type: ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model('todo_Red_Schema',todoSchema);