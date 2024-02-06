const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Class = require('./class.js');
const Course = require('./course.js');
// const Faculty = require('./faculty.js');


const assignmentSchema = new Schema({
    //title
    assTitle : {
        type : String,
        required : true,
    },
    
    // class -FOREIGN KEY
    // assClass :  {
    //     type : Schema.Types.ObjectId,
    //     ref : 'Class',
    //     required : true,
    // },


    // course -FOREIGN KEY
    assCourse :  {
        type : Schema.Types.ObjectId,
        ref : 'Course',
        required : true,
    },

    // faculty - FOREIGN KEY

    // assFaculty :  {
    //     type : Schema.Types.ObjectId,
    //     ref : 'Faculty',
    //     // required : true,
    // },

    // due date 
    assDueDate : {
        type : Date,
        default : new Date(new Date().getTime()  + 7 * 24 * 3600 * 1000),// 1000 for milliseconds || default due date gives you time for 7 days 
    },

    // post date
    assPostDate :{
        type : Date,
        default : new Date(),
        required : true,
    },

    // expected format

    // total marks
    assTotalMarks : {
        type : Number,
        default : 10,
        min : 10,
        max : 100,
        required : true,
    },


});

const Assignment  = mongoose.model("Assignment",assignmentSchema);
module.exports = Assignment;