import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
    
    title : {
        type : String,
        required : true,
        trim : true,
        maxLength : 20,
    },
    
    description : {
        type : String,
        required : false,
        trim : true,
        maxLength : 3000
    },
    
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    
    visibility : {
        type : String,
        required : true,
        enum : ["private", "public"],
        default : "private"
    }
    
    
},{
    timestamps : true
})


const Folder = mongoose.model("Folder", folderSchema)

export default Folder;