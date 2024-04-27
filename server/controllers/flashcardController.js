import Flashcard from '../models/flashcardModel.js'


// CREATE FLASHCARD CONTROLLER
export const createFlashcard = async (req, res) => {
    
    try {
        
        const {title, rectoContent, versoContent} = req.body
        const {folderId} = req.params
        // const {userId} = req
        
        if (versoContent.trim() === ""
        || rectoContent.trim() === "") {
            return res.status(400).json({message : "Veuillez remplir tout les champs obligatoires"})
        } else if (rectoContent.length >= 150) {
            return res.status(400).json({message : "Veuillez saisir une question plus courte"})
        } else if (versoContent.length >= 400) {
            return res.status(400).json({message : "Veuillez saisir une réponse plus courte"})
        } else if (title && title.length >= 20) {
            return res.status(400).json({message : "Veuillez saisir un titre plus court"})
        }
        
        
        const newFlashcard = new Flashcard({
            title,
            rectoContent,
            versoContent,
            folderId,
            userId : req.userId
        })
        
        await newFlashcard.save()
        
        res.status(200).json({message : "Flashcard créé avec succès"})
    } catch (e) {
        res.status(400).json({message : "Impossible de créer cette flashcard"})
    }
}

// UPDATE FLASHCARD CONTROLLER
export const updateFlashcard = async (req, res) => {
    
    try {
        
        const {rectoContent, versoContent, title} = req.body
        // visibility, folderId
        
        const {id} = req.params
        // req.userId
        
        if (versoContent.trim() === ""
        || rectoContent.trim() === "") {
            return res.status(400).json({message : "Veuillez remplir tout les champs"})
        } else if (rectoContent.length >= 150) {
            return res.status(400).json({message : "Veuillez saisir une question plus courte"})
        } else if (versoContent.length >= 400) {
            return res.status(400).json({message : "Veuillez saisir une réponse plus courte"})
        } else if (title && title.length >= 20) {
            return res.status(400).json({message : "Veuillez saisir un titre plus court"})
        }
        
        const updatedFlashcard = {
            rectoContent,
            versoContent,
            title
        }
        
        await Flashcard.findByIdAndUpdate(id, updatedFlashcard)
        
        res.status(200).json({message : "Flashcard bien mise à jour"})
    } catch (e) {
        res.status(400).json({message : "Impossible de mettre à jour cette flashcard"})
    }
}

// READ ALL FLASHCARD
export const getAllUserFlashcards = async (req, res) => {
    
    try {
        
        const {folderId} = req.params
        
        const allFlashcards = await Flashcard.find({folderId : folderId})
        
        res.status(200).json(allFlashcards)
        
    } catch (e) {
       res.status(400).json({message : "Impossible de récupérer tout les flashcards"}) 
    }
}

// DELETE ONE FLASHCARD
export const deleteOneFlashcard = async (req, res) => {
    
    try {
        
        const {id} = req.params
        
        await Flashcard.findByIdAndDelete(id)
        
        res.status(200).json({message : "Flashcard supprimée avec succès"})
    } catch (e) {
        res.status(400).json({message : "Impossible de supprimer cette flashcard"})
    }
}

// READ ONE FLASHCARD
export const getOneUserFlashcard = async (req, res) => {
    
    try {
        
        const {flashcardId} = req.params
        
        const selectedFlashcard = await Flashcard.findById(flashcardId)
        
        res.status(200).json(selectedFlashcard)
        
    } catch (e) {
       res.status(400).json({message : "Impossible de récupérer tout les flashcards"}) 
    }
}