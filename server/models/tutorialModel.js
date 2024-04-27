import mongoose from 'mongoose';


const tutorialModel = new mongoose.Schema({
    
    title : {
        type : String,
        required: true,
        minLength : 3,
        maxLength : 50,
        trim : true
    },
    
    summary : {
        type : String,
        required: true,
        minLength : 3,
        maxLength : 3000,
        trim : true
    },
    
    tutorialImage : {
        type : String,
        required: true,
    },
    
    content : {
        type : String,
        required: true,
        minLength : 20,
        maxLength : 10000,
        trim : true
    }
    
}, {
    timestamps : true,
})


const Tutorial = mongoose.model("tutorial", tutorialModel)


export default Tutorial