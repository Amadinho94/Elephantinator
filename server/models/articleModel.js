import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    
    title : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 100,
        unique : true,
        trim: true
    },
    
    authorName : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 25,
        trim: true
    },
    
    summary : {
        type : String,
        required : true,
        trim : true,
        minLength: 150,
        maxLength : 1000
    },
    
    paragraphs : {
        type : String,
        required : true,
        trim : true,
        minLength: 150,
        maxLength : 10000
    },
    
    articleImage : {
       type : String,
       required : true,
       trim : true,
    }
    
}, {
    timestamps : true,
})

const Article = mongoose.model("Article", articleSchema)

export default Article