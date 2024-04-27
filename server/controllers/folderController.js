import Folder from '../models/folderModel.js'
import Flashcard from '../models/flashcardModel.js'


// CREATE FOLDER CONTROLLER
export const createFolder = async (req, res) => {
    
    try {
        
        const {title, description} = req.body
        //visibility
        const {userId} = req.params
        
        // const checkValue = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/
        
        if (title.trim() === "") {
           return res.status(400).json({message : "Veuillez donner un nom a ce dossier"}) 
        } else if (title.length > 20) {
           return res.status(400).json({message : "Veuillez choisir un nom de dossier plus courte"}) 
        } else if (description && description.length > 3000) {
           return res.status(400).json({message : "Veuillez choisir une description plus courte"}) 
        }
        
        // } else if (checkValue.test(description)) {
        //     return res.status(400).json({message : "Caractère non autorisé saisit dans la description"}) 
        // } else if (checkValue.test(title)) {
        //     return res.status(400).json({message : "Caractère non autorisé saisit dans le titre"}) 
        // }
            
            
        const newFolder = new Folder({
            title,
            description,
            userId
        })
        
        await newFolder.save()
        
        res.status(200).json({message : "Dossier créer avec succès"})
        
    } catch (e) {
        console.log(e)
        res.status(400).json({message : "Impossible de créer un dossier"})
    }
}

// UPDATE FOLDER CONTROLLER
export const updateFolder = async (req, res) => {
    
    try {
        
        const {title, visibility, description} = req.body
        const {id} = req.params
        
        // const checkValue = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/
        
        if (title.trim() === "") {
           return res.status(400).json({message : "Veuillez donner un nom a ce dossier"}) 
        } else if (title.length > 20) {
           return res.status(400).json({message : "Veuillez choisir un nom de dossier plus courte"}) 
        } else if (description && description.length > 3000) {
           return res.status(400).json({message : "Veuillez choisir une description plus courte"}) 
        } else if (visibility && visibility.trim() === "") {
            return res.status(400).json({message : "Veuillez choisir la visibilité de ce dossier"})
        } else if (visibility && visibility !== "public" && visibility !== "private") {
            return res.status(400).json({message : "Veuillez choisir entre public ou privée"})
        }
        
        // else if (checkValue.test(title)) {
        //     return res.status(400).json({message : "Caractère non autorisé saisit dans le titre"}) 
        // } else if (checkValue.test(description)) {
        //     return res.status(400).json({message : "Caractère non autorisé saisit dans la description"}) 
        // }
        
        
        
        const updatedFolder = {
            title : title,
            visibility : visibility && visibility,
            description : description
        }
        
        await Folder.findByIdAndUpdate(id, updatedFolder)
        
        res.status(200).json({message : "Dossier mise à jour avec succès"})
    } catch (e) {
        
        console.log(e)
        res.status(400).json({message : "Impossible de mettre à jour ce dossier"})
    }
}

// DELETE ONE FOLDER
export const deleteOneFolder = async (req, res) => {
    
    try {
        
        const {id} = req.params
        
        await Folder.findByIdAndDelete(id)
        
        await Flashcard.deleteMany({folderId : id})
        
        res.status(200).json({message : "Dossier supprimé avec succès"})
    
    } catch (e) {
        res.status(400).json({message : "Impossible de supprimer ce dossier"})
    }
}

// READ ALL FOLDER CONTROLLER
export const getAllUserFolder = async (req, res) => {
    
    try {
        
        const {userId} = req.params
        
        const userfolders = await Folder.find({userId})
        
        res.status(200).json(userfolders)
        
    } catch (e) {
        res.status(400).json({message : "Impossible de récupérer les dossiers"})
    }
}

// GET ONE FOLDER
export const getOneUserFolder = async (req, res) => {
    
    try {
        
        const {folderId} = req.params
        
        const selectedFolder = await Folder.findById(folderId)
        
        res.status(200).json(selectedFolder)
        
    } catch (e) {
        res.status(400).json({message : "Impossible de récupérer le dossier"})
    }
}