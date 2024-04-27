import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    
    username : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 25,
        trim : true,
    },
    
    email : {
        type : String,
        required : true,
        minLength : 7,
        maxLength : 35,
        trim : true,
    },
    
    subjectMessage : {
        type : String,
        required : true,
        maxLength : 15,
        trim : true,
    },
    
    message : {
        type : String,
        required : true,
        trim : true,
        minLength : 10,
        maxLength : 3000
    },
    
    status : {
        type : String,
        required : true,
        enum : ["in progress", "completed"],
        default : "in progress"
    }
    
    
}, {
    timestamps : true
})


const Contact = mongoose.model("Contact", contactSchema);

export default Contact;