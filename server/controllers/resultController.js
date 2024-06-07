import Result from '../models/resultModel.js'
import User from "../models/userModel.js";
import Folder from '../models/folderModel.js'

// NEW RESULT CONTROLLER
export const createResult = async (req, res) => {
    
    try {
        
        const {numbersGoodAnswers, numbersQuestions, goodAnswerFlashcards, badAnswerFlashcards} = req.body
        
        const {folderId} = req.params
        
        const userId = req.userId
        
        
        const newResult = new Result({
            numbersGoodAnswers, // parseint ?
            numbersQuestions, //
            goodAnswerFlashcards,
            badAnswerFlashcards,
            folderId,
            userId,
        })
        
        await newResult.save()
        
        res.status(200).json({message : "Résultat sauvegardé"})
        
    } catch (e) {
        console.log(e)
        res.status(400).json({message : "Impossible de sauvegarder le résultat"})
    }
}

// READ ALL RESULTS OF ONE USER CONTROLLER
export const getAllResults = async (req, res) => {
    
    try {
        
        const {userId} = req.params
        
        const allResults = await Result.find({userId}).populate("folderId").sort({createdAt : -1})
        
        res.status(200).json(allResults)
    } catch (e) {
        
        res.status(400).json({message: "Impossible d'afficher l'historique de vos résultats de révision"})
    }
}

// READ ALL RESULTS OF ONE FOLDER CONTROLLER
export const getAllFolderResults = async (req, res) => {
    
    try {
        
        const {folderId} = req.params
        
        const allFolderResults = await Result.find({folderId}).sort({createdAt : -1})
        
        res.status(200).json(allFolderResults)
    } catch (e) {
        res.status(400).json({message: "Impossible d'afficher les résultats des révisions de ce dossier"})
    }
}

// READ ONE RESULT CONTROLLER
export const getOneResult = async (req, res) => {
    
    try {
        
        const {resultId} = req.params
        
        const oneResult = await Result.findById({_id : resultId})
        
        res.status(200).json(oneResult)
    } catch (e) {
        res.status(400).json({message: "Impossible d'afficher le résultat de cet révision"})
    }
}

// DELETE ONE RESULT CONTROLLER
export const deleteOneResult = async (req, res) => {
    
    try {
        
        const {resultId} = req.params
        
        await Result.findByIdAndDelete({_id : resultId})
        
        res.status(200).json({message : "Résultat de révision supprimé avec succès"})
    } catch (e) {
        res.status(400).json({message: "Impossible de supprimer ce résultat de révision"})
    }
}

// DELETE ALL RESULTS OF ONE FOLDER CONTROLLER
export const deleteFolderResults = async (req, res) => {
    
    try {
        
        const {folderId} = req.params
        
        await Result.deleteMany({folderId})
        
        res.status(200).json({message : "Résultats de révision de ce dossier supprimé avec succès"})
    } catch (e) {
        res.status(400).json({message: "Impossible de supprimer les résultats de révision de ce dossier"})
    }
}

// DELETE ALL RESULTS OF ONE USER CONTROLLER
export const deleteAllResults = async (req, res) => {
    
    try {
        
        const {userId} = req.params
        
        await Result.deleteMany({userId})
        
        res.status(200).json({message : "Tout les résultats de révision ont été supprimés"})
    } catch (e) {
        res.status(400).json({message: "Impossible de supprimer les résultats de révision"})
    }
}

// READ 5 MOST RECENT RESULTS
export const getMostRecentResults = async (req, res) => {
    
    try {
        
        const {userId} = req.params
        
        const results = await Result.find({userId}).populate("folderId").sort({createdAt : -1}).limit(5)
        
        res.status(200).json(results)
    } catch (e) {
        
        res.status(400).json({message: "Impossible d'afficher l'historique de vos résultats de révision"})
    }
}