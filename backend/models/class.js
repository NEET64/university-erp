const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require('./course.js');
// const Student = requrie('./student.js')
// const Faculty = require('./faculty.js');


const classSchema = new Schema({

    //array of students
    student : 
    [{
        type : Schema.Types.ObjectId,
        ref :'Student',
        required : true,
    }],

    // branch name - enter manually or create new collection for it
    branch : {
        type : String,
        required : true,
    },
     
    // semester
    semester : {
        type : Number,
        required : true,
        default : 1,
        min : 1,
        max : 8,
    },

    // array of faculties teaching in this class ----> course : faculty
    faculties :[
        {
            course : {
                type : Schema.Types.ObjectId,
                ref : 'Course'
            },
            faculty :{
                type : Schema.Types.ObjectId,
                ref : 'Faculty'
            },
        }
    ],

    // class co-ordinator
    coordinator : {
        type : Schema.Types.ObjectId,
        ref : 'Faculty',
    },
});

const Class = mongoose.model("Class",classSchema);
module.exports = Class;