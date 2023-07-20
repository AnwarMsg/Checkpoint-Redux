const mongoose = require("mongoose")

const TodoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    userid : {
        type : String,
        ref : "users",
        required : true
    },
    checked : {
        type : Boolean,
        required : true
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)

module.exports = TodoModel