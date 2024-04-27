import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
    
    numbersGoodAnswers : {
        type : Number,
        required:true,
        max : 1000
    },
    
    numbersQuestions : {
        type : Number,
        required:true,
        max : 1000
    },
    
    folderId : {
        type : mongoose.Types.ObjectId,
        ref : "Folder",
        required : true
    },
    
    userId : {
       type : mongoose.Types.ObjectId,
       ref : "user",
       required : true 
    },
    
    goodAnswerFlashcards : {
        type : Array,
        required : true
    },
    
    badAnswerFlashcards : {
        type : Array,
        required : true
    }
    
    
}, {
    timestamps : true
})



const Result = mongoose.model("Result", resultSchema)

export default Result;