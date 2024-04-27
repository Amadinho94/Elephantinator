import multer from 'multer'
import path from 'path'


const fileTypeCheck = (file, cb) => {
    const fileTypes = /png|jpg|jpeg|svg|webp/
    
    const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    
    if (extName && mimeType) {
        return cb(null, true)
    } else {
        cb("File type not allowed")
    }
}

const sizeLimits = 3145728

const tutorialImageStorage = multer.diskStorage({
    
    destination: "./public/tutorialImage",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${(file.originalname.split(" ")).join("_")}`)
    }
})

const uploadTutorialImage = multer({
    
    storage: tutorialImageStorage,
    
    limits: {
        fileSize : sizeLimits
    },
    
    fileFilter: (req, file, cb) => {
        fileTypeCheck(file, cb)
    }
})




export default uploadTutorialImage