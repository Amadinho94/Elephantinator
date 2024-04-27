import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
    
    folderId : {
        type : mongoose.Types.ObjectId,
        ref : "Folder",
        required : true
    },
    
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    
    title : {
        type : String,
        trim : true,
        maxLength : 20,
    },
    
    rectoContent : {
        type : String,
        trim : true,
        maxLength : 150,
        required : true
    },
    
    versoContent : {
        type : String,
        trim : true,
        maxLength : 400,
        required : true
    },
    
    // visibility : {
    //     type : String,
    //     required : true,
    //     enum : ["private", "public"],
    //     default : "private"
    // }
    
}, {
    timestamps : true
})

const Flashcard = mongoose.model("Flashcard", flashcardSchema)

export default Flashcard;